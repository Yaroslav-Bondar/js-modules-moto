import classes from './Spinner.css';
import 'tuicss';
class Spinner {
    handleClear() {
        // checking if other components, for example (Error component ),
        // have not overwritten the contents of the container
        if(document.querySelector(`.tui-progress-bar`))
            document.querySelector(`.tui-progress-bar`).remove();
    }
    render(parent, className) {
        let html = `
            <!-- Indeterminate --> 
            <div class="tui-progress-bar ${className}">
                <span class="tui-indeterminate"></span>
            </div>`;
        parent.insertAdjacentHTML('beforeend', html);
    }
}
export default new Spinner();