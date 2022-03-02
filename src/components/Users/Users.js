import 'tuicss';
import User from '../User';
import Repo from '../Repo';
import Spinner from '../Spinner';
import {Err} from '../Error';
import {getDataApi} from '../../utils';
import getApiUrlOptions from '../../utils/apiUrlUtils/getApiUrlOptions';
import {ROOT_INDEX, ROOT_MODAL, BODY} from '../../constants/root';
import {USERS_COMPONENT_ID, 
        USERS_COMPONENT_LOAD_MORE_ID, 
        ERROR_FULL_SCREEN_ID} from '../../constants/root';
import { API_URL_USERS_BASE } from '../../constants/api/apiUrl';
import { API_URL_PAGE_REGEXP } from '../../constants/api/apiUrlRegExp';
import {modalHtmlSkeleton, usersHtmlSkeleton} from './UsersHtml.js';
import styles from './Users.css';

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
            this.usersList.innerHTML = '';  // zeroing before new data render 
            this.usersTotalCount.textContent = 0; // zeroing before new data render
            this.toggleStateLoadMoreBtn(false); // initial state
        }
        else { // click load more button
            this.dataPage++;
            this.isLoadMore = true;
            // set number for load page
            this.apiUrlRequest = this.apiUrlRequest.replace(API_URL_PAGE_REGEXP, (...match) => {
                return match[1] + this.dataPage;  
            });
        }
        // render spiner until data is loaded
        if(!this.isLoadMore) {
            Spinner.render(ROOT_INDEX, USERS_COMPONENT_ID);
        } else {
            Spinner.render(this.usersMoreBtn, USERS_COMPONENT_LOAD_MORE_ID);
        }
        const data = await getDataApi.getData(API_URL_USERS_BASE + this.apiUrlRequest);
        // data is loaded - stop spinner
        if(!this.isLoadMore) {
            Spinner.handleClear(USERS_COMPONENT_ID);
        } else {
            Spinner.handleClear(USERS_COMPONENT_LOAD_MORE_ID);
        }
        // check data for error
        if (data instanceof Error) {
            Err.render(ROOT_INDEX, ERROR_FULL_SCREEN_ID, data);
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
                <li class="${styles.users__item}" data-user-login='${login}'>
                    <div class="${styles.users__name}">${login}</div>
                    <div class="${styles.users__id}">${id}</div>
                    <img class="${styles.users__img}" src="${avatarUrl}" alt="user_avatar"/>
                </li>`;
            });
            if(isLoadMore) {   
                this.usersList.insertAdjacentHTML('beforeend', htmlUsers);
            }
            // if click the form button
            if(!isLoadMore) { 
                this.loadedUsersCounter = 0;
                // this.usersList.innerHTML = '';
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
            // this.usersList.innerHTML = '';
            this.loadedUsersCounter = 0;
            this.usersTotalCount.textContent = data.total_count;
            this.toggleStateLoadMoreBtn(data.total_count);
        }
    }
    // show/hide load more button
    _init() {
        this.usersList = ROOT_INDEX.querySelector('.users__list');
        this.usersTotalCount = document.querySelector('.users__total-count-item');
        this.usersMoreBtn = document.querySelector(`.${styles['users__more-btn']}`);
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
        this.usersList.addEventListener('click',  e => {
            const userCard = e.target.closest(`.${styles.users__item}`); 
            if(!userCard) return;
            // added html containers for display data
            ROOT_MODAL.insertAdjacentHTML('beforeend', modalHtmlSkeleton);
            User.render(userCard.getAttribute('data-user-login'));
            Repo.render(userCard.getAttribute('data-user-login'));
            BODY.style.overflow = 'hidden';
            // * BODY.style.overflow when error ?
        });
    }
};
export default new Users();