import { API_URL_USERS_BASE } from '../../constants/api/apiUrl';
import {getDataApi} from '../../utils';
import classes from './Users.css';
import {ROOT_INDEX, ROOT_MODAL, BODY} from '../../constants/root';
import User from '../User';
import Repo from '../Repo';
import Spinner from '../Spinner';
import {Err} from '../Error';
import { API_URL_PAGE_REGEXP } from '../../constants/api/apiUrlRegExp';
import getApiUrlOptions from '../../utils/apiUrlUtils/getApiUrlOptions';
import {modalHtmlSkeleton, usersHtmlSkeleton} from './UsersHtml.js';
import 'tuicss';
class Users {
    constructor() {
        this.loadedUsersCounter = 0;
        ROOT_INDEX.insertAdjacentHTML('beforeend', usersHtmlSkeleton);
        this._init();
    }
    async render(formData) {
        if(formData) {  // click form button
            this.dataPage = 1; 
            this.isLoadMore = false;
            this.apiUrlRequest = getApiUrlOptions(formData);
        }
        else { // click load more button
            this.dataPage++;
            this.isLoadMore = true;
            // set number for load page
            this.apiUrlRequest = this.apiUrlRequest.replace(API_URL_PAGE_REGEXP, (...match) => {
                return match[1] + this.dataPage;  // *
            });
        }
        // render spiner until data is loaded
        if(!this.isLoadMore) {
            Spinner.render(ROOT_INDEX, 'spinner__users');
        } else {
            Spinner.render(this.usersMoreBtn, 'spinner__users-load-more');
        }
        const data = await getDataApi.getData(API_URL_USERS_BASE + this.apiUrlRequest);
        // data is loaded - stop spinner
        Spinner.handleClear();
        // check data for error
        if (data instanceof Error) {
            Err.render(data, ROOT_INDEX, 'error__fullscreen', '');
        }
        else {
            this.renderUsers(data, this.isLoadMore);
        }
    }
    renderUsers(data, isLoadMore) { 
        if(data.items.length) {
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
            if(isLoadMore) {   
                this.usersList.insertAdjacentHTML('beforeend', htmlUsers);
            }
            // if click the form button
            if(!isLoadMore) { 
                this.loadedUsersCounter = 0;
                this.usersList.innerHTML = '';
                this.usersList.insertAdjacentHTML('beforeend', htmlUsers);
                // update the display of the total number of the downloaded users
                if(data.total_count != this.usersTotalCount.textContent) 
                    this.usersTotalCount.textContent = data.total_count;
            }
            // increase counter loaded users
            this.loadedUsersCounter += data.items.length;
            // show/hide load more button
            if(data.total_count !== this.loadedUsersCounter) {
                this.toggleStateLoadMoreBtn(true); 
            }
            else {
                this.toggleStateLoadMoreBtn(false);
                this.loadedUsersCounter = 0; //reset counter loaded users
            }
        }
        else {
            this.usersList.innerHTML = '';
            this.loadedUsersCounter = 0;
            this.usersTotalCount.textContent = data.total_count;
            this.toggleStateLoadMoreBtn(data.total_count);
        }
    }
    // show/hide load more button
    _init() {
        this.usersList = ROOT_INDEX.querySelector('.users__list');
        this.usersTotalCount = document.querySelector('.users__total-count-item');
        this.usersMoreBtn = document.querySelector(`.${classes['users__more-btn']}`);
        this.handlerLoadMoreBtn();
        this.handlerUserCard();
    }
    toggleStateLoadMoreBtn(state) {
        this.usersMoreBtn.style.display = state ? 'block' : 'none';
    }
    handlerLoadMoreBtn() {
        this.usersMoreBtn.addEventListener('click', () => {
            this.render();
        });
    }
    handlerUserCard() {
        this.usersList.addEventListener('click', async e => {
            const userCard = e.target.closest(`.${classes.users__item}`); 
            if(!userCard) return;
            // added html containers for display data
            ROOT_MODAL.insertAdjacentHTML('beforeend', modalHtmlSkeleton);
            Spinner.render(document.querySelector('.container__modal')); // *
            await User.render(userCard.getAttribute('data-user-login'));
            await Repo.render(userCard.getAttribute('data-user-login'));
            Spinner.handleClear(document.querySelector('.container__modal'));  // *
            BODY.style.overflow = 'hidden';
        });
    }
};
export default new Users();