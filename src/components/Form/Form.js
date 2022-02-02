import {ROOT_INDEX} from '../../constants/root';
import Users from '../Users';
import Spinner from '../Spinner';
import API_URL_QUALIFIER from '../../constants/api/apiUrlQualifier';
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

                    <label for="user">user</label>
                    <input value='alena' type="text" id="user" name="user${apiUrlIdentifier.API_URL_VALUE_IDENTIFIER}" placeholder="Search user by login..."
                    aria-label="Search user by name">

                    <select id="user-search-type" name="user-search-type${apiUrlIdentifier.API_URL_KEY_IDENTIFIER}">
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
        let formData = {};
        for(let i = 0; i < this.#formUsers.elements.length; i++) { // * check for epmty field
            // rules for groups
            // rule for API_URL_SIMPLE_GROUP_IDENTIFIER
            if(this.#formUsers.elements[i].name.includes(apiUrlIdentifier.API_URL_SIMPLE_GROUP_IDENTIFIER)) {
                for(let j = 0; j < this.#formUsers.elements[i].elements.length; j++) {
                    // check value field for empty
                    if(!this.#formUsers.elements[i].elements[j].value) continue;
                    if(Array.isArray(formData[this.#formUsers.elements[i].name])) {
                        formData[this.#formUsers.elements[i].name].push([this.#formUsers.elements[i].elements[j].dataset.identifier, 
                            this.#formUsers.elements[i].elements[j].value])
                        }
                    else {
                        formData[this.#formUsers.elements[i].name] = [[this.#formUsers.elements[i].elements[j].dataset.identifier, 
                            this.#formUsers.elements[i].elements[j].value]];
                    }
                }
            }
            // rule for API_URL_DOUBLE_GROUP_IDENTIFIER
            if(this.#formUsers.elements[i].name.includes(apiUrlIdentifier.API_URL_DOUBLE_GROUP_IDENTIFIER)) {
                let key, value;
                for(let j = 0; j < this.#formUsers.elements[i].elements.length; j++) {
                    if(this.#formUsers.elements[i].elements[j].name.includes(`${apiUrlIdentifier.API_URL_VALUE_IDENTIFIER}`)
                    && this.#formUsers.elements[i].elements[j].value) {
                        value = this.#formUsers.elements[i].elements[j].value;
                    }
                    else 
                    if(this.#formUsers.elements[i].elements[j].name.includes(`${apiUrlIdentifier.API_URL_KEY_IDENTIFIER}`)
                    && this.#formUsers.elements[i].elements[j].value) {
                        key = this.#formUsers.elements[i].elements[j].value;
                    }
                    else {
                        break;
                    }
                }
                if(key && value) {
                    formData[this.#formUsers.elements[i].name] = [[key, value]];
                }
            }
        }
        console.log(formData);
        return formData;
    }
}
export default new Form(); 

