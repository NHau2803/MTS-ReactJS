import { handleApi } from 'api/Handle/handleApi';
import axios from 'axios';
import urlApi from '../URL';

const analysisApi = {
  
  search: async (params) => {
    try{

      const url = urlApi.BASE_URL_ADMIN + '/analysis/search';  
      let result = await handleApi(await axios.get(url));
      console.log(result);
      return result;

    }catch(error){
      return {
        result: null,
        success: false,
        errorMessage: "Sorry, Server Connection Problem!"
      };
    }
  },


}

export default analysisApi;