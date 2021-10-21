import 'regenerator-runtime/runtime'
// import {API_URL, URL_COMICS} from './constants/api'
// import {getDataApi} from './utils/getDataApi'
import App from './components/App'
import Comics from './components/Comics'
(async () => {
    // let data = await getDataApi.getData(API_URL + URL_COMICS)
    // console.log(data)
    await App.render()
    Comics.eventListener()
})()

console.log('End')

