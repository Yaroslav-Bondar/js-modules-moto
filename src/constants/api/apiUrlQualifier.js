// export const API_URL_LANGUAGE_QUALIFIER = 'language';
// export const API_URL_USER_QUALIFIER = 'user';
// export const API_URL_STARS_QUALIFIER = 'stars';
// export const API_URL_FOLLOWERS_QUALIFIER = 'followers';
// export const API_URL_DESC_QUALIFIER = 'desc';
// export const API_URL_ASC_QUALIFIER = 'asc';
// export const API_URL_Q_QUALIFIER = 'q';
import * as apiUrlQualifierIdentifier from './apiUrlIdentifier';  // * 

export const API_URL_LANGUAGE_QUALIFIER = 'language:' + `${apiUrlQualifierIdentifier.API_URL_SINGLE_QUALIFIER_IDENTIFIER}`;

export const API_URL_INEMAIL_QUALIFIER = 'in:email' + `${apiUrlQualifierIdentifier.API_URL_DOUBLE_QUALIFIER_IDENTIFIER}`;
export const API_URL_USER_QUALIFIER = 'user:' + `${apiUrlQualifierIdentifier.API_URL_SINGLE_QUALIFIER_IDENTIFIER}`;
export const API_URL_STARS_QUALIFIER = 'stars:' + `${apiUrlQualifierIdentifier.API_URL_SINGLE_QUALIFIER_IDENTIFIER}`;
export const API_URL_FOLLOWERS_QUALIFIER = 'followers:' + `${apiUrlQualifierIdentifier.API_URL_SINGLE_QUALIFIER_IDENTIFIER}`;
export const API_URL_LOCATION_QUALIFIER = 'location:' + `${apiUrlQualifierIdentifier.API_URL_SINGLE_QUALIFIER_IDENTIFIER}`;
export const API_URL_INLOGIN_QUALIFIER = 'in:login' + `${apiUrlQualifierIdentifier.API_URL_DOUBLE_QUALIFIER_IDENTIFIER}`;
export const API_URL_INNAME_QUALIFIER = 'in:name' + `${apiUrlQualifierIdentifier.API_URL_DOUBLE_QUALIFIER_IDENTIFIER}`;
export const API_URL_FULLNAME_QUALIFIER = 'fullname:' + `${apiUrlQualifierIdentifier.API_URL_SINGLE_QUALIFIER_IDENTIFIER}`;
export const API_URL_TYPEUSER_QUALIFIER = 'type:user' + `${apiUrlQualifierIdentifier.API_URL_SINGLE_QUALIFIER_IDENTIFIER}`;





