import {API_URL, API_URL_SEARCH, API_URL_USERS, API_URL_USERS_OPTIONS, 
    API_URL_LANGUAGE_REGEXP, API_URL_LOCATION_REGEXP, API_URL_PAGE_REGEXP} from '../../constants/api';
import {getDataApi} from '../../utils';
import classes from './Users.css';
import {ROOT_INDEX, ROOT_MODAL, BODY} from '../../constants/root';
import User from '../User';
import Repo from '../Repo';
import Spinner from '../Spinner';
import {Err} from '../Error';
import 'tuicss';
class Users {
    currentDataPage = 1; // * validation 
    isLoadMore = false;
    usersList;
    urlUsers = API_URL + '/' + API_URL_SEARCH + '/' + API_URL_USERS; // * ? one variable
    currentRequestOptions = API_URL_USERS_OPTIONS;
    renderUsers(data, isLoading) {   // possible use Promise, for discrete rendering
        // console.log(data.length);
        let htmlUsers = '';
        data.items.forEach(({id, login, avatar_url : avatarUrl}) => {
            htmlUsers += `
            <li class="${classes.users__item}" data-user-login='${login}'>
                <div class="${classes.users__name}">${login}</div>
                <div class="${classes.users__id}">${id}</div>
                <img class="${classes.users__img}" src="${avatarUrl}" alt="user_avatar"/>
            </li>`;
        });
        // if click the load more button
        if(this.usersList && isLoading) {  // * possible without this.usersList 
            this.usersList.insertAdjacentHTML('beforeend', htmlUsers);
        }
        // if click the load form button
        if(this.usersList && !isLoading) {  // * possible without this.usersList
            this.usersList.innerHTML = '';
            this.usersList.insertAdjacentHTML('beforeend', htmlUsers);
        }
        // if rendered for the first time
        if(!this.usersList) {   // * update users__amount
            let html =`
            <div class="users__container">
                <div class="users__amount">${data.total_count}</div>  
                <ul class="users__list">
                    ${htmlUsers}
                </ul>
                <button type="button" class="users__load-more">Load more</button>
            </div>`;
            ROOT_INDEX.insertAdjacentHTML('beforeend', html);
            this.init();
        }
    }
    init() {
        this.usersList = ROOT_INDEX.querySelector('.users__list');
        this.eventListenerLoadMore();
    }
    async render(formData) {
        if(formData) {
            this.currentDataPage = 1; 
            this.isLoadMore = false;
            this.currentRequestOptions = this.currentRequestOptions.replace(API_URL_LANGUAGE_REGEXP, (...match) => {
                return match[1] + formData.language;
            });
            this.currentRequestOptions = this.currentRequestOptions.replace(API_URL_LOCATION_REGEXP, (...match) => {
                return match[1] + formData.country;
            });
            this.currentRequestOptions = this.currentRequestOptions.replace(API_URL_PAGE_REGEXP, (...match) => {
                return match[1] + this.currentDataPage;
            });
        }
        else {
            this.currentDataPage++;
            this.isLoadMore = true;
            this.currentRequestOptions = this.currentRequestOptions.replace(API_URL_PAGE_REGEXP, (...match) => {
                return match[1] + this.currentDataPage;
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
        document.querySelector('.users__load-more').addEventListener('click', () => {
            // console.log('eventListenerLoadMore()');
            this.render();
        });
    }
    eventListener() {
        document.querySelectorAll(`.${classes.users__item}`).forEach(el => {
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