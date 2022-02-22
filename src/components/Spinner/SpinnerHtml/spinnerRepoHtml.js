import styles from '../Spinner.css';
import {REPO_COMPONENT_ID, REPO_COMPONENT_LOAD_MORE_ID} from '../../../constants/root';

export const spinnerRepoHtml = `
    <div id=${REPO_COMPONENT_ID} class="${styles['spinner__repo-container']}">
        <div class="${styles['spinner__repo-text']}">repo loading... :</div>                
        <div class="tui-progress-bar">
            <span class="tui-indeterminate"></span>
        </div>
    </div>`;

export const spinnerRepoLoadMoreHtml = `
    <div id=${REPO_COMPONENT_LOAD_MORE_ID} class="tui-progress-bar ${styles['spinner__repo-load-more']}">
        <span class="tui-indeterminate"></span>
    </div>`;     