import {ROOT_INDEX} from '../../constants/root';
import Users from '../Users';
import Spinner from '../Spinner';
class Form {
    // formUsers = document.forms.users;
    render() {
        // <div class="container__root tui-bg-blue-black tui-border-double tui-fieldset orange-168"></div>
        let htmlContent = `
            <form name="users">
                <label for="ZIP">ZIP : </label>
                <input type="text" id="ZIP">
                <fieldset>
                    <legend>required user data</legend>
                    <label for="country">Country : </label>
                    <select id="country" name="country" size='1'>
                        <option value="switzerland">Switzerland</option>
                        <option value="france">France</option>
                        <option value="ukraine" selected label="my country" disabled>Ukraine</option>
                        <option value="germany">Germany</option>
                        <option value="nl">The Netherlands</option>
                    </select>
                    <label for="language">Language : </label>
                    <select id="language" name="language">
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
        ROOT_INDEX.insertAdjacentHTML('afterbegin', htmlContent);
    }
    eventListener() {
        // console.log('I am eventlistener');
        const formUsers = document.forms.users; // * double define
        // console.log(formUsers);
        // console.log(formUsers.elements.btn2);
        formUsers.addEventListener('submit', async (e) => {
            e.preventDefault();
            // console.log('event ', e);
            // alert(e);
            // const formUsersElements = 
            // const selectCountryValue = formUsers.elements.country.value;
            // const selectLanguageValue = formUsers.elements.language.value;
            // const dataForm = {
            //     country: formUsers.elements.country.value,
            //     language: formUsers.elements.language.value,
            // }
            // const usersContainer = ROOT_INDEX.querySelector('.users__container');
            Spinner.render(ROOT_INDEX, 'spinner__users');
            // await Users.render(selectLanguageValue, selectCountryValue);
            await Users.render(this.getDataForm());
            Spinner.handleClear();
        });
    }
    getDataForm() {
        const formUsers = document.forms.users; // * double define
        return {
            country: formUsers.elements.country.value,   // * use for 
            language: formUsers.elements.language.value,
        }
    }
}
export default new Form(); 

