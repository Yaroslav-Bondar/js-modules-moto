import {getDataApi} from '../../utils';
import dataWorker from '../../utils/';
import styles from './User.css';
import {API_URL_USER_BASE} from '../../constants/api/apiUrl';
import {Err} from '../Error';
import Spinner from '../Spinner';
import {userHtmlSkeleton} from './UserHtml';

function User(){};

User.prototype.userRender = function(data) {
    let userInfo = '';
    const topKeys = ['name', 'login', 'id', 'location', 'email', 'twitter_username',
                    'html_url', 'blog', 'company', 'created_at', 'updated_at'];
    const notEnteredKey = ['avatar_url', 'bio', 'gravatar_id', 'node_id'];
    const keysName = {
        twitter_username: 'twitter',
        html_url: 'gitHub',
    };
    const dataCorrected = dataWorker.correctData(data);
    dataWorker.sortKey(dataCorrected, topKeys, notEnteredKey).forEach(key => {
        userInfo += dataWorker.renderFields(dataCorrected, key, keysName);
    });
    // insert html container 
    user.insertAdjacentHTML('afterbegin', userHtmlSkeleton);
    // insert user info into html container
    user.querySelector(`.${styles['user__avatar-img']}`).src = `${dataCorrected.avatar_url}`;
    user.querySelector(`.${styles['user__avatar-bio']}`).textContent = `${dataCorrected.bio}`;
    user.querySelector(`.${styles['user__info']}`).insertAdjacentHTML('afterbegin', `${userInfo}`);
}
User.prototype.render = async function(login) {
    Spinner.render(user, '')
    const data = await getDataApi.getData(API_URL_USER_BASE + login);
    Spinner.handleClear();
    data instanceof Error ? Err.render(data, user, 'error__miniscreen', 'error user data') : this.userRender(data);
}

export default new User();