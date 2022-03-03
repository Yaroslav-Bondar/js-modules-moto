import errorHtml from "./ErrorHtml";

class Error {
    render(parent, componentId, error, message) {
        parent.insertAdjacentHTML('beforeend', errorHtml[componentId](error, message));
    };
}
export default new Error();