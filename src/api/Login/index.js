
// import axios from 'axios';

// const loginApi = {
  
//   login: async (account) => {
//     try{
//       console.log(account)
//       const url = BAES_URL_LOGIN;  
//       axios.post(url, account)
//       .then(res=>{
//         console.log(res)
//         if(res.status === 200){
//             return {
//                 roles: res.data.roles,
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