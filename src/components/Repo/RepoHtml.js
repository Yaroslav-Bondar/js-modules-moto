import styles from './Repo.css'
const repoHtmlSkeleton = `
    <h2 class="${styles.repo__title}">User repository</h2>
    <div class="${styles['repo__total-count']}">total_count: 
        <span class="${styles['repo__total-count-item']}"></span>
    </div>
    <div class="${styles.repo__list}">
    </div>
    <button class="${styles['repo__download-more-btn']}">Download Repo More</button>`;

const repoHtmlInfoBtns = `<button class="show__more ${styles['repo__show-more']}">Show more</button>
                        <button class="show__less ${styles['repo__show-less']}">Show less</button>`;

export {repoHtmlSkeleton, repoHtmlInfoBtns};
