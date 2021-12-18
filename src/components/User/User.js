import { ROOT_MODAL } from '../../constants/root';
import {getDataApi} from '../../utils';
import dataWorker from '../../utils/'
import classes from './User.css';
import {API_URL, URL_USERS} from '../../constants/api';

function User() {

}
User.prototype.render = async function(login) {
    let htmlContent, fieldHtml = '';
    const topKeys = ['name', 'login', 'id', 'location', 'email', 'twitter_username',
                    'html_url', 'blog', 'company', 'created_at', 'updated_at'];
    const notEnteredKey = ['avatar_url', 'bio', 'gravatar_id'];
    const keysName = {
        twitter_username: 'twitter',
        html_url: 'gitHub',
    };
    const userUrl = API_URL + '/' + URL_USERS + '/' + login;  
    const data = await getDataApi.getData(userUrl);
    const dataCorrected = dataWorker.correctData(data);

    dataWorker.sortKey(dataCorrected, topKeys, notEnteredKey).forEach(key => {
        fieldHtml += dataWorker.renderFields(dataCorrected, key, keysName);
            
    });
    htmlContent += `
        <h2 class="${classes.user__title}">Hero</h2>
        <div class="${classes.user__avatar}">
            <img src="${dataCorrected.avatar_url}" alt="avatar" class="${classes['user__avatar-img']}">
            <span class="${classes['user__avatar-field']}">bio:</span>
            <span class="${classes['user__avatar-bio']}">${dataCorrected.bio}</span>
        </div>
        <ul class="${classes.user__info}">
            ${fieldHtml}
        </ul>
        <button onclick='modal.innerHTML = ""' class="${classes.user__close}">
            [x]
        </button>
    `;
    const htmlWrapper = `
        <div class="wrapper__modal">
            <div class="container__modal">
                <div class="${classes.user__container}">
                    ${htmlContent}
                </div>
            </div>
        </div>
    `;
    ROOT_MODAL.innerHTML = htmlWrapper;
}
export default new User();