import styles from '../Error.css';
export const errorFullScreenHtml = (error, message) => `
    <div class="${styles['error__fullscreen']}">
        <div class="${styles['error__fullscreen-message']}">
            <h3>No acces !!!</h3>
            <h5>${message}</h5>
            <h6>${error}</h6>
            <p>please try again later</p>
        </div>
    </div>`;