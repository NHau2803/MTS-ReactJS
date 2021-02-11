import { handleApi } from 'api/Handle/handleApi';
import axios from 'axios';
import urlApi from '../URL';

const teamApi = {
  
  search: async (params) => {
    try{

      const url = urlApi.BASE_URL_TEAM + '/search';  
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

  searchByTopicId: async (id, params) => {
    try{

      const url = urlApi.BASE_URL_TEAM + `/search/${id}`;  
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

      const url = urlApi.BASE_URL_TEAM +`/${id}`;
      return await handleApi(await axios.get(url));
      
    }catch(error){
      return {
        result: null,   
        success: false,
        errorMessage: "Sorry, Server Connection Problem!"
      };
    }
  },

  view: async (id) => {
    try{

      const url = urlApi.BASE_URL_TEAM +`/${id}/view`;
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
      const url = urlApi.BASE_URL_TEAM + `/${id}/info`;
      return await handleApi(await axios.get(url));
    }catch(error){
      return {
        result: null,
        success: false,
        errorMessage: "Sorry, Server Connection Problem!"
      };
    }
  },

  create: async(team) => {
    try{

      const url = urlApi.BASE_URL_TEAM;
      return await handleApi(await axios.post(url, team));

    }catch(error){
      return {
        result: null,
        success: false,
        errorMessage: "Sorry, Server Connection Problem!"
      };
    }
  },

  update: async(id, team) => {
    try{

      const url = urlApi.BASE_URL_TEAM + `/${id}`;
      return await handleApi(await axios.post(url, team));

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

      const url = urlApi.BASE_URL_TEAM + `/${id}/delete`;
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

export default teamApi;