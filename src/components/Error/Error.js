class Error {
    render(error, parent, className, message) {
        parent.innerHTML = `
        <div class="${className}">
            <div class="error__message">
                <h3>No acces !!!</h3>
                <h5>${message}</h5>
                <h6>${error}</h6>
                <p>please try again later</p>
            </div>
        </div>`;
    }
}
export default new Error();