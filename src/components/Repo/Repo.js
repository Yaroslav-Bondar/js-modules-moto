import {Err} from '../Error';
import Spinner from '../Spinner';
import dataWorker from '../../utils';
import getApiUrlOptions from '../../utils/apiUrlUtils/getApiUrlOptions';
import {getDataApi} from '../../utils';
import {API_URL_REPO_BASE} from '../../constants/api/apiUrl';
import {API_URL_USER_QUALIFIER} from '../../constants/api/apiUrlQualifier';
import {API_URL_REPO_DATA} from '../../constants/api/apiUrlValue';
import { API_URL_PAGE_REGEXP } from '../../constants/api/apiUrlRegExp';
import {REPO_COMPONENT_ID, REPO_COMPONENT_LOAD_MORE_ID} from '../../constants/root';
import {repoHtmlSkeleton, repoHtmlInfoBtns} from './RepoHtml';
import styles from './Repo.css';

class Repo {
    loadedRepoCounter = 0;  
    apiUrlRepoData = API_URL_REPO_DATA; 
    async render(login) {
        if(login) {  
            this.dataPage = 1; 
            this.apiUrlRepoData[API_URL_USER_QUALIFIER] = login; // adding user login value to "serialized" object
            this.apiUrlRequest = getApiUrlOptions(this.apiUrlRepoData); // get api query string from serialization object

        } // when click the load more button
        else {
            this.dataPage++;
            this.apiUrlRequest = this.apiUrlRequest.replace(API_URL_PAGE_REGEXP, (...match) => {
                return match[1] + this.dataPage; 
            });
        }
        // render spiner until data is loaded
        if(this.dataPage === 1) {
            Spinner.render(repo, REPO_COMPONENT_ID);
        }
        else {   // when click the load more button
            Spinner.render(this.repoMoreBtn, REPO_COMPONENT_LOAD_MORE_ID);
        }
        const data = await getDataApi.getData(API_URL_REPO_BASE + this.apiUrlRequest);
        // data is loaded - stop spinner
        if(this.dataPage === 1) {
            Spinner.handleClear(REPO_COMPONENT_ID);
        }
        else {
            Spinner.handleClear(REPO_COMPONENT_LOAD_MORE_ID);
        }
        // check data for error
        data instanceof Error ? Err.render(data, repo) : this.renderRepo(data);
    }
    renderRepo(data) {
        // creating containers for display repo data
        if(!document.querySelector(`.${styles.repo__list}`)) {
            repo.insertAdjacentHTML('beforeend', repoHtmlSkeleton);
            this.init();
        }
        if(data.items.length) {
            // increase counter loaded repositories
            this.loadedRepoCounter += data.items.length;
            // update the display of the total number of the downloaded repo
            if(data.total_count != this.repoTotalCountItem.textContent)
                this.repoTotalCountItem.textContent = data.total_count;
            if(data.total_count === this.loadedRepoCounter){
                this.toggleStateRepoMoreBtn(false);
                this.loadedRepoCounter = 0
            }
            let fieldHtml = '', reposHtml = '';
            // keys to be displayed first
            const topKeys = ['name', 'full_name', 'html_url', 'clone_url', 'git_url', 'stargazers_count',
                            'language', 'id', 'description', 'created_at', 'updated_at', 'pushed_at'];
            const notEnteredKey = []; // not included keys to display
            const keysName = {}; // names of displayed keys (if needed)
            data.items.forEach(repo => {
                // get html to render with sorted, desired keys and display order
                const dataCorrected = dataWorker.correctData(repo);
                
                dataWorker.sortKey(dataCorrected, topKeys, notEnteredKey).forEach(key => {
                    fieldHtml += dataWorker.renderFields(dataCorrected, key, keysName, styles.repo__field,
                                 styles.repo__key, styles.repo__value);
                });
                reposHtml += `<ul class="${styles.repo__fields}">${fieldHtml + repoHtmlInfoBtns}</ul>`;
                fieldHtml = '';
            });
            this.repoList.insertAdjacentHTML('beforeend', reposHtml);
            this.handlerRepoInfoBtns();
        } else {
            this.toggleStateRepoMoreBtn(false);  // hide loadMoreRepoBtn
            this.loadedRepoCounter = 0 
            this.repoTotalCountItem.textContent = data.total_count;        
        } 
    }
    init() {
        this.repoMoreBtn = document.querySelector(`.${styles['repo__download-more-btn']}`);
        this.repoList = document.querySelector(`.${styles.repo__list}`);
        this.repoTotalCountItem = document.querySelector(`.${styles['repo__total-count-item']}`);
        this.handlerRepoMoreBtn();
    }
    // show/hide load more button
    toggleStateRepoMoreBtn(state) {
        this.repoMoreBtn.style.display = state ? 'block' : 'none';
    }
    handlerRepoMoreBtn() {
        this.repoMoreBtn.addEventListener('click', () => {
            this.render();
        });
    }
    // show less fields about the repository    
    handlerLessRepoInfoBtn(fields, btnLess, btnMore) {
        if(btnMore.style.display = 'none') btnMore.style.display = 'inline-block';
        let counter = 0;
        for (let i = fields.length - 1; getComputedStyle(fields[i]).display !== 'list-item'; i--) {
            if(fields[i].style.display == 'block') {
                fields[i].style.display = 'none';
                counter++;
            }
            if(getComputedStyle(fields[i - 1]).display == 'list-item') btnLess.style.display = 'none';
            if(counter == 5) return;
        }
    }
    // show more fields about the repository    
    handlerMoreRepoInfoBtn(fields, btnLess, btnMore) {
        if(btnLess.style.display = 'none') btnLess.style.display = 'inline-block';
        let counter = 0;
        for(let i = 0; i < fields.length; i++) {
            if(getComputedStyle(fields[i]).display == 'none') {
                fields[i].style.display = 'block';
                counter++;
            }
            if(i == fields.length - 1) btnMore.style.display = 'none';
            if(counter == 5) return;
        }
    }
    // show more/less fields about the repository    
    handlerRepoInfoBtns() {
        this.repoList.addEventListener('click', e => {
            const moreBtnSelector = `${styles['repo__show-more']}`;
            const lessBtnSelector = `${styles['repo__show-less']}`;
            const isMoreBtn = e.target.classList.contains(moreBtnSelector);
            const isLessBtn = e.target.classList.contains(lessBtnSelector);
            if(!isMoreBtn && !isLessBtn) return;
            const parent = e.target.parentNode;
            const fields = parent.querySelectorAll('li');
            if(isMoreBtn) {
                const buttonMore = e.target;
                const buttonLess = parent.querySelector('.' + lessBtnSelector);
                this.handlerMoreRepoInfoBtn(fields, buttonLess, buttonMore);
            } else {
                const buttonLess = e.target;
                const buttonMore = parent.querySelector('.' + moreBtnSelector);
                this.handlerLessRepoInfoBtn(fields, buttonLess, buttonMore);
            }  
        });
    }
}
export default new Repo();