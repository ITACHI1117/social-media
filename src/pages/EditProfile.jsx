import React, { useState, useRef } from "react";
import { Camera, User } from "lucide-react";
import { useEditProfile } from "../queries/userQueries";
import LoadingSpinner from "../components/LoadingSpinner";
import { useNavigate } from "react-router";

const EditProfile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  let navigate = useNavigate();

  const {
    mutate: editProfile,
    isSuccess,
    isPending,
    isError,
  } = useEditProfile();

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("Firstname", firstName);
    formData.append("Lastname", lastName);
    formData.append("Image", profileImage);
    editProfile(formData);
    console.log("Form submitted:", {
      firstName,
      lastName,
      profileImage,
    });
    goBack();
    // Add your submit logic here
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {isPending && (
        <LoadingSpinner isVisible={isPending} message="Editing..." />
      )}
      {/* Header */}
      <div className="bg-white shadow-sm px-4 py-4 flex items-center justify-between">
        <button onClick={goBack} className="text-gray-600">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <h1 className="text-lg font-semibold text-gray-900">Edit Profile</h1>
        <div className="w-6"></div>
      </div>

      {/* Form Container */}
      <div className="flex-1 px-6 py-8">
        <div className="space-y-6">
          {/* Profile Image Section */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div
                onClick={handleImageClick}
                className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-300 transition-colors overflow-hidden"
              >
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Profile preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-8 h-8 text-gray-400" />
                )}
              </div>

              {/* Camera Icon Overlay */}
              <div
                onClick={handleImageClick}
                className="absolute -bottom-1 -right-1 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors shadow-lg"
              >
                <Camera className="w-4 h-4 text-white" />
              </div>
            </div>

            {/* Hidden File Input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>

          {/* First Name Input */}
          <div className="space-y-2">
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700"
            >
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="Enter your first name"
            />
          </div>

          {/* Last Name Input */}
          <div className="space-y-2">
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700"
            >
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="Enter your last name"
            />
          </div>
        </div>
      </div>

      {/* Submit Button - Fixed at Bottom */}
      <div className="p-6 bg-white border-t border-gray-200">
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
