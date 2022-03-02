// import 'tuicss';
// import styles from '../Spinner.css';
import {spinnerUserHtml} from './spinnerUserHtml';
import {spinnerUsersHtml, spinnerUsersLoadMoreHtml} from './spinnerUsersHtml';
import {spinnerRepoHtml, spinnerRepoLoadMoreHtml} from './spinnerRepoHtml';

import {USER_COMPONENT_ID, USERS_COMPONENT_ID, 
        USERS_COMPONENT_LOAD_MORE_ID,
        REPO_COMPONENT_ID,
        REPO_COMPONENT_LOAD_MORE_ID,} 
        from '../../../constants/root';

const spinnerHtml = {
    [USER_COMPONENT_ID]: spinnerUserHtml,
    [USERS_COMPONENT_ID]: spinnerUsersHtml,
    [USERS_COMPONENT_LOAD_MORE_ID]: spinnerUsersLoadMoreHtml,
    [REPO_COMPONENT_ID]: spinnerRepoHtml,
    [REPO_COMPONENT_LOAD_MORE_ID]: spinnerRepoLoadMoreHtml,
    // [USER_ERROR_MESSAGE_ID]: 
}

export {spinnerHtml as default};