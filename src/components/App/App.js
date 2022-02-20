import Users from '../Users';
import Form from '../Form';
import './App.css';

class App {
    async render() {
        await Users.render(Form.getDataForm());
    }
}
export default new App();
