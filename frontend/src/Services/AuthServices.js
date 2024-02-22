import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BackendUrl = process.env.REACT_APP_BACKEND_BASE_URL;
export const generateOtp = async (email) => {
  try {
    const response = await axios.post(`${BackendUrl}/auth/generate-otp`, email);
    toast.success(response.data.message, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    console.log(error);
  }
};

export const verifyUser = async (data) => {
  try {
    console.log("data", data);
    const token = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    const response = await axios.post(
      `${BackendUrl}/auth/authenticate-user`,
      data,
      { headers }
    );
    toast.success(response.data.message, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    console.log(error);
  }
};

export const createProfile = async (formData) => {
  console.log(formData);
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    Authorization: token,
  };
  try {
    const response = await axios.post(`${BackendUrl}/profile`, formData, {
      headers,
    });
    if (response) {
      toast.success(response.data.message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      localStorage.setItem("profileId", response.data.profileId);
      return response.data;
    }
  } catch (error) {
    toast.error(error.response.data.error, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    console.log(error);
  }
};

export const getProfile = async () => {
  const profileId = localStorage.getItem("profileId");
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    Authorization: token,
  };
  try {
  const response = await axios.get(`${BackendUrl}/profile/${profileId}`, {headers})
    if(response){
      return response.data;
    }
  } catch (error) {
    console.log(error)
  }

};

export const updateProfile = async(data)=>{
  console.log("data", data)
  const profileId = localStorage.getItem("profileId");
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    Authorization: token,
  };
  try {
  const response = await axios.put(`${BackendUrl}/profile/${profileId}`, data, {headers})
    if(response){
      return response.data;
    }
  } catch (error) {
    console.log(error)
  }

}
