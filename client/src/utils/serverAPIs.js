import axios from "axios";

const API_BASE_URL = 'http://localhost:8000/';

// axios.delete(`http://localhost:8000/delete/${id}`)  64bb718373eee98f83bedb95  64bb718373eee98f83bedb95

export async function deleteData(id) {
  console.log(id);
    const url = `http://localhost:8000/delete/${id}`;
    console.log("Desu");
  
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        // Add any additional headers if required
      },
    };

    try {
        const response = await axios.delete(url, requestOptions);
        if(!response.ok){
            throw new Error("Failed to delete data.");
        }
    } catch (error) {
        throw new Error(error.message);
    }
  }