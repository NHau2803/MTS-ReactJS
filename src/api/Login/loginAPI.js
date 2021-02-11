
// import { handleApi } from 'api/Handle/handleApi';
// import axios from 'axios';
// import urlApi from '../URL/urlApi';

// const loginApi = {
  
//   login: async (account) => {
//     try{
//       console.log(account);
//       const url = 'http://localhost:8090/login';  
//       axios.post(url, account)
//       .then(res=>{
       
//         if(res.status === 200){
//             return {
//                 role: null,
//                 token: res.data.token,
//                 success: true,
//                 errorMessage: null
//             };
//         }
          
//       })
//       .catch(error =>{
//           console.log(error)
//         return {
//             role: null,
//             success: false,
//             errorMessage: "Login failed: username or password is incorrect."
//         };
//       })

//     }catch(error){
//       return {
//         role: null,
//         success: false,
//         errorMessage: "Login failed: username or password is incorrect."
//       };
//     }
//   },

// }

// export default loginApi;