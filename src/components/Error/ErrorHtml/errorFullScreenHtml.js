import styles from '../Error.css';
export const errorFullScreenHtml = error => `
    <div class="${styles['error__fullscreen']}">
        <div class="${styles['error__message']}">
            <h3>No acces !!!</h3>
            <h6>${error}</h6>
            <p>please try again later</p>
        </div>
    </div>`;
    // <h5>${message}</h5>