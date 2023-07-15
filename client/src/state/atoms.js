import { atom, selector } from 'recoil';
import axios from 'axios';

export const authAtom = atom({
    key: 'authAtom',
    default: ''
});

export const getAllContactData = atom({
    key: 'getAllContactData',
    default: selector({
        key: 'getAllContactData/allDate',
        get: async () =>{
            try{
                const response = await  axios.get('http://localhost:8000/getAllData')
                const json = await response.data;
                return json;
            }
            catch(err){
                console.log(err);
            }
        }
    })
})

export const userDeleteState = atom({
    key: 'userDeleteState/userDeleteId',
    default: null,
    default:selector({
        key: '',
        get: async (userDeleteState) =>{
            console.log("desu");
            try{
                const response = await  axios.get(`http://localhost:8000/delete/${userDeleteState}`)
                const json = await response.data;
                return json;
            }
            catch(err){
               console.log(err);
            }
        }
    })
})


// export const industriesState = atom<Industry[]>({
//     key: 'industries',
//     default: selector({
//       key: 'industries/initial',
//       get: async () => {
//         const response = await fetch('https://api.example.com/industries');
//         return (await response.json()).data;
//       }
//     })
//   })