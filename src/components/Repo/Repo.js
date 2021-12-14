import {getDataApi} from '../../utils';
// import {correctData} from '../../utils';
// import {sortData} from '../../utils';
import classes from './Repo.css';
import dataWorker from '../../utils';
import {API_URL, URL_REPO, URL_ACTION, URL_REPO_OPTIONS} from '../../constants/api';
// import {ROOT_MODAL} from '../../constants/root';
class Repo {
    async render(login) {
        const repoUrlTemplate = API_URL + '/' + URL_ACTION + '/' + URL_REPO + URL_REPO_OPTIONS;
        let fieldHtml = '', reposHtml = '';
        const showMoreHtml = `<button class="show__more">Show more</button>
                                <button class="show__less">Show less</button>`;

        const topKeys = ['name', 'full_name', 'html_url', 'clone_url', 'git_url', 'stargazers_count',
                        'language', 'id', 'description', 'created_at', 'updated_at', 'pushed_at'];
        const notEnteredKey = [];
        const keysName = {};
        const repoUrl = repoUrlTemplate.replace(/user_name/, login);    
        const data = await getDataApi.getData(repoUrl);
        
        data.forEach(repo => {
            const dataCorrected = dataWorker.correctData(repo);
            // console.log('-------');
            dataWorker.sortData(dataCorrected, topKeys, notEnteredKey).forEach(key => {
                // console.log(key);
                fieldHtml += dataWorker.renderFields(dataCorrected, key, keysName, classes.repo__field,
                             classes.repo__key, classes.repo__value);
            });
            reposHtml += `<ul class="${classes.repo__fields}">${fieldHtml + showMoreHtml}</ul>`;
            fieldHtml = '';
        });
        const htmlWrapper = `
            <div class="${classes.repo__container}">
                <h2 class="${classes.repo__title}">User repository</h2>
                <ul class="${classes.repo__info}">
                    ${reposHtml};
                </ul>
            </div>
            `;
        document.querySelector('.container__modal').insertAdjacentHTML('beforeend', htmlWrapper);
        this.showMore();
    }
    showMore() {
        document.querySelectorAll('.show__more').forEach(el => {
            el.addEventListener('click', ()=> {
                const fields = el.parentNode.childNodes;
                // console.log(getComputedStyle(el.parentNode.childNodes[4]).display);
                for(let i = 0; i < 5; i++) {
                    for (let i = 0; i < fields.length; i++) {
                        if(getComputedStyle(fields[i]).display != 'none') {
                            
                        }
                    }
                    // el.parentNode.childNodes
                }
                // console.log(getComputedStyle(el.parentNode.childNodes[10]).display);


                // console.log(e.target.parentNode.childNodes);


                // if(e.target.className == 'show__more')
                //     console.log('hello');
            })
        });
    }
}
export default new Repo();