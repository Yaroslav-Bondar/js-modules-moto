import {ROOT_INDEX} from '../../constants/root'
class Error {
    render(error) {
        ROOT_INDEX.innerHTML = `
        <div class="error__container">
            <div class="error__message">
                <h3>No acces !!!</h3>
                <h5>${error}</h5>
                <p>please try again later</p>
            </div>
        </div>`;
    }
}

export default new Error();