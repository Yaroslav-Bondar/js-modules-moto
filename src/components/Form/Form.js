import {ROOT_INDEX} from '../../constants/root';
import Users from '../Users';
import Spinner from '../Spinner';
import * as API_URL_QUALIFIER from '../../constants/api/apiUrlQualifier';
// import * as apiUrlValue from '../../constants/api/apiUrlValue';
import * as apiUrlElementName from '../../constants/api/apiUrlElementName';
import * as apiUrlIdentifier from '../../constants/api/apiUrlIdentifier';
import * as apiUrlOperator from '../../constants/api/apiUrlOperator';
import * as apiUrlParameter from '../../constants/api/apiUrlParameter';
import * as apiUrlValue from '../../constants/api/apiUrlValue';

// console.log(apiUrlQualifier);
class Form {
    #formUsers;
    // #apiUrlQualifierValues = Object.values(apiUrlQualifier); // * possible without converting to array
    render() {
        // <div class="container__root tui-bg-blue-black tui-border-double tui-fieldset orange-168"></div>
        let htmlContent = `
            <form name="users" role="search">
                <fieldset name="user_search${apiUrlIdentifier.API_URL_DOUBLE_GROUP_IDENTIFIER}">
                    <legend>required user data</legend>

                    <label for="form__user">user</label>
                    <input value='marina' type="text" id="form__user" name="user" data-identifier=${apiUrlIdentifier.API_URL_VALUE_IDENTIFIER} placeholder="Search user by login..."
                    aria-label="Search user by name">

                    <select id="user-search-type" name="user-search-type" data-identifier=${apiUrlIdentifier.API_URL_KEY_IDENTIFIER}>
                        <option value="${API_URL_QUALIFIER.API_URL_INNAME_QUALIFIER}" selected>INNAME</option>
                        <option value="${API_URL_QUALIFIER.API_URL_FULLNAME_QUALIFIER}">FULLNAME</option>
                        <option value="${API_URL_QUALIFIER.API_URL_INLOGIN_QUALIFIER}">INLOGIN</option>
                        <option value="${API_URL_QUALIFIER.API_URL_USER_QUALIFIER}">NAME</option>
                        <option value="${API_URL_QUALIFIER.API_URL_INEMAIL_QUALIFIER}">INEMAIL</option>
                    </select>
                        
                </fieldset>
                <fieldset name="ddf${apiUrlIdentifier.API_URL_SIMPLE_GROUP_IDENTIFIER}">
                    <label for="location">From this location</label>
                    <input value="ukraine" type="text" id="location" data-identifier=${API_URL_QUALIFIER.API_URL_LOCATION_QUALIFIER} name="location"
                    placeholder="Ukraine Kyiv Odessa"
                    aria-label="Search user by location">

                    <label for="language">Language : </label>
                    <select id="language" name="language" data-identifier=${API_URL_QUALIFIER.API_URL_LANGUAGE_QUALIFIER}>
                        <option value="">none</option>
                        <option value="javascript" selected>Java Script</option>
                        <option value="C">c</option>
                        <option value="ruby">Ruby</option>
                        <option value="kotlin">kotlin</option>
                    </select>
                    <label for="followers">With this many followers</label>
                    <input value="" type="text" id="followers" data-identifier=${API_URL_QUALIFIER.API_URL_FOLLOWERS_QUALIFIER} name="followers"
                    placeholder="20..50, >200, <2"
                    aria-label="With this many followers">

                    <label for="repositories">With this many public repositories</label>
                    <input value="" type="text" id="repositories" data-identifier=${API_URL_QUALIFIER.API_URL_REPOS_QUALIFIER} name="repositories"
                    placeholder="0, <42, >5"
                    aria-label="With this many repositories">

                    <label for="sort-by">Sort-by</label>
                    <select id="sort-by" name="sort-by" data-identifier=${apiUrlParameter.API_URL_SORT_PARAMETER}>
                        <option value="${apiUrlValue.API_URL_REPOSITORIES_VALUE}">repositories</option>
                        <option value="${apiUrlValue.API_URL_FOLLOWERS_VALUE}" selected>followers</option>
                    </select>
                    <label for="order">order</label>
                    <select id="order" name="order" data-identifier=${apiUrlParameter.API_URL_ORDER_PARAMETER}>
                        <option value="${apiUrlValue.API_URL_DESC_VALUE}" selected>descending</option>
                        <option value="${apiUrlValue.API_URL_ASC_VALUE}">ascending</option>
                    </select>
                </fieldset>    
                <button value="submit">submit</button>
            </form>`;
        ROOT_INDEX.insertAdjacentHTML('afterbegin', htmlContent);
    }
    init() {
        this.#formUsers = document.forms.users;
        this.#eventListener();
    }
    #eventListener() {
        this.#formUsers.addEventListener('submit', async (e) => {
            e.preventDefault();
            Spinner.render(ROOT_INDEX, 'spinner__users');
            await Users.render(this.getDataForm());
            Spinner.handleClear();
        });
    }
    getDataForm() {
        // let formData = {};
        let formData = {};
        // serialization of form data 
        const formElements = this.#formUsers.elements; 
        for(let i = 0; i < formElements.length; i++) { // * check for epmty field
            // rules for groups
            // rule for API_URL_SIMPLE_GROUP_IDENTIFIER API_URL_GROUP_IDENTIFIER
            if(formElements[i].name.includes(apiUrlIdentifier.API_URL_SIMPLE_GROUP_IDENTIFIER)) {
                for(let j = 0; j < formElements[i].elements.length; j++) {
                    // check value field for empty
                    if(!formElements[i].elements[j].value) continue;
                        formData[formElements[i].elements[j].dataset.identifier] = formElements[i].elements[j].value;
                    // if(!formData[formElements[i].name]) {
                        // formData[formElements[i].name] = {[formElements[i].elements[j].dataset.identifier]: formElements[i].elements[j].value}
                    // }
                    // else {
                        // formData[formElements[i].name][formElements[i].elements[j].dataset.identifier] = formElements[i].elements[j].value
                    // }
                }
            }
            // serialization rule for double group
            if(formElements[i].name.includes(apiUrlIdentifier.API_URL_DOUBLE_GROUP_IDENTIFIER)) {
                let key, value;
                for(let j = 0; j < formElements[i].elements.length; j++) {
                    // if at least one value is empty exit the loop
                    if(!formElements[i].elements[j].value) break;
                    if(formElements[i].elements[j].dataset.identifier.includes(apiUrlIdentifier.API_URL_KEY_IDENTIFIER))
                        key = formElements[i].elements[j].value;
                    if(formElements[i].elements[j].dataset.identifier.includes(apiUrlIdentifier.API_URL_VALUE_IDENTIFIER))
                        value = formElements[i].elements[j].value;    
                }
                // if both items are not empty includes them in the result object
                if(key && value) formData[key] = value;
            }
            //array
            // if(formElements[i].name.includes(apiUrlIdentifier.API_URL_SIMPLE_GROUP_IDENTIFIER)) {
            //     for(let j = 0; j < formElements[i].elements.length; j++) {
            //         // check value field for empty
            //         if(!formElements[i].elements[j].value) continue;
            //         if(Array.isArray(formData[formElements[i].name])) {
            //             formData[formElements[i].name].push([formElements[i].elements[j].dataset.identifier, 
            //                 formElements[i].elements[j].value])
            //             }
            //         else {
            //             formData[formElements[i].name] = [[formElements[i].elements[j].dataset.identifier, 
            //                 formElements[i].elements[j].value]];
            //         }
            //     }
            // }
            // // rule for API_URL_DOUBLE_GROUP_IDENTIFIER
            // if(formElements[i].name.includes(apiUrlIdentifier.API_URL_DOUBLE_GROUP_IDENTIFIER)) {
            //     let key, value;
            //     for(let j = 0; j < formElements[i].elements.length; j++) {
            //         if(formElements[i].elements[j].name.includes(`${apiUrlIdentifier.API_URL_VALUE_IDENTIFIER}`)
            //         && formElements[i].elements[j].value) {
            //             value = formElements[i].elements[j].value;
            //         }
            //         else 
            //         if(formElements[i].elements[j].name.includes(`${apiUrlIdentifier.API_URL_KEY_IDENTIFIER}`)
            //         && formElements[i].elements[j].value) {
            //             key = formElements[i].elements[j].value;
            //         }
            //         else {
            //             break;
            //         }
            //     }
            //     if(key && value) {
            //         formData[formElements[i].name] = [[key, value]];
            //     }
            // }
        }
        console.log(formData);
        console.log('formData', formData);
        return formData;
    }
}
export default new Form(); 

