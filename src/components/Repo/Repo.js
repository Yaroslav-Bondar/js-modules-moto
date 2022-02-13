import {getDataApi} from '../../utils';
import classes from './Repo.css';
import dataWorker from '../../utils';
// , API_URL_REPO_OPTIONS
import {API_URL, API_URL_REPO, API_URL_SEARCH, API_URL_PAGE_REGEXP} from '../../constants/api';
import {API_URL_SINGLE_QUALIFIER_REGEXP, API_URL_PARAMETER_REGEXP} from '../../constants/api/apiUrlIdentifier';
import {API_URL_USER_QUALIFIER, API_URL_LANGUAGE_QUALIFIER} from '../../constants/api/apiUrlQualifier';
import {API_URL_REPO_DATA} from '../../constants/api/apiUrlValue';
import getApiUrlOptions from '../../utils/apiUrlUtils/getApiUrlOptions';
import {Err} from '../Error';
// import from '../';

class Repo {
    currentDataPage = 1;
    apiUrlRepoOptions;
    totalLoadedRepo = 0;

    async render(login) {
        let apiUrlRepoData;
        if(login) {
            this.currentDataPage = 1; 
            apiUrlRepoData = API_URL_REPO_DATA;
            apiUrlRepoData[API_URL_USER_QUALIFIER] = login;
            this.apiUrlRepoOptions = getApiUrlOptions(apiUrlRepoData);
        }
        else {
            this.currentDataPage++;
            this.apiUrlRepoOptions = this.apiUrlRepoOptions.replace(API_URL_PAGE_REGEXP, (...match) => {
                return match[1] + this.currentDataPage;  // *
            });
        }
        // get api query string from serialization object
        const apiUrlRepo = API_URL + '/' + API_URL_SEARCH + '/' + API_URL_REPO + '?q=' + this.apiUrlRepoOptions;
        console.log(apiUrlRepo);
        const data = await getDataApi.getData(apiUrlRepo);
        data instanceof Error ? Err.render(data, repo) : this.renderRepo(data);
    }
    renderRepo(data) {
        // console.log(data);
        // ${reposHtml}
        // <button class="classes.repo__download-more-btn">Show More</button> 
        // console.log(document.querySelector(`.${classes.repo__list}`));
        if(!document.querySelector(`.${classes.repo__list}`)) {
            repo.innerHTML = `
            <h2 class="${classes.repo__title}">User repository</h2>
            <div class="${classes.repo__list}">
            </div>
            <button class="${classes['repo__download-more-btn']}">Download Repo More</button>
            `; 
            // console.log(document.querySelector(`.${classes.repo__list}`));
            this.init();
        }
        // console.log(data.items.length);
        // data.items.
        if(data.items.length) {
            // increase counter loaded repositories
            this.totalLoadedRepo += data.items.length;
            if(data.total_count === this.totalLoadedRepo){
                this.toggleStateLoadRepoMoreBtn(false);
                this.totalLoadedRepo = 0
            }
            // if(data.total_count !== this.totalLoadedUsers) {
            //     this.toggleStateLoadMoreButton(data.total_count !== this.totalLoadedUsers); // *
            // }
            // else {
            //     this.toggleStateLoadMoreButton(data.total_count !== this.totalLoadedUsers);
            //     this.totalLoadedUsers = 0; //reset counter loaded users
            // } 
            let fieldHtml = '', reposHtml = '';
            const buttonsHtml = `<button class="show__more ${classes['repo__show-more']}">Show more</button>
                                    <button class="show__less ${classes['repo__show-less']}">Show less</button>`;
    
            const topKeys = ['name', 'full_name', 'html_url', 'clone_url', 'git_url', 'stargazers_count',
                            'language', 'id', 'description', 'created_at', 'updated_at', 'pushed_at'];
            const notEnteredKey = [];
            const keysName = {};
            data.items.forEach(repo => {
                // get html to render with sorted, desired keys and display order
                const dataCorrected = dataWorker.correctData(repo);
                
                dataWorker.sortKey(dataCorrected, topKeys, notEnteredKey).forEach(key => {
                    fieldHtml += dataWorker.renderFields(dataCorrected, key, keysName, classes.repo__field,
                                 classes.repo__key, classes.repo__value);
                });
                reposHtml += `<ul class="${classes.repo__fields}">${fieldHtml + buttonsHtml}</ul>`;
                fieldHtml = '';
            });
            this.repoList.insertAdjacentHTML('beforeend', reposHtml);
            this.showMore();
            this.showLess();
        } else {
            //hide loadMoreRepoBtn
            // this.toggleStateLoadRepoMoreBtn(data.items.length);
            this.toggleStateLoadRepoMoreBtn(false);
            this.totalLoadedRepo = 0        
        } 

    }
    init() {
        this.downloadRepoMoreBtn = document.querySelector(`.${classes['repo__download-more-btn']}`);
        // console.log('this.downloadRepoMoreBtn ', this.downloadRepoMoreBtn, classes['repo__download-more-btn']);
        this.repoList = document.querySelector(`.${classes.repo__list}`);
        this.eventListenerLoadMoreBtn();
    }
    // show/hide load more button
    toggleStateLoadRepoMoreBtn(state) {
        this.downloadRepoMoreBtn.style.display = state ? 'block' : 'none';
    }
    eventListenerLoadMoreBtn() {
        this.downloadRepoMoreBtn.addEventListener('click', () => {
            console.log('click');
            this.render();
        });
    }   
    showMore() {
        document.querySelector(`.${classes.repo__info}`).addEventListener('click', (e) => {
            if(!e.target.classList.contains(`${classes['repo__show-more']}`)) return;
            const parent = e.target.parentNode;
            const fields = parent.querySelectorAll('li');
            const buttonMore = parent.querySelector(`.${classes['repo__show-more']}`); // * double declare
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
            const buttonMore = parent.querySelector(`.${classes['repo__show-more']}`); // * double declare
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