import { executeErrorHandler } from 'api/Handle/executeError';
import { handleApi } from 'api/Handle/handleApi';
import axios from 'axios';
import urlApi from '../URL/urlApi';

const teacherApi = {
  
  search: async (params) => {
    try{

      const url = urlApi.BASE_URL_ADMIN + '/teacher/search';  
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

      const url = urlApi.BASE_URL_TEACHER +`/${id}`;
      return await handleApi(await axios.get(url));
      
    }catch(error){
      return {
        result: null,
        success: false,
        errorMessage: "Sorry, Server Connection Problem!"
      };
    }
  },

  info: async(id) => {
    try{
      const url = urlApi.BASE_URL_TEACHER + `/${id}/info`;
      return await handleApi(await axios.get(url));
    }catch(error){
      return {
        result: null,
        success: false,
        errorMessage: "Sorry, Server Connection Problem!"
      };
    }
  },

  create: async(teacher) => {
    try{

      const url = urlApi.BASE_URL_ADMIN + '/teacher';
      return await handleApi(await axios.post(url, teacher));

    }catch(error){
      return {
        result: null,
        success: false,
        errorMessage: "Sorry, Server Connection Problem!"
      };
    }
  },

  update: async(id, teacher) => {
    try{

      const url = urlApi.BASE_URL_TEACHER + `/${id}`;
      return await handleApi(await axios.post(url, teacher));

    }catch(error){
      return {
        result: null,
        success: false,
        errorMessage: "Sorry, Server Connection Problem!"
      };
    }
   
  },

  delete: async(id) => {
    try{

      const url = urlApi.BASE_URL_ADMIN + `/teacher/${id}/delete`;
      return await handleApi(await axios.post(url, id));

    }catch(error){
      return {
        result: null,
        success: false,
        errorMessage: "Sorry, Server Connection Problem!"
      };
    }
  },

}

export default teacherApi;