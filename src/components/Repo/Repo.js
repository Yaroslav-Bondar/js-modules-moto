import {getDataApi} from '../../utils/getDataApi'
import {API_URL, URL_REPO, URL_ACTION, URL_REPO_OPTIONS} from '../../constants/api';
class Repo {
    async render(login) {
        const repoUrlTemplate = API_URL + '/' + URL_ACTION + '/' + URL_REPO + URL_REPO_OPTIONS;
        // const repoUrl = repoUrlTemplate.replace(/(user):(user)/, (...match) => {console.log(match); 
            // return `${match[1]}:${login}`});
        const repoUrl = repoUrlTemplate.replace(/user_name/, login);    
        const data = await getDataApi.getData(repoUrl);
        console.log(data);
        console.log(typeof repoUrl);
    }
}
export default new Repo();