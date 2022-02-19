import Users from '../Users';
import Form from '../Form';
import Spinner from '../Spinner';
import {ROOT_INDEX} from '../../constants/root';
import './App.css';

class App {
    async render() {
        Spinner.render(ROOT_INDEX, 'spinner__users');
        await Users.render(Form.getDataForm());
        Spinner.handleClear();
    }
}
export default new App();
