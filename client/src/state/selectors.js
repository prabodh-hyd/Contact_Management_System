import axios from "axios";
import { selector } from "recoil";
// import { userDeleteState, getAllContactData } from './atoms';

// export const getAllContactData = selector({
//     key:'getAllContactData',
//     get: async ({get}) =>{
//         try{
//             const response = await  axios.get('http://localhost:8000/getAllData')
//             const json = await response.data;
//             return json;
//         }
//         catch(err){
//             console.log(err);
//         }
//     }
// });

export const userDeleteId = selector({
    key:'userDeleteId',
    get: async ({get}) =>{
        const getDeleteId = get(userDeleteState);
        console.log(getDeleteId)
    }
})

// default:selector({
//     key: 'userDeleteState/DeleteId',
//     get: async (userDeleteState) =>{
//         console.log("desu");
//         try{
//             const response = await  axios.get(`http://localhost:8000/delete/${userDeleteState}`)
//             const json = await response.data;
//             return json;
//         }
//         catch(err){
//            console.log(err);
//         }
//     }
// })