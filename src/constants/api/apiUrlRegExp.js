import * as apiUrlQualifierIdentifier from './apiUrlIdentifier';
export const API_URL_SINGLE_QUALIFIER_REGEXP = new RegExp(`${apiUrlQualifierIdentifier.API_URL_SINGLE_QUALIFIER_IDENTIFIER}`, 'g');
export const API_URL_DOUBLE_QUALIFIER_REGEXP = new RegExp(`${apiUrlQualifierIdentifier.API_URL_DOUBLE_QUALIFIER_IDENTIFIER}`, 'g'); 
// export const API_URL_BOOLEAN_OPERATOR_REGEXP = new RegExp(`${apiUrlQualifierIdentifier.API_URL_BOOLEAN_OPERATOR_IDENTIFIER}`, 'g');
// /\b(location:)(\w+)\b/g;