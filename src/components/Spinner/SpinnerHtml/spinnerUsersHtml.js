import styles from '../Spinner.css';
import {USERS_COMPONENT_ID, USERS_COMPONENT_LOAD_MORE_ID} from '../../../constants/root';

export const spinnerUsersHtml = `
    <div id=${USERS_COMPONENT_ID} class="${styles['spinner__users-container']}">
        <div class="${styles['spinner__users-text']}">users loading... :</div>                
        <div class="tui-progress-bar">
            <span class="tui-indeterminate"></span>
        </div>
    </div>`;

export const spinnerUsersLoadMoreHtml = `
    <div id=${USERS_COMPONENT_LOAD_MORE_ID} class="tui-progress-bar ${styles['spinner__users-load-more']}">
        <span class="tui-indeterminate"></span>
    </div>`;    