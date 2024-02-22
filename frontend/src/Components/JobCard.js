import React, { useState } from "react";
import { toast } from "react-toastify";

const JobCard = ({ item, totalToken, setRemainingToken, setIsProfileUpdated }) => {
  // Truncate employer name if it's longer than 20 characters
  const truncatedEmployerName =
    item.employer_name.length > 20
      ? item.employer_name.substring(0, 20) + "..."
      : item.employer_name;

      const handleApplyNow = () => {
        if (typeof totalToken === 'undefined' || Number(totalToken) < 50) {
          toast.error("You do not have enough coins to apply.");
        } else {
          setRemainingToken(Number(totalToken) - 50);
          setIsProfileUpdated(true);
          window.open(item.job_google_link, "_blank");
        }
      };
      

  return (
    <div className="bg-[#fff] rounded-md  w-[30vw] py-2 px-2.5 shadow-xl">
      <div className="flex items-center justify-between">
        <div className="h-20 w-20 object-contain">
          <img
            src={item.employer_logo}
            alt="Company_Logo"
            className="h-[100%] w-[100%] object-contain"
          />
        </div>
        <p>{truncatedEmployerName}</p>
      </div>
      <div className="flex items-center justify-between mt-4">
        <div className="flex-1">
          <p className="text-xl mb-1">Skills: </p>
          <div className="flex flex-wrap gap-2">
            {item.job_required_skills ? (
              item.job_required_skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-gray-500 text-white rounded-3xl px-2 py-0.5 text-center"
                >
                  {skill}
                </span>
              ))
            ) : (
              <span className="bg-gray-500 text-white rounded-3xl px-2 py-0.5 text-center">
                Good communication
              </span>
            )}
          </div>
        </div>
        <div>
          <button
            onClick={handleApplyNow}
            className="px-4 py-1.5  bg-green-600 text-white border-none rounded-md  text-center"
          >
            Apply now
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
