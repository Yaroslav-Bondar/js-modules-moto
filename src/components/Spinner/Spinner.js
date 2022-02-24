// import 'tuicss';
import spinnerHtml from './SpinnerHtml';
// import styles from './Spinner.css';

class Spinner {
    handleClear(componentId) {
        // checking if other components, for example (Error component ),
        // have not overwritten the contents of the container
        document.querySelector(`#${componentId}`).remove();
        // if(document.querySelector(`.tui-progress-bar`))
            // document.querySelector(`.tui-progress-bar`).remove();
    }
    render(parentNode, componentId) {
        parentNode.insertAdjacentHTML('beforeend', spinnerHtml[componentId]);
    }
}
export default new Spinner();