import Spinner from '../Spinner';
import {Err} from '../Error';
import {getDataApi} from '../../utils';
import dataWorker from '../../utils/';
import {userHtmlSkeleton} from './UserHtml';
import {API_URL_USER_BASE} from '../../constants/api/apiUrl';
import {USER_COMPONENT_ID, USER_ERROR_MESSAGE, ERROR_LOCAL_ID} from '../../constants/root';
import styles from './User.css';

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
    Spinner.render(user, USER_COMPONENT_ID);
    // Spinner.render(user, `${styles['user__spinner']}`, 'user loading...:');
    const data = await getDataApi.getData(API_URL_USER_BASE + login);
    Spinner.handleClear(USER_COMPONENT_ID);
    data instanceof Error ? Err.render(user, ERROR_LOCAL_ID, data, USER_ERROR_MESSAGE) : this.userRender(data);
}

export default new User();