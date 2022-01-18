import {ROOT_INDEX} from '../../constants/root';
import Users from '../Users';
import Spinner from '../Spinner';
import * as qualifier from '../../constants/api/apiUrlQualifier';
// console.log(qualifier);
class Form {
    #formUsers;
    #qualifierValues = Object.values(qualifier);
    render() {
        // <div class="container__root tui-bg-blue-black tui-border-double tui-fieldset orange-168"></div>
        let htmlContent = `
            <form name="users" role="search">
                <fieldset>
                    <legend>required user data</legend>

                    <label for="name">login</label>
                    <input type="text" id="name" name="${qualifier.API_URL_USER_QUALIFIER}" placeholder="Search user by login..."
                    aria-label="Search user by login">

                    <input type="radio" id="" name"" value="">
                    <label for=""></label>

                    <label for="location">From this location</label>
                    <input type="text" id="location" name="${qualifier.API_URL_LOCATION_QUALIFIER}" placeholder="Ukraine Kyiv Odessa"
                    aria-label="Search user by location">

                    <label for="language">Language : </label>
                    <select id="language" name="${qualifier.API_URL_LANGUAGE_QUALIFIER}">
                        <option value="">none</option>
                        <option value="javascript" selected>Java Script</option>
                        <option value="C">c</option>
                        <option value="ruby">Ruby</option>
                        <option value="kotlin">kotlin</option>
                    </select>
                </fieldset>
                <button value="submit">submit</button>
            </form>`;
                // <input type="submit" value="submit" onclick='alert(4)'>
                // onclick='alert(4)'
                // <label for="country">Country:</label>
                // <select id="country" name="country" size='1'>
                //     <option value="">none</option>    
                //     <option value="switzerland">Switzerland</option>
                //     <option value="france">France</option>
                //     <option value="ukraine" selected label="my country" disabled>Ukraine</option>
                //     <option value="germany">Germany</option>
                //     <option value="nl">The Netherlands</option>
                // </select>
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
        console.log(this.#formUsers);
        let formData = {
            qualifier: {},
            parameter:{},
        }
        for(let i = 0; i < this.#formUsers.elements.length; i++) { // * check for epmty field
            if(this.#qualifierValues.includes(this.#formUsers.elements[i].name)) {
                formData.qualifier[this.#formUsers.elements[i].name] = this.#formUsers.elements[i].value; 
            }
        }
        console.log(formData);
        // return {
        //     country: this.#formUsers.elements.location.value,   // * use for while
        //     language: this.#formUsers.elements.language.value,
        //     name: this.#formUsers.elements.name.value,
        // }
        return formData;
    }
}
export default new Form(); 

