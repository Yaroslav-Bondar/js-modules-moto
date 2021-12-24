import {getDataApi} from '../../utils';
import dataWorker from '../../utils/';
import classes from './User.css';
import {API_URL, URL_USERS} from '../../constants/api';
import {Err} from '../Error';

function User() {

}
User.prototype.userRender = function(data) {
    let fieldHtml = '';
    const topKeys = ['name', 'login', 'id', 'location', 'email', 'twitter_username',
                    'html_url', 'blog', 'company', 'created_at', 'updated_at'];
    const notEnteredKey = ['avatar_url', 'bio', 'gravatar_id'];
    const keysName = {
        twitter_username: 'twitter',
        html_url: 'gitHub',
    };
    const dataCorrected = dataWorker.correctData(data);

    dataWorker.sortKey(dataCorrected, topKeys, notEnteredKey).forEach(key => {
        fieldHtml += dataWorker.renderFields(dataCorrected, key, keysName);
    });
    user.classList.add(`${classes.user__container}`);
    user.innerHTML = `
        <h2 class="${classes.user__title}">Hero</h2>
        <div class="${classes.user__avatar}">
            <img src="${dataCorrected.avatar_url}" alt="avatar" class="${classes['user__avatar-img']}">
            <span class="${classes['user__avatar-field']}">bio:</span>
            <span class="${classes['user__avatar-bio']}">${dataCorrected.bio}</span>
        </div>
        <ul class="${classes.user__info}">
            ${fieldHtml}
        </ul>`;
}
User.prototype.render = async function(login) {
    const userUrl = API_URL + '/' + URL_USERS + '/' + login;  
    const data = await getDataApi.getData(userUrl);
    data instanceof Error ? Err.render(data, user, 'error__miniscreen', 'error user data') : this.userRender(data);
}
export default new User();