import 'regenerator-runtime/runtime';  // to support asynchronous functions
import Spinner from './components/Spinner';
import {ROOT_MODAL} from './constants/root';
(async () => {
    Spinner.render(ROOT_MODAL);
    await App.render();
    Spinner.handleClear(ROOT_MODAL);
    App.eventListenerUsers();
})()

import App from './components/App';