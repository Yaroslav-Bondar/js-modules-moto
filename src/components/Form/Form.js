import {ROOT_INDEX} from '../../constants/root';
import Users from '../Users';
import Spinner from '../Spinner';
import * as apiUrlQualifier from '../../constants/api/apiUrlQualifier';
import * as apiUrlValue from '../../constants/api/apiUrlValue';
import * as apiUrlElementName from '../../constants/api/apiUrlElementName';
import * as apiUrlIdentifier from '../../constants/api/apiUrlIdentifier';
import * as apiUrlOperator from '../../constants/api/apiUrlOperator';

// console.log(apiUrlQualifier);
class Form {
    #formUsers;
    #apiUrlQualifierValues = Object.values(apiUrlQualifier); // * possible without converting to array
    render() {
        // <div class="container__root tui-bg-blue-black tui-border-double tui-fieldset orange-168"></div>
        let htmlContent = `
        <form name="users" role="search">
                <fieldset name="user_search${apiUrlIdentifier.API_URL_GROUP_IDENTIFIER}">
                    <legend>required user data</legend>

                    <label for="name">name</label>
                    <input value='gesha' type="text" id="name" name="${apiUrlQualifier.API_URL_USER_QUALIFIER}" placeholder="Search user by login..."
                    aria-label="Search user by name">

                    <select id="language" name="${apiUrlIdentifier.API_URL_BOOLEAN_OPERATOR_IDENTIFIER}">
                        <option value="${apiUrlOperator.API_URL_AND_OPERATOR}" selected>AND</option>
                        <option value="${apiUrlOperator.API_URL_OR_OPERATOR}">OR</option>
                        <option value="${apiUrlOperator.API_URL_NOT_OPERATOR}">NOT</option>
                    </select>

                    <label for="name">in-login</label>
                    <input value='gesha' type="text" id="in-login" name="${apiUrlQualifier.API_URL_INLOGIN_QUALIFIER}" placeholder="Search user by login..."
                    aria-label="Search user by in-login">

                    <label for="in-name">in-name</label>
                    <input type="text" id="in-name" name="${apiUrlQualifier.API_URL_INNAME_QUALIFIER}" placeholder="Search user by login..."
                    aria-label="Search user by in-name">

                    <label for="fullname">fullname</label>
                    <input type="text" id="fullname" name="${apiUrlQualifier.API_URL_FULLNAME_QUALIFIER}" placeholder="Search user by login..."
                    aria-label="Search user by fullname">
                   
                </fieldset>
                    

                    <label for="location">From this location</label>
                    <input type="text" id="location" name="${apiUrlQualifier.API_URL_LOCATION_QUALIFIER}" 
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
        let formData = {}
        for(let i = 0; i < this.#formUsers.elements.length; i++) { // * check for epmty field
            // rule for groups
            if(this.#formUsers.elements[i].type == 'fieldset') {
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
        }
        console.log(formData);
        return formData;
    }
}
export default new Form(); 

