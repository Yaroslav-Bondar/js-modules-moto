import Users from '../Users';
import './App.css';

class App {
    async render() {
        await Users.render()
    }
    eventListenerUsers = Users.eventListener;
}
export default new App()
