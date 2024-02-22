import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BackendUrl = process.env.REACT_APP_BACKEND_BASE_URL;


export const getAllJobs = async()=>{
    try {
      const response = await axios.get(`${BackendUrl}/jobs`);
      if(response){
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  }