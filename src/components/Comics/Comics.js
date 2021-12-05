// import {API_URL, URL_USERS, URL_OPTIONS} from '../../constants/api'
import {API_URL, URL_ACTION, URL_USERS, URL_OPTIONS} from '../../constants/api';
import {getDataApi} from '../../utils/getDataApi'
import './Comics.css'
import {ROOT_INDEX} from '../../constants/root'

// console.log(ROOT_INDEX, ROOT_MODAL)

class Comics {
    async render() {
        // let data = await getDataApi.getData(API_URL + URL_COMICS)
        // let url = API_URL + '/' + URL_ACTION + '/' + URL_USERS + URL_OPTIONS;
        let data = await getDataApi.getData(API_URL + '/' + URL_ACTION + '/' + URL_USERS + URL_OPTIONS);    
        // console.log('data is ', typeof data);
        let htmlContent = ''

        data.forEach(({id, login, avatar_url : avatar}) => {
            // console.log(id, login, ava);
            // if the path contain an image    
            // if(!path.includes(IMG_NOT_AVAILABLE)) {
                const uri = API_URL + '/' + URL_USERS + '/' + login;  
                // const imgSrc = path + '/' + IMG_STANDART_XLARGE + '.' + extension
                // const imgSrc = ava;
                htmlContent += `
                    <li class="user__item" data-uri='${uri}'>
                        <div class="user__name">${login}</div>
                        <div class="user__id">${id}</div>
                        <img class="user__img" src="${avatar}" alt="user_picthure"/>
                    </li>
                `
            // }
        })
        const htmlWrapper = `
            <ul class="user__container">
                ${htmlContent}
            </ul>
        `
        ROOT_INDEX.innerHTML = htmlWrapper
    }
    eventListener() {
        document.querySelectorAll('.user__item').forEach(el => {
            el.addEventListener('click', () => {
                console.log(el.dataset.uri)
            })
        })
    }
}

export default new Comics()