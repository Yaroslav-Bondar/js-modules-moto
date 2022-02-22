// import 'tuicss';
import spinnerHtml from './SpinnerHtml';
// import styles from './Spinner.css';

class Spinner {
    handleClear() {
        // checking if other components, for example (Error component ),
        // have not overwritten the contents of the container
        document.querySelector(`#${this.componentId}`).remove();
        // if(document.querySelector(`.tui-progress-bar`))
            // document.querySelector(`.tui-progress-bar`).remove();
    }
    // ${styles[className]}
    // className
    render(parentNode, componentId) {
        this.componentId = componentId;
        // <div class="">
        // ;
        // let html = `
        // <div class="tui-progress-bar ${className}">
        //         <div class="${styles.spinner__text}">${text}</div>                
        //         <span class="tui-indeterminate"></span>
        //     </div>`;
        // parent.insertAdjacentHTML('beforeend', html);
        parentNode.insertAdjacentHTML('beforeend', spinnerHtml[componentId]);
        // // </div>
    }
}
export default new Spinner();