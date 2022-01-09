import axios from 'axios';
// import Error from '../components/Error';
// https://api.github.com/search/users?q=followers:>1000+repos:<100+language:javascrip+location:ukraine+type:user&page=1&per_page=10
// https://api.github.com/search/users?q=language:javascript+location:ukraine+type:user&sort=followers&order=desc&page=1&per_page=10
class GetDataApi {
    async getData(url) {
        try {
            const response = await axios.get(url)
            console.log(response);
            if(response.data.items) {        // response for Users, Repo
                return response.data.items;
            }
            else if(response.data) {         // response for User
                return response.data;
            }
        }
        catch(err) {
            console.log(err.message);
            return err;
        }
    }
}
export const getDataApi = new GetDataApi();
