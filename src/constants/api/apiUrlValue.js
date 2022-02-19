import {API_URL_USER_QUALIFIER} from './apiUrlQualifier';
import {API_URL_SORT_PARAMETER, API_URL_ORDER_PARAMETER, 
        API_URL_PAGE_PARAMETER, API_URL_PER_PAGE_PARAMETER} from './apiUrlParameter';

export const API_URL_REPOSITORIES_VALUE = 'repositories';
export const API_URL_FOLLOWERS_VALUE = 'followers';
export const API_URL_DESC_VALUE = 'desc';
export const API_URL_ASC_VALUE = 'asc';
export const API_URL_PER_PAGE_VALUE = 10;
export const API_URL_START_PAGE_VALUE = 1;
export const API_URL_STARS_VALUE = 'stars';

export const API_URL_PAGES_PARAMETERS =  API_URL_PAGE_PARAMETER + `${API_URL_START_PAGE_VALUE}` +
                                         API_URL_PER_PAGE_PARAMETER + `${API_URL_PER_PAGE_VALUE}`;
// data template for REPO component
export const API_URL_REPO_DATA = {
    [API_URL_USER_QUALIFIER]: '',
    [API_URL_SORT_PARAMETER]: `${API_URL_STARS_VALUE}`,
    [API_URL_ORDER_PARAMETER]: `${API_URL_DESC_VALUE}`,
    // [API_URL_PAGE_PARAMETER]: `${API_URL_START_PAGE_VALUE}`,
    // [API_URL_PER_PAGE_PARAMETER]: `${API_URL_PER_PAGE_VALUE}`,
}
