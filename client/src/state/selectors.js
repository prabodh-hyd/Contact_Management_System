import axios from "axios";
import { selector } from "recoil";
import { userDeleteState, getAllContactData } from './atoms';

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
        const getAllData = get(getAllContactData)
        console.log(getDeleteId);
       const deleteResponse = await axios.delete(`http://localhost:8000/delete/${getDeleteId}`)
        console.log(getAllContactData)
       const json = await deleteResponse.data;
       return json;
    }
})
