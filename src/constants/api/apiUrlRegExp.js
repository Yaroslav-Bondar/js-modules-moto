import * as apiUrlIdentifier from './apiUrlIdentifier';
export const API_URL_SINGLE_QUALIFIER_REGEXP = new RegExp(`${apiUrlIdentifier.API_URL_SINGLE_QUALIFIER_IDENTIFIER}`, 'g');
export const API_URL_DOUBLE_QUALIFIER_REGEXP = new RegExp(`${apiUrlIdentifier.API_URL_DOUBLE_QUALIFIER_IDENTIFIER}`, 'g'); 
export const API_URL_SORT_PARAMETER_REGEXP = new RegExp(`${apiUrlIdentifier.API_URL_SORT_PARAMETER}`, 'g');
export const API_URL_PARAMETER_REGEXP = new RegExp(`${apiUrlIdentifier.API_URL_PARAMETER_IDENTIFIER}`, 'g');
export const API_URL_PAGE_REGEXP = /\b(page=)(\d+)\b/g;

// export const A

// export const API_URL_BOOLEAN_OPERATOR_REGEXP = new RegExp(`${apiUrlIdentifier.API_URL_BOOLEAN_OPERATOR_IDENTIFIER}`, 'g');
// /\b(location:)(\w+)\b/g;