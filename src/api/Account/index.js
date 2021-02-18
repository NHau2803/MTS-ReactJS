import { handleApi } from 'api/Handle/handleApi';
import urlApi from 'api/URL';
import axios from 'axios';

const accountApi = {
  
  search: async (params) => {
    try{

      const url = 'http://localhost:8090/account/search';  
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

  find: async (id) => {
    try{

      const url = urlApi.BASE_URL_account +`/${id}`;
      return await handleApi(await axios.get(url));
      
    }catch(error){
      return {
        result: null,
        success: false,
        errorMessage: "Sorry, Server Connection Problem!"
      };
    }
  },

//   info: async(id) => {
//     try{
//       const url = urlApi.BASE_URL_account + `/${id}/info`;
//       return await handleApi(await axios.get(url));
//     }catch(error){
//       return {
//         result: null,
//         success: false,
//         errorMessage: "Sorry, Server Connection Problem!"
//       };
//     }
//   },

//   create: async(account) => {
//     try{

//       const url = urlApi.BASE_URL_ADMIN + '/account';
//       return await handleApi(await axios.post(url, account));

//     }catch(error){
//       return {
//         result: null,
//         success: false,
//         errorMessage: "Sorry, Server Connection Problem!"
//       };
//     }
//   },

//   update: async(id, account) => {
//     try{

//       const url = urlApi.BASE_URL_account + `/${id}`;
//       return await handleApi(await axios.post(url, account));

//     }catch(error){
//       return {
//         result: null,
//         success: false,
//         errorMessage: "Sorry, Server Connection Problem!"
//       };
//     }
   
//   },

//   delete: async(id) => {
//     try{

//       const url = urlApi.BASE_URL_ADMIN + `/account/${id}/delete`;
//       return await handleApi(await axios.post(url, id));

//     }catch(error){
//       return {
//         result: null,
//         success: false,
//         errorMessage: "Sorry, Server Connection Problem!"
//       };
//     }
//   },

}

export default accountApi;