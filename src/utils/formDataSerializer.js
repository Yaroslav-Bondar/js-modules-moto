import * as apiUrlIdentifier from '../constants/api/apiUrlIdentifier';

export function formDataSerializer(form) {
    let formData = {};
    for(let i = 0; i < form.elements.length; i++) { // * check for epmty field
        // rules for groups
        // rule for API_URL_SIMPLE_GROUP_IDENTIFIER API_URL_GROUP_IDENTIFIER
        if(form.elements[i].name.includes(apiUrlIdentifier.API_URL_SIMPLE_GROUP_IDENTIFIER)) {
            for(let j = 0; j < form.elements[i].elements.length; j++) {
                // check value field for empty
                if(!form.elements[i].elements[j].value) continue;
                    formData[form.elements[i].elements[j].dataset.identifier] = form.elements[i].elements[j].value;
            }
        }
        // serialization rule for double group
        if(form.elements[i].name.includes(apiUrlIdentifier.API_URL_DOUBLE_GROUP_IDENTIFIER)) {
            let key, value;
            for(let j = 0; j < form.elements[i].elements.length; j++) {
                // if at least one value is empty exit the loop
                if(!form.elements[i].elements[j].value) break;
                if(form.elements[i].elements[j].dataset.identifier.includes(apiUrlIdentifier.API_URL_KEY_IDENTIFIER))
                    key = form.elements[i].elements[j].value;
                if(form.elements[i].elements[j].dataset.identifier.includes(apiUrlIdentifier.API_URL_VALUE_IDENTIFIER))
                    value = form.elements[i].elements[j].value;    
            }
            // if both items are not empty includes them in the result object
            if(key && value) formData[key] = value;
        }
    }
    return formData;
}