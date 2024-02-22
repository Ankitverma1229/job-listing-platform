import React, { useEffect, useState } from "react";
import { PiCoinsFill } from "react-icons/pi";
import { createProfile } from "../Services/AuthServices";
import { getProfile } from "../Services/AuthServices";
import { useNavigate } from "react-router-dom";

const InputField = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
}) => (
  <div className="flex gap-5">
    <label
      htmlFor={name}
      className="font-bold text-[#44484d] text-base py-2 font-publicSans w-32 text-right"
    >
      {label}:
    </label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="bg-[#F7F8FB] border-solid border-2 border-[#E2E3E8] p-2 h-10 rounded-lg text-base focus:outline-none"
      placeholder={placeholder}
      autoComplete="off"
      required
    />
  </div>
);

const TextAreaField = ({ label, name, value, onChange, placeholder }) => (
  <div className="flex gap-5">
    <label
      htmlFor={name}
      className="font-bold text-[#44484d] text-base py-2 font-publicSans w-32 text-right"
    >
      {label}:
    </label>
    <textarea
      id={name}
      name={name}
      rows="3"
      value={value}
      onChange={onChange}
      className="bg-[#F7F8FB] border-solid border-2 border-[#E2E3E8] p-2 h-10 rounded-lg text-base focus:outline-none"
      placeholder={placeholder}
      autoComplete="off"
      required
    />
  </div>
);

const Profile = () => {
  const [totalToken, setTotalToken] = useState();
  const [profileData, setProfileData] = useState();
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    profilePic: "",
    linkedInLink: "",
    githubLink: "",
    resume: "",
    educationDetails: [{ schoolCollegeName: "", startDate: "", endDate: "" }],
    projectDetails: [
      {
        projectName: "",
        projectDescription: "",
        projectType: "solo",
        projectLink: "",
      },
    ],
    experienceDetails: [
      {
        type: "",
        company: "",
        website: "",
        role: "",
        startDate: "",
        endDate: "",
        coverLetter: "",
      },
    ],
  });
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const profile = await getProfile();
        console.log(profile);
        setProfileData(profile);
        setTotalToken(profile.totalCoins);
        setFormData({
          name: profile.name || "",
          mobile: profile.mobile || "",
          profilePic: profile.profilePic || "",
          linkedInLink: profile.linkedInLink || "",
          githubLink: profile.githubLink || "",
          resume: profile.resume || "",
          educationDetails: profile.educationDetails || [
            { schoolCollegeName: "", startDate: "", endDate: "" },
          ],
          projectDetails: profile.projectDetails || [
            {
              projectName: "",
              projectDescription: "",
              projectType: "solo",
              projectLink: "",
            },
          ],
          experienceDetails: profile.experienceDetails || [
            {
              type: "",
              company: "",
              website: "",
              role: "",
              startDate: "",
              endDate: "",
              coverLetter: "",
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const response = await createProfile(formData);
    if (response) {
      navigate("/home");
    }
  };

  const handleChange = (index, category, field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [category]: prevData[category].map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  return (
    <div className="flex flex-col gap-3 justify-center items-start px-5">
      <div className="flex justify-end  items-center  gap-3 w-full mt-5">
        <div className="flex gap-2 shadow-md px-4 bg-[#0d9488] rounded-md text-white py-1 text-xl">
          Total Coins:{" "}
          <p className="flex items-center gap-2">
            <PiCoinsFill className="text-[#92400e] text-2xl" />{" "}
            <span>{totalToken}</span>
          </p>
        </div>
      </div>
      {/* Personal Details */}
      <h2 className="text-3xl ms-3 mt-5 font-bold">Personal Details</h2>
      <hr className="mt-4 mb-4 border-1 w-full border-emerald-600" />
      <div className="flex flex-wrap gap-3">
        <InputField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Enter your name"
        />
        <InputField
          label="Mobile"
          name="mobile"
          type="number"
          value={formData.mobile}
          onChange={handleInputChange}
          placeholder="Enter your mobile number"
        />
        <InputField
          label="Profile pic"
          name="profilePic"
          value={formData.profilePic}
          onChange={handleInputChange}
          className="bg-[#F7F8FB] border-solid border-2 border-[#E2E3E8] p-2 h-10 rounded-lg text-base  focus:outline-none "
          placeholder="Enter your profile pic URL"
          autoComplete="off"
          required
        />
        <InputField
          label="Linkedin"
          name="linkedInLink"
          value={formData.linkedInLink}
          onChange={handleInputChange}
          className="bg-[#F7F8FB] border-solid border-2 border-[#E2E3E8] p-2 h-10 rounded-lg text-base  focus:outline-none "
          placeholder="Enter your LinkedIn profile URL"
          autoComplete="off"
          require
        />
        <InputField
          label="Github"
          name="githubLink"
          value={formData.githubLink}
          onChange={handleInputChange}
          className="bg-[#F7F8FB] border-solid border-2 border-[#E2E3E8] p-2 h-10 rounded-lg text-base  focus:outline-none "
          placeholder="Enter your GitHub profile URL"
          autoComplete="off  require"
        />
        <InputField
          label="Resume"
          name="resume"
          value={formData.resume}
          onChange={handleInputChange}
          className="bg-[#F7F8FB] border-solid border-2 border-[#E2E3E8] p-2 h-10 rounded-lg text-base  focus:outline-none "
          placeholder="Upload your resume URL"
          autoComplete="off"
          require
        />
      </div>

      {/* Education Details */}
      <h2 className="text-3xl ms-3 mt-10 font-bold">Education Details</h2>
      <hr className="mt-4 mb-4 border-1 w-full border-emerald-600" />
      {formData.educationDetails.map((education, index) => (
        <div key={index} className="flex flex-wrap gap-3">
          <InputField
            label="School / College"
            name={`schoolCollegeName-${index}`}
            value={education.schoolCollegeName}
            onChange={(e) =>
              handleChange(
                index,
                "educationDetails",
                "schoolCollegeName",
                e.target.value
              )
            }
            placeholder="Enter school/college name"
          />
          <InputField
            label="Start Date"
            name={`startDate-${index}`}
            type="date"
            value={education.startDate}
            onChange={(e) =>
              handleChange(
                index,
                "educationDetails",
                "startDate",
                e.target.value
              )
            }
            placeholder="Enter start date"
          />
          <InputField
            label="End Date"
            name={`endDate-${index}`}
            type="date"
            value={education.endDate}
            onChange={(e) =>
              handleChange(index, "educationDetails", "endDate", e.target.value)
            }
            placeholder="Enter end date"
          />
        </div>
      ))}

      {/* Project Details */}
      <h2 className="text-3xl ms-3 mt-10 font-bold">Project Details</h2>
      <hr className="mt-4 mb-4 border-1 w-full border-emerald-600" />
      {formData.projectDetails.map((project, index) => (
        <div key={index} className="flex flex-wrap gap-3">
          <InputField
            label="Project Name"
            name={`projectName-${index}`}
            value={project.projectName}
            onChange={(e) =>
              handleChange(
                index,
                "projectDetails",
                "projectName",
                e.target.value
              )
            }
            placeholder="Enter project name"
          />
          <TextAreaField
            label="Project Description"
            name={`projectDescription-${index}`}
            value={project.projectDescription}
            onChange={(e) =>
              handleChange(
                index,
                "projectDetails",
                "projectDescription",
                e.target.value
              )
            }
            placeholder="Enter project description"
          />
          <InputField
            label="Project Type"
            name={`projectType-${index}`}
            value={project.projectType}
            onChange={(e) =>
              handleChange(
                index,
                "projectDetails",
                "projectType",
                e.target.value
              )
            }
            placeholder="Enter project type"
          />
          <InputField
            label="Project Link"
            name={`projectLink-${index}`}
            value={project.projectLink}
            onChange={(e) =>
              handleChange(
                index,
                "projectDetails",
                "projectLink",
                e.target.value
              )
            }
            placeholder="Enter project link"
          />
        </div>
      ))}

      {/* Experience Details */}
      <h2 className="text-3xl ms-3 mt-10 font-bold">Experience Details</h2>
      <hr className="mt-4 mb-4 border-1 w-full border-emerald-600" />
      {formData.experienceDetails.map((experience, index) => (
        <div key={index} className="flex flex-wrap gap-3">
          <InputField
            label="Type (Internship/Job)"
            name={`experienceType-${index}`}
            value={experience.type}
            onChange={(e) =>
              handleChange(index, "experienceDetails", "type", e.target.value)
            }
            placeholder="Enter type"
          />
          <InputField
            label="Company"
            name={`experienceCompany-${index}`}
            value={experience.company}
            onChange={(e) =>
              handleChange(
                index,
                "experienceDetails",
                "company",
                e.target.value
              )
            }
            placeholder="Enter company name"
          />
          <InputField
            label="Website"
            name={`experienceWebsite-${index}`}
            value={experience.website}
            onChange={(e) =>
              handleChange(
                index,
                "experienceDetails",
                "website",
                e.target.value
              )
            }
            placeholder="Enter company website"
          />
          <InputField
            label="Role"
            name={`experienceRole-${index}`}
            value={experience.role}
            onChange={(e) =>
              handleChange(index, "experienceDetails", "role", e.target.value)
            }
            placeholder="Enter your role"
          />
          <InputField
            label="Start Date"
            name={`experienceStartDate-${index}`}
            type="date"
            value={experience.startDate}
            onChange={(e) =>
              handleChange(
                index,
                "experienceDetails",
                "startDate",
                e.target.value
              )
            }
            placeholder="Enter start date"
          />
          <InputField
            label="End Date"
            name={`experienceEndDate-${index}`}
            type="date"
            value={experience.endDate}
            onChange={(e) =>
              handleChange(
                index,
                "experienceDetails",
                "endDate",
                e.target.value
              )
            }
            placeholder="Enter end date"
          />
          <TextAreaField
            label="Cover Letter"
            name={`experienceCoverLetter-${index}`}
            value={experience.coverLetter}
            onChange={(e) =>
              handleChange(
                index,
                "experienceDetails",
                "coverLetter",
                e.target.value
              )
            }
            placeholder="Enter cover letter"
          />
        </div>
      ))}

      <div className="flex justify-end w-[85%]">
        <button
          onClick={handleSubmit}
          className="border-1 bg-green-600 text-white text-center px-4 py-1 text-2xl rounded-lg focus:outline-none "
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Profile;
