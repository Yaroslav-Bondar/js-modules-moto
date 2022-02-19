import {API_URL_SINGLE_QUALIFIER_IDENTIFIER, API_URL_DOUBLE_QUALIFIER_IDENTIFIER,
        API_URL_PARAMETER_IDENTIFIER} from '../../constants/api/apiUrlIdentifier';
import {API_URL_PAGES_PARAMETERS} from '../../constants/api/apiUrlValue';
import {API_URL_CLEAN_VALUE_REGEXP} from '../../constants/api/apiUrlRegExp';

// get request part of url from serialized object
function getApiUrlOptions(formData) {
    let qualifiers = '', parameters = '';
    console.log(formData);
    for (const key in formData) {
        // rule for SINGLE QUALIFIER IDENTIFIER
        if(key.includes(API_URL_SINGLE_QUALIFIER_IDENTIFIER)) 
            qualifiers += key.match(API_URL_CLEAN_VALUE_REGEXP)[0] + formData[key] + '+';
        // rule for DOUBLE QUALIFIER IDENTIFIER
        if(key.includes(API_URL_DOUBLE_QUALIFIER_IDENTIFIER)) 
            qualifiers += formData[key] + ' ' + key.match(API_URL_CLEAN_VALUE_REGEXP)[0] + '+';
        // rule for parameters
        if(key.includes(API_URL_PARAMETER_IDENTIFIER)) 
            parameters += key.match(API_URL_CLEAN_VALUE_REGEXP)[0] + formData[key]; // regExp in constant
    }
    qualifiers = qualifiers.slice(0, qualifiers.length - 1);
    console.log(API_URL_PAGES_PARAMETERS)
    return qualifiers + parameters + API_URL_PAGES_PARAMETERS;

}
export {getApiUrlOptions as default};
