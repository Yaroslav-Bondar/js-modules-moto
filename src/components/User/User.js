import {getDataApi} from '../../utils/getDataApi';
// import axios from 'axios';
// const data = getDataApi.getData('https://api.github.com/users/mourner');
function User() {

}
User.prototype.render = async function(url) {
    let htmlContent = '';
    const data = await getDataApi.getData(url);
    console.log(data);
    // checking for an empty field and replace it
    const correctData = Object.fromEntries(Object.entries(data).map(item => 
        item[1] === '' ||  item[1] === null ? [item[0], 'data not specified'] : item
    ));
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