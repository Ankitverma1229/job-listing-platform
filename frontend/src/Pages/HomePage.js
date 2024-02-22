import React, { useEffect, useState } from "react";
import { getAllJobs } from "../Services/JobServices";
import JobCard from "../Components/JobCard";
import Navbar from "../Components/Navbar";
import { getProfile } from "../Services/AuthServices";
import { updateProfile } from "../Services/AuthServices";
import "./loader.css";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [availablJobs, setAvailableJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalToken, setTotalToken] = useState();
  const [name, setName] = useState("");
  const [isProfileUpdated, setIsProfileUpdated] = useState(false);
  const [remainingToken, setRemainingToken] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, []);

  const updateProfileData = async () => {
    try {
      await updateProfile({ totalCoins: remainingToken });
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isProfileUpdated) {
      updateProfileData();
    }
  }, [isProfileUpdated]);

  const getData = async () => {
    setIsLoading(true);
    try {
      const response = await getAllJobs();
      setAvailableJobs(response);
      const profile = await getProfile();
      console.log(profile);
      setTotalToken(profile.totalCoins);
      setName(profile.name);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className=" min-h-[100vh]">
      <Navbar totalToken={totalToken} name={name} />
      {isLoading ? (
        <div className=" h-[70vh]  flex justify-center items-center mx-auto">
          <div className="loader "></div>
        </div>
      ) : (
        <div className="flex flex-wrap gap-4 justify-center mt-5">
          {availablJobs &&
            availablJobs.map((item, index) => (
              <JobCard
                key={index}
                item={item}
                totalToken={totalToken}
                setIsProfileUpdated={setIsProfileUpdated}
                setRemainingToken={setRemainingToken}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
