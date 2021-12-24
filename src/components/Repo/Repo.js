import {getDataApi} from '../../utils';
import classes from './Repo.css';
import dataWorker from '../../utils';
import {API_URL, URL_REPO, URL_ACTION, URL_REPO_OPTIONS} from '../../constants/api';
import {Err} from '../Error';
class Repo {
    async render(login) {
        const repoUrlTemplate = API_URL + '/' + URL_ACTION +  'd' + '/' + URL_REPO + URL_REPO_OPTIONS;
        const repoUrl = repoUrlTemplate.replace(/user_name/, login);    
        const data = await getDataApi.getData(repoUrl);
        data instanceof Error ? Err.render(data, repo) : this.renderRepo(data);
    }
    renderRepo(data) {
        let fieldHtml = '', reposHtml = '';
        const buttonsHtml = `<button class="show__more ${classes['repo__show-more']}">Show more</button>
                                <button class="show__less ${classes['repo__show-less']}">Show less</button>`;

        const topKeys = ['name', 'full_name', 'html_url', 'clone_url', 'git_url', 'stargazers_count',
                        'language', 'id', 'description', 'created_at', 'updated_at', 'pushed_at'];
        const notEnteredKey = [];
        const keysName = {};
        data.forEach(repo => {
            const dataCorrected = dataWorker.correctData(repo);
            dataWorker.sortKey(dataCorrected, topKeys, notEnteredKey).forEach(key => {
                fieldHtml += dataWorker.renderFields(dataCorrected, key, keysName, classes.repo__field,
                             classes.repo__key, classes.repo__value);
            });
            reposHtml += `<ul class="${classes.repo__fields}">${fieldHtml + buttonsHtml}</ul>`;
            fieldHtml = '';
        });
        repo.innerHTML = `
            <h2 class="${classes.repo__title}">User repository</h2>
            <ul class="${classes.repo__info}">
                ${reposHtml};
            </ul>`; 
        this.showMore();
        this.showLess();
    }
    showMore() {
        document.querySelector(`.${classes.repo__info}`).addEventListener('click', (e) => {
            if(!e.target.classList.contains(`${classes['repo__show-more']}`)) return;
            const parent = e.target.parentNode;
            const fields = parent.querySelectorAll('li');
            const buttonMore = parent.querySelector(`.${classes['repo__show-more']}`);
            const buttonLess = parent.querySelector(`.${classes['repo__show-less']}`);
            if(buttonLess.style.display = 'none') buttonLess.style.display = 'inline-block';
            let counter = 0;
            for(let i = 0; i < fields.length; i++) {
                if(getComputedStyle(fields[i]).display == 'none') {
                    fields[i].style.display = 'block';
                    counter++;
                }
                if(i == fields.length - 1) buttonMore.style.display = 'none';
                if(counter == 5) return;
            }
        });
    }
    showLess() {
        document.querySelector(`.${classes.repo__info}`).addEventListener('click', (e) => {
            if(!e.target.classList.contains(`${classes['repo__show-less']}`)) return;
            const parent = e.target.parentNode;
            const fields = parent.querySelectorAll('li');
            const buttonMore = parent.querySelector(`.${classes['repo__show-more']}`);
            const buttonLess = parent.querySelector(`.${classes['repo__show-less']}`);
            let counter = 0;
            
            if(buttonMore.style.display = 'none') buttonMore.style.display = 'inline-block';

            for (let i = fields.length - 1; getComputedStyle(fields[i]).display !== 'list-item'; i--) {
                if(fields[i].style.display == 'block') {
                    fields[i].style.display = 'none';
                    counter++;
                }
                if(getComputedStyle(fields[i - 1]).display == 'list-item') buttonLess.style.display = 'none';
                if(counter == 5) return;
            }
        });
    }
}
export default new Repo();