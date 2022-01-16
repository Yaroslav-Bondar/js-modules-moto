export const API_URL = 'https://api.github.com';
export const API_URL_SEARCH = 'search';
export const API_URL_USERS = 'users';
export const API_URL_USERS_OPTIONS = '?q=location:ukraine+language:javascript+type:user&sort=followers&order=desc&page=1&per_page=10';

export const API_URL_REPO = 'repositories';
export const API_URL_LANGUAGE_QUALIFIER = 'language';
export const API_URL_USER_QUALIFIER = 'user';
export const API_URL_COLON_SEPARATOR = ':';
export const API_URL_PLUS_SEPARATOR = '+';

export const API_URL_REPO_OPTIONS = '?q=user:user_name+language:javascript&stars:>=1&sort=stars&order=desc&page=1&per_page=10';

export const API_URL_LANGUAGE_REGEXP = /\b(language:)(\w+)\b/g;
export const API_URL_LOCATION_REGEXP = /\b(location:)(\w+)\b/g; // * name
export const API_URL_PAGE_REGEXP = /\b(page=)(\d+)\b/g;
// https://api.github.com/search/repositories?q=user:gitlabhq&stars:>=1&sort=stars&order=desc


// export const URL_CHARACTERS = 'characters'

// export const API_KEY = 'a5837db97d72016c81a7a776f4240db9'

// export const IMG_STANDART_XLARGE = 'standard_xlarge'
// export const IMG_NOT_AVAILABLE = 'image_not_available'