export const API_URL = 'https://api.github.com';
export const API_URL_REPO = 'repositories';
export const API_URL_SEARCH = 'search';
export const API_URL_USERS = 'users';
export const API_URL_START_REQUEST = '?q=';
export const API_URL_USERS_BASE = API_URL + '/' + API_URL_SEARCH + '/' + API_URL_USERS + API_URL_START_REQUEST; // * ? one variable
export const API_URL_REPO_BASE = API_URL + '/' + API_URL_SEARCH + '/' + API_URL_REPO + API_URL_START_REQUEST;
export const API_URL_USER_BASE = API_URL + '/' + API_URL_USERS + '/';

// export const API_URL_LANGUAGE_REGEXP = /\b(language:)(\w+)\b/g;
// export const API_URL_LOCATION_REGEXP = /\b(location:)(\w+)\b/g; // * name

// https://api.github.com/search/repositories?q=user:gitlabhq&stars:>=1&sort=stars&order=desc
// https://api.github.com/search/repositories?q=user:gitlabhq+language:ruby&sort=stars&order=desc&page=1&per_page=10
// export const API_URL_REPO_OPTIONS = '?q=user:user_name+language:javascript&stars:>=1&sort=stars&order=desc&page=1&per_page=10';
// &stars:>=1
// export const API_URL_USERS_OPTIONS = '?q=location:ukraine+language:javascript+type:user&sort=followers&order=desc&page=1&per_page=10';


