import {API_URL, URL_COMICS, URL_CHARACTERS, IMG_STANDART_XLARGE, IMG_NOT_AVAILABLE} from '../../constants/api'
import {getDataApi} from '../../utils/getDataApi'
import './Comics.css'
import {ROOT_INDEX} from '../../constants/root'

// console.log(ROOT_INDEX, ROOT_MODAL)

class Comics {
    async render() {
        let data = await getDataApi.getData(API_URL + URL_COMICS)
        let htmlContent = ''

        data.forEach(({id, title, thumbnail: {path, extension}}) => {

            // if the path contain an image    
            if(!path.includes(IMG_NOT_AVAILABLE)) {
                const uri = API_URL + URL_COMICS + '/' + id + '/' + URL_CHARACTERS;  
                const imgSrc = path + '/' + IMG_STANDART_XLARGE + '.' + extension
                htmlContent += `
                    <li class="comics__item" data-uri='${uri}'>
                        <div class="comics__name">${title}</div>
                        <img class="comics__img" src="${imgSrc}" alt="comics_picthure"/>
                    </li>
                `
            }
        })
        const htmlWrapper = `
            <ul class="comics__container">
                ${htmlContent}
            </ul>
        `
        ROOT_INDEX.innerHTML = htmlWrapper
    }
    eventListener() {
        document.querySelectorAll('.comics__item').forEach(el => {
            el.addEventListener('click', () => {
                console.log(el.dataset.uri)
            })
        })
    }
}

export default new Comics()