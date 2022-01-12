import Users from '../Users';
import './App.css';

class App {
    async render(dataForm) {
        await Users.render(dataForm);
    }
    // eventListenerUsers = Users.eventListener; // *
}
export default new App();
