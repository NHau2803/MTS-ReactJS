
const handleApi = (res) => {
    let dataApi = res.data; 
      if(dataApi.success){
        //console.log(dataApi.result);
        return dataApi.result;
      }
      return {err:"error"}; // xu li them
}
export default handleApi;


