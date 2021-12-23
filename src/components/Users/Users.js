import {API_URL, URL_ACTION, URL_USERS, URL_OPTIONS} from '../../constants/api';
import {getDataApi} from '../../utils';
import classes from './Users.css';
import {ROOT_INDEX, ROOT_MODAL, BODY} from '../../constants/root';

import User from '../User';
import Repo from '../Repo';
import Spinner from '../Spinner';
import Error from '../Error';
import {a} from '../User/User';
import {b} from '../User/test';

console.log(a.name);
// b.b = 'users';
console.log('b.b ', b.b);
class Users {

    renderUsers(data) {
        let htmlContent = '';
    
        data.forEach(({id, login, avatar_url : avatarUrl}) => {
            htmlContent += `
                <li class="${classes.users__item}" data-user-login='${login}'>
                    <div class="${classes.users__name}">${login}</div>
                    <div class="${classes.users__id}">${id}</div>
                    <img class="${classes.users__img}" src="${avatarUrl}" alt="user_avatar"/>
                </li>
            `
        });
        const htmlWrapper = `
            <ul class="${classes.users__container}">
                ${htmlContent}
            </ul>
        `
        ROOT_INDEX.innerHTML = htmlWrapper;
    }
    async render() {
        let data = await getDataApi.getData(API_URL + '/' + URL_ACTION + '/' + URL_USERS  + 'd' + URL_OPTIONS);    
        data ? this.renderUsers(data) : Error.render();
    }
    eventListener() {
        document.querySelectorAll(`.${classes.users__item}`).forEach(el => {
            el.addEventListener('click', async () => {
                ROOT_MODAL.innerHTML += `        
                    <div class="wrapper__modal">
                        <div class="container__modal"></div>
                    </div>`;
                Spinner.render(document.querySelector('.container__modal'));
                            // <div class="${classes.user__container}">
                            //     ${htmlContent}
                            // </div>
                await User.render(el.getAttribute('data-user-login'));
                await Repo.render(el.getAttribute('data-user-login'));
                Spinner.handleClear(document.querySelector('.container__modal'));
                BODY.style.overflow = 'hidden';
            });
        });
    }
};

export default new Users();