import {API_URL, URL_ACTION, URL_USERS, URL_OPTIONS} from '../../constants/api';
import {getDataApi} from '../../utils';
import classes from './Users.css';
import {ROOT_INDEX} from '../../constants/root';
import User from '../User';
import Repo from '../Repo';

class Users {
    async render() {
        let data = await getDataApi.getData(API_URL + '/' + URL_ACTION + '/' + URL_USERS + URL_OPTIONS);    
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
    eventListener() {
        document.querySelectorAll(`.${classes.users__item}`).forEach(el => {
            el.addEventListener('click', () => {
                User.render(el.getAttribute('data-user-login'));
                Repo.render(el.getAttribute('data-user-login'));
            });
        });
    }
};
export default new Users();