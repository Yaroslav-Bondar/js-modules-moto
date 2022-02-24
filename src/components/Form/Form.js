import Users from '../Users';
// import Spinner from '../Spinner';
import {formDataSerializer} from '../../utils/formDataSerializer';
import {ROOT_INDEX} from '../../constants/root';
import {htmlForm} from './FormHtml'

class Form {
    constructor() {
        ROOT_INDEX.insertAdjacentHTML('afterbegin', htmlForm);
        this.init();
    }
    init() {
        this.formUsers = document.forms.users;
        this.handlerFormSubmit();
    }
    handlerFormSubmit() {
        this.formUsers.addEventListener('submit', async (e) => {
            e.preventDefault();
            // Spinner.render(ROOT_INDEX, 'spinner__users');
            await Users.render(this.getDataForm());
            // Spinner.handleClear();
        });
    }
    getDataForm() {
        return formDataSerializer(this.formUsers);
    }
}
export default new Form(); 

