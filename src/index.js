import 'regenerator-runtime/runtime';  // to support asynchronous functions
// import {API_URL, URL_COMICS} from './constants/api'
// import {getDataApi} from './utils/getDataApi'
import App from './components/App';
import data from './components/User';
console.log(data);
// import Comics from './components/Comics'
(async () => {
    // let data = await getDataApi.getData(API_URL + URL_COMICS)
    // console.log(data)
    await App.render();
    // await Comics.render()
    // Comics.eventListener()
    App.eventListenerUsers();
})()

console.log('End')

