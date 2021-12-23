import 'regenerator-runtime/runtime';  // to support asynchronous functions
// import {API_URL, URL_COMICS} from './constants/api'
// import {getDataApi} from './utils/getDataApi'
import User from './components/User';
import {a} from './components/User/User';
a.name = 'fff';
// b.b = 'dddd';
console.log(a.name);
import {b} from './components/User/test';
import App from './components/App';
console.log('b.b ', b.b);
import Spinner from './components/Spinner';
import {ROOT_MODAL} from './constants/root';
// import data from './components/User';
// console.log(data);
// import Comics from './components/Comics'
(async () => {
    // let data = await getDataApi.getData(API_URL + URL_COMICS)
    // console.log(data)
    Spinner.render(ROOT_MODAL);
    await App.render();
    Spinner.handleClear(ROOT_MODAL);
    // await Comics.render()
    // Comics.eventListener()
    App.eventListenerUsers();
})()

// console.log('End')

