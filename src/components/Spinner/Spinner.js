import classes from './Spinner.css';
import 'tuicss';
class Spinner {
    handleClear() {
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