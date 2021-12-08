// import {API_URL, URL_USERS, URL_OPTIONS} from '../../constants/api'
import {API_URL, URL_ACTION, URL_USERS, URL_OPTIONS} from '../../constants/api';
import {getDataApi} from '../../utils/getDataApi';
import classes from './Users.css';
import {ROOT_INDEX} from '../../constants/root';
import User from '../User';

class Users {
    async render() {
        // let data = await getDataApi.getData(API_URL + URL_COMICS)
        // let url = API_URL + '/' + URL_ACTION + '/' + URL_USERS + URL_OPTIONS;
        let data = await getDataApi.getData(API_URL + '/' + URL_ACTION + '/' + URL_USERS + URL_OPTIONS);    
        // console.log('data is ', typeof data);
        let htmlContent = ''

        data.forEach(({id, login, avatar_url : avatarUrl}) => {
            // console.log(id, login, ava);
            // if the path contain an image    
            // if(!path.includes(IMG_NOT_AVAILABLE)) {
                const userUrl = API_URL + '/' + URL_USERS + '/' + login;  
                // const imgSrc = path + '/' + IMG_STANDART_XLARGE + '.' + extension
                // const imgSrc = ava;
                htmlContent += `
                    <li class="${classes.user__item}" data-user-url='${userUrl}'>
                        <div class="${classes.user__name}">${login}</div>
                        <div class="${classes.user__id}">${id}</div>
                        <img class="${classes.user__img}" src="${avatarUrl}" alt="user_avatar"/>
                    </li>
                `
            // }
        })
        const htmlWrapper = `
            <ul class="${classes.user__container}">
                ${htmlContent}
            </ul>
        `
        ROOT_INDEX.innerHTML = htmlWrapper
    }
    eventListener() {
        document.querySelectorAll(`.${classes.user__item}`).forEach(el => {
            el.addEventListener('click', () => {
                // console.log(el.dataset.userUrl);
                // console.log(el.getAttribute('data-user-url'));
                User.render(el.getAttribute('data-user-url'));
            })
        })
    }
}

export default new Users();