import {API_URL, API_URL_SEARCH, API_URL_USERS, API_URL_USERS_OPTIONS, REGEXP_LANGUAGE, REGEXP_LOCATION} from '../../constants/api';
import {getDataApi} from '../../utils';
import classes from './Users.css';
import {ROOT_INDEX, ROOT_MODAL, BODY} from '../../constants/root';
import User from '../User';
import Repo from '../Repo';
import Spinner from '../Spinner';
import {Err} from '../Error';
import 'tuicss';
class Users {
    currentPageData = 1;
    isLoadMore = false;
    usersList;
    renderUsers(data, isLoading) {   // possible use Promise, for discrete rendering
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
            this.usersList = ROOT_INDEX.querySelector('.users__list');
        }
     }
    async render(formData) {
        if(formData) {
            this.currentPageData = 1;
            this.isLoadMore = false;
        }
        else {
            this.currentPageData++;
            this.isLoadMore = true;
        }
        let usersUrlTemplate = API_URL + '/' + API_URL_SEARCH + '/' + API_URL_USERS;
        let requestOption = API_URL_USERS_OPTIONS;
        // if(language) {
            requestOption = requestOption.replace(REGEXP_LANGUAGE, (...match) => {
                return match[1] + formData.language;
            });
        // }
        // if(location) {
            requestOption = requestOption.replace(REGEXP_LOCATION, (...match) => {
                return match[1] + formData.country;
            });
        // }
        // console.log(requestOption);
        usersUrlTemplate += requestOption;
        // console.log(usersUrlTemplate);
        let data = await getDataApi.getData(usersUrlTemplate);
        // console.log(data);
        if (data instanceof Error) {
            Err.render(data, ROOT_INDEX, 'error__fullscreen', '');
        }
        else {
            this.renderUsers(data, this.isLoadMore);
            this.eventListener();
        }
    }
    eventListenerLoadMore() {
        document.querySelector('.users__load-more').addEventListener(() => {
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
                Spinner.render(document.querySelector('.container__modal'));
                await User.render(el.getAttribute('data-user-login'));
                await Repo.render(el.getAttribute('data-user-login'));
                Spinner.handleClear(document.querySelector('.container__modal'));
                BODY.style.overflow = 'hidden';
            });
        });
    }
};
export default new Users();