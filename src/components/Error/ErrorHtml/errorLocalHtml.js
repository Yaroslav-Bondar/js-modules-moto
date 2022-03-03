import styles from '../Error.css';
export const errorLocalHtml = (error, message) => `
    <div class="${styles['error__local']}">
        <div class="${styles['error__local-message']}">
            <h3>${message}</h3>
            <h6>${error}</h6>
            <p>please try again later</p>
        </div>
    </div>`;
            // <h3>No acces !!!</h3>