// export default function .match(/.+?(?=_)/)[0]property) {
//     return property.match(/.+?(?=_)/)[0];
//     // return string.replace(/.+/, (...items) => {
//     //     return items[2].match(new RegExp(`${desired}`))[0].match(new RegExp(`.+(?=${excluded})`));
//     // });
// }
import * as apiUrlIdentifier from '../../constants/api/apiUrlIdentifier';
// get request part of url
function getApiUrlOptions(formData) {
    let qualifiers = '', parameters = '';
    for (const key in formData) {
        // get data from group (fieldset html tag)
        if(key.includes(apiUrlIdentifier.API_URL_GROUP_IDENTIFIER)) {
            formData[key].forEach(item => {
                if(item[0].includes(apiUrlIdentifier.API_URL_SINGLE_QUALIFIER_IDENTIFIER) && item[1]) {
                    qualifiers += item[0].match(/.+?(?=_)/)[0] + item[1] + '+';
                }
                // rule for double qualifiers
                if(item[0].includes(apiUrlIdentifier.API_URL_DOUBLE_QUALIFIER_IDENTIFIER) && item[1]) {
                    qualifiers += item[1] + ' ' + item[0].match(/.+?(?=_)/)[0] + '+'; 
                }
                // rule for parameters
                if(item[0].includes(apiUrlIdentifier.API_URL_PARAMETER_IDENTIFIER) && item[1]) {
                    parameters += '&' + item[0].match(/.+?(?=_)/)[0] + item[1];
                }
            });
        }
    }
    return qualifiers.slice(0, qualifiers.length - 1) + parameters + '&page=1&per_page=10'; //* add parameters constants 
}
export {getApiUrlOptions as default};
