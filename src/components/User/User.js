import { ROOT_MODAL } from '../../constants/root';
import {getDataApi} from '../../utils/getDataApi';
import classes from './User.css';
// import axios from 'axios';
// const data = getDataApi.getData('https://api.github.com/users/mourner');
function User() {

}
User.prototype.render = async function(url) {
    console.log(url);
    let htmlContent, fieldHtml = '';
    let minorKeys, sortedKeys, keys, fieldName;
    const topKeys = ['name', 'login', 'id', 'location', 'email', 'twitter_username',
                    'html_url', 'blog', 'company', 'created_at', 'updated_at'];
    const notEnteredKey = ['avatar_url', 'bio', 'gravatar_id'];
    const keysName = {
        twitter_username: 'twitter',
        html_url: 'gitHub',
    };
    const data = await getDataApi.getData(url);
    // checking for an empty field and replace it
    const correctData = Object.fromEntries(Object.entries(data).map(item => 
        item[1] === '' ||  item[1] === null ? [item[0], 'data not specified'] : item
    ).filter(([, value]) => !/^https:\/\/api/.test(value)));
    
    keys = Object.keys(correctData);
    minorKeys = keys.filter(key => !topKeys.includes(key)).sort();
    sortedKeys = topKeys.concat(minorKeys).filter(key => !notEnteredKey.includes(key));
    sortedKeys.forEach(key => {
        fieldName = keysName[key] ? keysName[key] : key;
        fieldHtml += `
            <li class="${classes.user__field}">
                <span class="${classes['user__field-name']}">${fieldName}:</span>
                <span class="${classes['user__field-name']}">${correctData[key]}</span>
            </li>`    
    });
    htmlContent += `
        <h2 class="${classes.user__title}">Hero</h2>
        <div class="${classes.user__avatar}">
            <img src="${correctData.avatar_url}" alt="avatar" class="${classes['user__avatar-img']}">
            <span class="${classes['user__avatar-field']}">bio:</span>
            <span class="${classes['user__avatar-bio']}">${correctData.bio}</span>
        </div>
        <ul class="${classes.user__info}">
            ${fieldHtml}
        </ul>
        <button onclick='modal.innerHTML = ""' class="${classes.user__close}">
            [x]
        </button>
    `;
    const htmlWrapper = `
        <div class="${classes.user__container}">
            ${htmlContent}
        </div>
    `;
    ROOT_MODAL.innerHTML = htmlWrapper;
}
export default new User();