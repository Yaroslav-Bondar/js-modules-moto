// import { URL_ACTION } from '../../constants/api';
import Users from '../Users';
import './App.css';
// import User from '../User';
import {b} from '../User/test';
b.b = 'app';


class App {
    async render() {
        await Users.render()
        // Users.render().then(res=> console.log(res));
        // console.log(Users.render());
    }
    eventListenerUsers = Users.eventListener;
}

export default new App()