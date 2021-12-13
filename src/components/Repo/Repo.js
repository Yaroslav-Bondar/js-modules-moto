import {getDataApi} from '../../utils';
// import {correctData} from '../../utils';
// import {sortData} from '../../utils';
import dataWorker from '../../utils';
import {API_URL, URL_REPO, URL_ACTION, URL_REPO_OPTIONS} from '../../constants/api';
import {ROOT_MODAL} from '../../constants/root';
class Repo {
    async render(login) {
        const repoUrlTemplate = API_URL + '/' + URL_ACTION + '/' + URL_REPO + URL_REPO_OPTIONS;
        let fieldHtml = '';

        const wrapperModal = document.querySelector('.wrapper__modal');
        // console.log(repoUrlTemplate);
        // const repoUrl = repoUrlTemplate.replace(/(user):(user)/, (...match) => {console.log(match); 
            // return `${match[1]}:${login}`});
        const topKeys = ['name', 'full_name', 'html_url', 'clone_url', 'git_url', 'stargazers_count',
                        'language', 'id', 'description', 'created_at', 'updated_at', 'pushed_at'];
        const notEnteredKey = [];
        const keysName = {};
        const repoUrl = repoUrlTemplate.replace(/user_name/, login);    
        const data = await getDataApi.getData(repoUrl);
        // const dataCorrected = dataWorker.correctData(repo);
        data.forEach(repo => {
            console.log('-------')
            dataWorker.sortData(dataWorker.correctData(repo), topKeys, notEnteredKey).forEach(key => {
                console.log(key);
                fieldHtml += dataWorker.renderFields(dataWorker.correctData(repo), key, keysName);

            });
            // console.log(dataCorrect);
        });

        // <div class="wrapper__modal">
        // </div>
        const htmlWrapper = `
            <div class="repo__container">
                <h2 class="repo__title">User repository</h2>
                <ul class="repo__info">
                    ${fieldHtml};
                </ul>
            </div>
            `;
        document.querySelector('.container__modal').insertAdjacentHTML('beforeend', htmlWrapper);
        // wrapperModal.insertAdjacentHTML('beforeend', htmlWrapper);
        // wrapperModal.innerHTML += htmlWrapper;
        // ROOT_MODAL.innerHTML += htmlWrapper;
        // console.log(data);
        // console.log(typeof repoUrl);
    }
}
export default new Repo();