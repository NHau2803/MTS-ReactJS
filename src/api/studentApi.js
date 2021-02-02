import axios from 'axios';
import handleApi from './handleApi';
import urlApi from './urlApi';

const studentApi = {
  search: async (params) => {
    try{
      const url = urlApi.BASE_URL_ADMIN + '/student/search';  
      const result = await handleApi(await axios.get(url));
      return result;
    }catch(error){
      console.log(error);
      return [];
    }
  },

  find: async (id) => {
    
    try{
      const url = urlApi.BASE_URL_STUDENT +`/${id}`;
      const result = await handleApi(await axios.get(url));
      return result;
    }catch(error){
      console.log(error);
      return [];
    }
  },

  info: async (id) => {
    try{
      const url = urlApi.BASE_URL_STUDENT + `/${id}/info`;
      const result = await handleApi(await axios.get(url));
      return result;
    }catch(error){
      console.log(error);
      return [];
    }
  },

  create: (student) => {
    const url = urlApi.BASE_URL_ADMIN + '/student';
    axios.post(url, student).then((res) =>{
      handleApi(res); 
    });
  },

  update: (id, student) => {
    const url = urlApi.BASE_URL_STUDENT + `/${id}`;
    axios.post(url, student).then((res) =>{
      handleApi(res);
    });
  },

  delete: (id) => {
    const url = urlApi.BASE_URL_ADMIN + `/student/${id}/delete`;
    axios.post(url, id).then((res) =>{
      handleApi(res);
    });
  },

}

export default studentApi;