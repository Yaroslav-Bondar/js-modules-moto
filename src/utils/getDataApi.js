import axios from "axios";
// import {API_KEY, ACTION, URL_USERS, OPTIONS} from '../constants/api';


// https://api.github.com/search/users?q=followers:>1000+repos:<100+language:javascrip+location:ukraine+type:user&page=1&per_page=10
// https://api.github.com/search/users?q=language:javascript+location:ukraine+type:user&sort=followers&order=desc&page=1&per_page=10
class GetDataApi {
    async getData(url) {
        try {
            // const response = await axios.get(url, {
            //     params: {
            //         apikey: API_KEY
            //     }
            // })
            
            // console.log(response.data.data.results);
            // return response.data.data.results
            const response = await axios.get(
                    url
                // 'https://api.github.com/search/users?q=language:javascript+location:ukraine+type:user&sort=followers&order=desc&page=1&per_page=10'
            )
            // console.log(response);
            if(response.data.items) {
                // console.log(response);
                // console.log(response.data.items);
                return response.data.items;
            }
            else if(response.data) {
                // console.log(response);

                // console.log(response.data);
                return response.data;
            }
            // console.log(response.data.items[0].name);
            // const fullName = await axios.get[response.data.items[0].name]
            // return response.data.data.results
        }
        catch(err) {
            console.log(err.message)
            return err
            return false
        }
    }
}

export const getDataApi = new GetDataApi();
