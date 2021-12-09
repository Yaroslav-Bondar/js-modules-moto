import { ROOT_MODAL } from '../../constants/root';
import {getDataApi} from '../../utils/getDataApi';
// import axios from 'axios';
// const data = getDataApi.getData('https://api.github.com/users/mourner');
function User() {

}
User.prototype.render = async function(url) {
    let htmlContent, fieldHtml = '';
    // const order [name, login, id, location, email, twitter_username,
    //                 html_url, blog, company, ];
    const data = await getDataApi.getData(url);
    console.log(data);
    // checking for an empty field and replace it
    const correctDataObj = Object.fromEntries(Object.entries(data).map(item => 
        item[1] === '' ||  item[1] === null ? [item[0], 'data not specified'] : item
    ).filter(([, value]) => !/^https:\/\/api/.test(value)));
    const correctDataArray = Object.keys(correctDataObj);

    const [name, login, id, location, email, twitter_username,
        html_url, blog, company, ...restKeys] = correctDataArray;
    console.log(Object.entries(correctData).length);
    console.log(correctData);
    for (const field of correctData) {
        fieldHtml += `
            <li class="user__field">
                <span class="user__field-name">field:</span>
                <span class="user__field-value">${correctData.field}</span>
            </li>
        `    
    }
    htmlContent += `
        <h2 class="user__title">Hero</h2>
        <div class="user__avatar">
            <img src="${correctData.avatar_url}" alt="avatar" class="user__avatar-item">
            <span class="user__avatar-field">bio:</span>
            <span class="user__avatar-bio">${correctData.bio}</span>
        </div>
        <ul class="user__info">
            <li class="user__field">
                <span class="user__field-name">name:</span>
                <span class="user__field-value">${correctData.name}</span>
            </li>
            <li class="user__field">
                <span class="user__field-name">login:</span>
                <span class="user__field-value">${correctData.login}</span>
            </li>
            <li class="user__field">
                <span class="user__field-name">id:</span>
                <span class="user__field-value">${correctData.id}</span>
            </li>
            <li class="user__field">
                <span class="user__field-name">location:</span>
                <span class="user__field-value">${correctData.location}</span>
            </li>
            <li class="user__field">
                <span class="user__field-name">email:</span>
                <span class="user__field-value">${correctData.email}</span>
            </li>
            <li class="user__field">
                <span class="user__field-name">twitter:</span>
                <span class="user__field-value">${correctData.twitter_username}</span>
            </li>
            <li class="user__field">
                <span class="user__field-name">company:</span>
                <span class="user__field-value">${correctData.company}</span>
            </li>
            <li class="user__field">
                <span class="user__field-name">blog:</span>
                <span class="user__field-value">${correctData.blog}</span>
            </li>
            <li class="user__field">
                <span class="user__field-name">gitHub:</span>
                <span class="user__field-value">${correctData.html_url}</span>
            </li>
            <li class="user__field">
                <span class="user__field-name">admin:</span>
                <span class="user__field-value">${correctData.site_admin}</span>
            </li>
            <li class="user__field">
                <span class="user__field-name">type:</span>
                <span class="user__field-value">${correctData.type}</span>
            </li>
            <li class="user__field">
                <span class="user__field-name">public repos:</span>
                <span class="user__field-value">${correctData.public_repos}</span>
            </li>
            <li class="user__field">
                <span class="user__field-name">hirable:</span>
                <span class="user__field-value">${correctData.hireable}</span>
            </li>
            <li class="user__field">
                <span class="user__field-name">following</span>
                <span class="user__field-value">${correctData.following}</span>
            </li>
            <li class="user__field">
                <span class="user__field-name">followers</span>
                <span class="user__field-value">${correctData.followers}</span>
            </li>
        </ul>
    `;
    const htmlWrapper = `
        <div class="user__container">
            ${htmlContent}
        </div>
    `;
    ROOT_MODAL.innerHTML = htmlWrapper;
    // let {name, login, location, id, html_url : gitHubUrl, email,} = correctData;

    // const dataArray = Object.entries(data).map(item => !item[1] ? [item[0], 'data not specified'] : item);
    // console.log(correctData);
    // let {avatar_url: avatarUrl} = data;
    //     htmlContent += `
    //         <li class="${s}">
    //             <img class="" src="${avatarUrl}" />
    //             <span class="${s}">${name}</span>
    //         </li>
    //     `;
}
export default new User();
// console.log(data);