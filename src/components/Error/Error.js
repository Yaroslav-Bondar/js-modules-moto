import errorHtml from "./ErrorHtml";

class Error {
    render(parent, componentId, error) {
        parent.insertAdjacentHTML('beforeend', errorHtml[componentId](error));
    };
}
export default new Error();