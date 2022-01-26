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


import 'tuicss';
class Users {
    currentDataPage = 1; // * validation 
    isLoadMore = false;
    usersList;  // * Does it need here?
    urlUsers = API_URL + '/' + API_URL_SEARCH + '/' + API_URL_USERS; // * ? one variable
    // currentRequestOptions = API_URL_USERS_OPTIONS;
    currentRequestOptions = '?q=';
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
        let qualifiers = '', parameters = '' + '&stars:>=1&sort=stars&order=desc&page=1&per_page=10';
        if(formData) {
            this.currentDataPage = 1; 
            this.isLoadMore = false;
            this.currentRequestOptions = '?q='; 
            // get request part of url
            for (const key in formData) {
                // get data from group (fieldset html tag)
                if(key.includes(apiUrlIdentifier.API_URL_GROUP_IDENTIFIER)) {
                    formData[key].forEach(item => {
                        // rule for single qualifiers
                        if(item[0].includes(apiUrlIdentifier.API_URL_SINGLE_QUALIFIER_IDENTIFIER) && item[1]) {
                            qualifiers += item[0].replace(apiUrlRegExp.API_URL_SINGLE_QUALIFIER_REGEXP, '') + item[1] + '+';
                        }
                        // rule for double qualifiers
                        if(item[0].includes(apiUrlIdentifier.API_URL_DOUBLE_QUALIFIER_IDENTIFIER) && item[1]) {
                            qualifiers += item[1] + ' ' + item[0].replace(apiUrlRegExp.API_URL_DOUBLE_QUALIFIER_REGEXP, '') + '+'; 
                        }
                        // rule for boolean operators
                        if(item[0].includes(apiUrlIdentifier.API_URL_BOOLEAN_OPERATOR_IDENTIFIER) && item[1]) {
                            qualifiers += item[1] + '+'; 
                        }
                        // console.log(item[0], item[1]);
                    });
                }
                // if the field for type user name/login/fullname is not empty

                // if(key == apiUrlElementName.NAME_SEARCH_VALUE && formData.qualifier[key]) {
                    
                //     this.currentRequestOptions += key + apiUrlSign.API_URL_COLON_SIGN + formData.qualifier[key] + apiUrlSign.API_URL_PLUS_SIGN;      
                // }
            }
            console.log(qualifiers);
            qualifiers = qualifiers.slice(0, qualifiers.length - 1);
            this.currentRequestOptions += qualifiers + parameters; 
            // this.currentRequestOptions = this.currentRequestOptions.slice(0, this.currentRequestOptions.length - 1);
            // get request part of url
            console.log(this.currentRequestOptions);

            // this.currentRequestOptions = this.currentRequestOptions.replace(API_URL_LANGUAGE_REGEXP, (...match) => {
            //     return match[1] + formData.language;
            // });
            // this.currentRequestOptions = this.currentRequestOptions.replace(API_URL_LOCATION_REGEXP, (...match) => {
            //     return match[1] + formData.country;
            // });
            // this.currentRequestOptions = this.currentRequestOptions.replace(API_URL_PAGE_REGEXP, (...match) => {
            //     return match[1] + this.currentDataPage;
            // });
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