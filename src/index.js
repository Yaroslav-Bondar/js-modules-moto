import 'regenerator-runtime/runtime';  // to support asynchronous functions
import Spinner from './components/Spinner';
import {ROOT_MODAL, ROOT_INDEX} from './constants/root';
import App from './components/App';
// import Users from './components/Users';
import Form from './components/Form';

(async () => {
    Form.render();
    Form.eventListener();
    // Spinner.render(ROOT_INDEX);
    // Spinner.render(document.querySelector('.users__container'), 'spinner__users');
    Spinner.render(ROOT_INDEX, 'spinner__users');
    await App.render(Form.getDataForm());
    // Spinner.handleClear(document.querySelector('.users__container'), 'spinner__users');
    Spinner.handleClear();
    // setTime
    // Users.eventListener();

    console.log("ROOT");
    // App.eventListenerUsers();
})()
