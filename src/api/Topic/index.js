import { handleApi } from 'api/Handle/handleApi';
import axios from 'axios';
import urlApi from '../URL';

const topicApi = {
  
  search: async (params) => {
    try{

      const url = urlApi.BASE_URL_TOPIC + '/search';  
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

  searchByStudentId: async (id) => {
    try{

      const url = urlApi.BASE_URL_TOPIC + `/search/${id}`;  
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

  // searchTopics: async (params) => {
  //   try{

  //    // const url = urlApi.BASE_URL_TOPIC + '/all';  
  //     let result = await handleApi(await axios.get('http://localhost:8090/topic/all'));
  //     console.log(result);
  //     return result;

  //   }catch(error){
  //     return {
  //       result: null,
  //       success: false,
  //       errorMessage: "Sorry, Server Connection Problem!"
  //     };
  //   }
  // },

  find: async (id) => {
    try{

      const url = urlApi.BASE_URL_TOPIC +`/${id}`;
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
      const url = urlApi.BASE_URL_TOPIC + `/${id}/info`;
      return await handleApi(await axios.get(url));
    }catch(error){
      return {
        result: null,
        success: false,
        errorMessage: "Sorry, Server Connection Problem!"
      };
    }
  },

  create: async(topic) => {
    try{

      const url = urlApi.BASE_URL_TOPIC;
      return await handleApi(await axios.post(url, topic));

    }catch(error){
      return {
        result: null,
        success: false,
        errorMessage: "Sorry, Server Connection Problem!"
      };
    }
  },

  update: async(id, topic) => {
    try{

      const url = urlApi.BASE_URL_TOPIC + `/${id}`;
      return await handleApi(await axios.post(url, topic));

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

      const url = urlApi.BASE_URL_ADMIN + `/topic/${id}/delete`;
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

export default topicApi;