import React, { useState, createContext, useEffect } from "react";
import axios from "axios";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
// import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { authAtom } from "./state/atoms";
import { useRecoilValue } from "recoil";

export const store = createContext();


function App() {
  const [token, setToken] = useState(null);
  const [getAllData, setGetAllData] = useState('');

  useEffect(() => {

    axios.get('http://localhost:8000/getAllData')
    .then(res => setGetAllData(res.data));

  }, [])

  console.log(getAllData);
  // const token = useRecoilValue(authAtom);
  // console.log(token)
  return (
    <div className="App">
      <store.Provider value={[token, setToken ]}>
      <BrowserRouter>
          {/* <Navbar /> */}
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Login token={token} />} />
            <Route path="/Dashboard" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      </store.Provider>
    </div>
  );
}

export default App;
