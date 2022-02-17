// export const API_URL_VALUE_LOGIN = 'login';
// export const API_URL_VALUE_NAME = 'name';
import {API_URL_SIMPLE_GROUP_IDENTIFIER} from './apiUrlIdentifier';
import {API_URL_USER_QUALIFIER, API_URL_LANGUAGE_QUALIFIER} from './apiUrlQualifier';
import {API_URL_SORT_PARAMETER, API_URL_ORDER_PARAMETER, API_URL_PAGE_PARAMETER, API_URL_PER_PAGE_PARAMETER} from './apiUrlParameter';

export const API_URL_REPOSITORIES_VALUE = 'repositories';
export const API_URL_FOLLOWERS_VALUE = 'followers';
export const API_URL_DESC_VALUE = 'desc';
export const API_URL_ASC_VALUE = 'asc';
export const API_URL_PER_PAGE_VALUE = 10;
export const API_URL_START_PAGE_VALUE = 1;
export const API_URL_STARS_VALUE = 'stars';

// data template for REPO component
// [API_URL_LANGUAGE_QUALIFIER]: '',
export const API_URL_REPO_DATA = {
    [API_URL_USER_QUALIFIER]: '',
    [API_URL_SORT_PARAMETER]: `${API_URL_STARS_VALUE}`,
    [API_URL_ORDER_PARAMETER]: `${API_URL_DESC_VALUE}`,
    // [API_URL_PAGE_PARAMETER]: `${API_URL_START_PAGE_VALUE}`,
    // [API_URL_PER_PAGE_PARAMETER]: `${API_URL_PER_PAGE_VALUE}`,
}
// console.log(API_URL_REPO_DATA);
