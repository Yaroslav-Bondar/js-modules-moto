import 'regenerator-runtime/runtime';  // to support asynchronous functions
import Spinner from './components/Spinner';
import {ROOT_MODAL, ROOT_INDEX} from './constants/root';
import App from './components/App';
// import Users from './components/Users';
import Form from './components/Form';

(async () => {
    // Form.render();
    // Form.init();
    Spinner.render(ROOT_INDEX, 'spinner__users');
    await App.render(Form.getDataForm());
    // App.init();
    Spinner.handleClear();

    console.log("ROOT");
})()
