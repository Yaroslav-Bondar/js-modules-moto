import {ROOT_INDEX} from '../../constants/root';
import Users from '../Users';
import Spinner from '../Spinner';
import * as apiUrlQualifier from '../../constants/api/apiUrlQualifier';
import * as apiUrlValue from '../../constants/api/apiUrlValue';
import * as apiUrlElementName from '../../constants/api/apiUrlElementName';
import * as apiUrlIdentifier from '../../constants/api/apiUrlIdentifier';
import * as apiUrlOperator from '../../constants/api/apiUrlOperator';
import * as apiUrlParameter from '../../constants/api/apiUrlParameter';

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
                    <input value='gesha' type="text" id="user" name="user${apiUrlIdentifier.API_URL_VALUE_IDENTIFIER}" placeholder="Search user by login..."
                    aria-label="Search user by name">

                    <select id="user-search-type" name="user-search-type${apiUrlIdentifier.API_URL_KEY_IDENTIFIER}">
                        <option value="${apiUrlQualifier.API_URL_INNAME_QUALIFIER}" selected>INNAME</option>
                        <option value="${apiUrlQualifier.API_URL_FULLNAME_QUALIFIER}">FULLNAME</option>
                        <option value="${apiUrlQualifier.API_URL_INLOGIN_QUALIFIER}">INLOGIN</option>
                        <option value="${apiUrlQualifier.API_URL_USER_QUALIFIER}">NAME</option>
                        <option value="${apiUrlQualifier.API_URL_INEMAIL_QUALIFIER}">INEMAIL</option>
                    </select>
                        
                </fieldset>
                <fieldset name="ddf${apiUrlIdentifier.API_URL_SIMPLE_GROUP_IDENTIFIER}">
                    <label for="location">From this location</label>
                    <input value="kyiv" type="text" id="location" name="xcx${apiUrlQualifier.API_URL_LOCATION_QUALIFIER}" 
                    placeholder="Ukraine Kyiv Odessa"
                    aria-label="Search user by location">

                    <label for="language">Language : </label>
                    <select id="language" name="${apiUrlQualifier.API_URL_LANGUAGE_QUALIFIER}">
                        <option value="">none</option>
                        <option value="javascript" selected>Java Script</option>
                        <option value="C">c</option>
                        <option value="ruby">Ruby</option>
                        <option value="kotlin">kotlin</option>
                    </select>
                    <label for="sort">Sort by</label>
                    <select id="sort" name="sort${apiUrlParameter.API_URL_SORT_PARAMETER}">
                        <option value="repositories">repositories</option>
                        <option value="followers" selected>followers</option>
                        <option value="stars">stars</option>
                        <option value="ruby">Ruby</option>
                        <option value="kotlin">kotlin</option>
                    </select>
                    <button value="submit">submit</button>
                </fieldset>    
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
                    if(Array.isArray(formData[this.#formUsers.elements[i].name])) {
                        formData[this.#formUsers.elements[i].name].push([this.#formUsers.elements[i].elements[j].name, 
                            this.#formUsers.elements[i].elements[j].value])
                        }
                    else {
                        formData[this.#formUsers.elements[i].name] = [[this.#formUsers.elements[i].elements[j].name, 
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
                        value = this.#formUsers.elements[i].elements[j].value
                        console.log(value);
                    }
                    else 
                    if(this.#formUsers.elements[i].elements[j].name.includes(`${apiUrlIdentifier.API_URL_KEY_IDENTIFIER}`)
                    && this.#formUsers.elements[i].elements[j].value) {
                        key = this.#formUsers.elements[i].elements[j].value
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

