// ${className}
// ${styles.spinner__text}
// ${text}
import styles from '../Spinner.css';
import {USER_COMPONENT_ID} from '../../../constants/root';

export const spinnerUserHtml = `
    <div id=${USER_COMPONENT_ID} class="${styles['spinner__user-container']}">
        <div class="${styles['spinner__user-text']}">user loading... :</div>                
        <div class="tui-progress-bar">
            <span class="tui-indeterminate"></span>
        </div>
    </div>`;