import {API_URL, API_URL_SEARCH, API_URL_USERS, API_URL_USERS_OPTIONS, 
    API_URL_LANGUAGE_REGEXP, API_URL_LOCATION_REGEXP, API_URL_PAGE_REGEXP} from '../../constants/api';
import * as apiUrlSign from '../../constants/api/apiUrlSign';
import {getDataApi} from '../../utils';
import classes from './Users.css';
import {ROOT_INDEX, ROOT_MODAL, BODY} from '../../constants/root';
import User from '../User';
import Repo from '../Repo';
import Spinner from '../Spinner';
import {Err} from '../Error';
import * as apiUrlElementName from '../../constants/api/apiUrlElementName';
import * as apiUrlIdentifier from '../../constants/api/apiUrlIdentifier';
import * as apiUrlRegExp from '../../constants/api/apiUrlRegExp';
import getApiUrlOptions from '../../utils/apiUrlUtils/getApiUrlOptions';

import 'tuicss';
class Users {
    totalLoadedUsers = 0;
    currentDataPage = 1; // * validation 
    isLoadMore = false;
    // usersList;  // * Does it need here?
    urlUsers = API_URL + '/' + API_URL_SEARCH + '/' + API_URL_USERS; // * ? one variable
    // currentRequestOptions = API_URL_USERS_OPTIONS;
    currentRequestOptions = '?q=';
    renderUsers(data, isLoadMore) {   // possible use Promise, for discrete rendering
        // console.log(data.items.length);
        if(!this.usersList) {    // * possible declare in constructor
            let htmlSkeleton =`
            <div class="users__container">
                <div class="users__amount">total_count: <span class="users__amount-item"></span></div>  
                <ul class="users__list">
                </ul>
                <button type="button" class="users__more-button" style="display=none;">Load more</button>
            </div>`;
            ROOT_INDEX.insertAdjacentHTML('beforeend', htmlSkeleton);
            this.init();
        }
        if(data.items.length !== 0) {
            let htmlUsers = '';
            // preparation of html for users data 
            data.items.forEach(({id, login, avatar_url : avatarUrl}) => {
                htmlUsers += `
                <li class="${classes.users__item}" data-user-login='${login}'>
                    <div class="${classes.users__name}">${login}</div>
                    <div class="${classes.users__id}">${id}</div>
                    <img class="${classes.users__img}" src="${avatarUrl}" alt="user_avatar"/>
                </li>`;
            });
            // if click the load more button
            if(this.usersList && isLoadMore) {  // * possible without this.usersList 
                console.log('load more', htmlUsers);
                this.usersList.insertAdjacentHTML('beforeend', htmlUsers);
            }
            // if click the form button
            if(this.usersList && !isLoadMore) {  // * possible without this.usersList
                this.totalLoadedUsers = 0;
                this.usersList.innerHTML = '';
                this.usersList.insertAdjacentHTML('beforeend', htmlUsers);
                // update total_count loaded users
                if(data.total_count != this.usersAmountItem.textContent) this.usersAmountItem.textContent = data.total_count;
            }
            // increase counter loaded users
            this.totalLoadedUsers += data.items.length;
            // show/hide load more button
            if(data.total_count !== this.totalLoadedUsers) {
                this.toggleStateLoadMoreButton(data.total_count !== this.totalLoadedUsers);
            }
            else {
                this.toggleStateLoadMoreButton(data.total_count !== this.totalLoadedUsers);
                this.totalLoadedUsers = 0; //reset counter loaded users
            }
        }
        else {
            this.usersList.innerHTML = '';
            this.totalLoadedUsers = 0;
            this.toggleStateLoadMoreButton(data.total_count);
            this.usersAmountItem.textContent = data.total_count;
        }
        console.log(this.totalLoadedUsers);
    }
    // show/hide load more button
    toggleStateLoadMoreButton(state) {
        this.usersMoreButton.style.display = state ? 'block' : 'none';
    }
    init() {
        this.usersList = ROOT_INDEX.querySelector('.users__list');
        this.eventListenerLoadMore();
        this.usersAmountItem = document.querySelector('.users__amount-item');
        this.usersMoreButton = document.querySelector('.users__more-button');
    }
    async render(formData) {
        // &sort=stars &order=desc &stars:>=1
        // let qualifiers = '', parameters = '' + '&page=1&per_page=10';
        if(formData) {  // click form button
            this.currentDataPage = 1; 
            this.isLoadMore = false;
            this.currentRequestOptions = '?q='; // *
            this.currentRequestOptions += getApiUrlOptions(formData);
            console.log(this.currentRequestOptions);
        }
        else { // click load more button
            this.currentDataPage++;
            this.isLoadMore = true;
            // set number for load page
            this.currentRequestOptions = this.currentRequestOptions.replace(API_URL_PAGE_REGEXP, (...match) => {
                return match[1] + this.currentDataPage;  // *
            });
        }
        console.log(this.urlUsers + this.currentRequestOptions);

        let data = await getDataApi.getData(this.urlUsers + this.currentRequestOptions);

        if (data instanceof Error) {
            Err.render(data, ROOT_INDEX, 'error__fullscreen', '');
        }
        else {
            this.renderUsers(data, this.isLoadMore);
            this.eventListener();
        }
    }
    eventListenerLoadMore() {
        document.querySelector('.users__more-button').addEventListener('click', () => {
            this.render();
        });
    }
    eventListener() {
        document.querySelectorAll(`.${classes.users__item}`).forEach(el => {  // * event delegation
            el.addEventListener('click', async () => {
                // * 
                ROOT_MODAL.innerHTML += `          
                    <div class="wrapper__modal">
                        <div class="container__modal">
                            <div id="user"></div>
                            <div id="repo"></div>
                        </div>
                        <button onclick="modal.innerHTML = '';body.style.overflow = ''" class = "${classes['user__close']}">
                            [x]
                        </button>
                    </div>`;
                Spinner.render(document.querySelector('.container__modal')); // *
                await User.render(el.getAttribute('data-user-login'));
                await Repo.render(el.getAttribute('data-user-login'));
                Spinner.handleClear(document.querySelector('.container__modal'));  // *
                BODY.style.overflow = 'hidden';
            });
        });
    }
};
export default new Users();