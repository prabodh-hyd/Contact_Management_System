import axios from "axios";
import { selector } from "recoil";
import { userDeleteState } from './atoms';

export const getAllContactData = selector({
    key:'getAllContactData',
    get: async ({get}) =>{
        const response = await  axios.get('http://localhost:8000/getAllData')
        if (response.error) {
            throw response.error;
          }
          const json = await response.data;
          return json;
    }
});

export const userDeleteId = selector({
    key:'userDeleteId',
    get: async ({get}) =>{
        // const getDeleteId = get(userDeleteState);
        // console.log(getDeleteId);
       const deleteResponse = await axios.delete(`http://localhost:8000/delete/${get}`)

       const json = await deleteResponse.data;
       return json;
    }
})
