import {ROOT_INDEX} from '../../constants/root';
import Users from '../Users';
import Spinner from '../Spinner';
class Form {
    #formUsers;
    render() {
        // <div class="container__root tui-bg-blue-black tui-border-double tui-fieldset orange-168"></div>
        let htmlContent = `
            <form name="users" role="search">
                <fieldset>
                    <legend>required user data</legend>

                    <label for="login">login</label>
                    <input type="search" id="login" name="login" placeholder="Search user by login..."
                    aria-label="Search user by login">

                    <label for="location">From this location</label>
                    <input type="text" id="location" name="location" placeholder="Ukraine Kyiv Odessa"
                    aria-label="Search user by location">

                    <label for="language">Language : </label>
                    <select id="language" name="language">
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
        return {
            country: this.#formUsers.elements.location.value,   // * use for while
            language: this.#formUsers.elements.language.value,
            login: this.#formUsers.elements.login.value,
        }
    }
}
export default new Form(); 

