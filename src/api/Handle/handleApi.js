
export const handleApi = (res) => {
  console.log(res.status);
  if(res.status === 200){
    let dataApi = res.data; 
    
    if(dataApi.success){ //server success = false!

      return{
        result : dataApi.result,
        success: true,
        errorMessage: dataApi.result === null ? "Not Found!" : null
      };
    }
    
    return {
      result : null,
      success: false,
      errorMessage: dataApi.message
    }; 
  }

  if(res.status === 201){
    return {success: true};
  }

  if(res.status === 500){
    return {errorMessage: "Server have problem"};
  }

  if(res.status === 400){

    return {errorMessage: "400"};
  }
  
  if(res.status === 403){

    return {errorMessage: "403"};
  }
  
}



