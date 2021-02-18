import { handleApi } from 'api/Handle/handleApi';
import axios from 'axios';
import urlApi from '../URL';

const studentApi = {
  
  search: async (params) => {
    try{

      const url = urlApi.BASE_URL_ADMIN + '/student/search';  
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

      const url = urlApi.BASE_URL_STUDENT +`/${id}`;
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
      const url = urlApi.BASE_URL_STUDENT + `/${id}/info`;
      return await handleApi(await axios.get(url));
    }catch(error){
      return {
        result: null,
        success: false,
        errorMessage: "Sorry, Server Connection Problem!"
      };
    }
  },

  create: async(student) => {
    try{

      const url = urlApi.BASE_URL_ADMIN + '/student';
      return await handleApi(await axios.post(url, student));

    }catch(error){
      return {
        result: null,
        success: false,
        errorMessage: "Sorry, Server Connection Problem!"
      };
    }
  },

  update: async(id, student) => {
    try{

      const url = urlApi.BASE_URL_STUDENT + `/${id}`;
      return await handleApi(await axios.post(url, student));

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

      const url = urlApi.BASE_URL_ADMIN + `/student/${id}/delete`;
      console.log(url)
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

export default studentApi;