import { useNavigate } from "react-router";
import profileImg from "../assets/manImage.jpg";
import {
  IoChevronBack,
  IoCallOutline,
  IoVideocamOutline,
  IoEllipsisVerticalOutline,
} from "react-icons/io5";
import { HiOutlineDotsVertical } from "react-icons/hi";

function ChatNavigationBar({ user2Data }) {
  let navigate = useNavigate();

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const goBack = () => {
    navigate(-1);
  };

  const handleCall = () => {
    console.log("Starting voice call...");
    // Add voice call functionality
  };

  const handleVideoCall = () => {
    console.log("Starting video call...");
    // Add video call functionality
  };

  const handleMenu = () => {
    console.log("Opening chat menu...");
    // Add menu functionality
  };

  return (
    <header className="sticky top-0 bg-white w-full border-b border-gray-200 shadow-sm z-50">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left Section - Back Button + User Info */}
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          {/* Back Button */}
          <button
            onClick={goBack}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors -ml-2"
          >
            <IoChevronBack className="w-6 h-6 text-gray-700" />
          </button>

          {/* User Profile Section */}
          <div
            onClick={handleProfileClick}
            className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 rounded-lg p-2 -m-2 transition-colors flex-1 min-w-0"
          >
            {/* Profile Image with Online Status */}
            <div className="relative flex-shrink-0">
              <img
                src={user2Data.profileImageUrl}
                alt="Profile"
                className="w-10 h-10 object-cover rounded-full border-2 border-gray-100"
              />
              {/* Online Status Indicator */}
              {/* <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div> */}
            </div>

            {/* User Info */}
            <div className="flex-1 min-w-0">
              <h2 className="font-semibold text-gray-900 text-base truncate">
                {user2Data.firstname} {user2Data.lastname}
              </h2>
              {/* <p className="text-sm text-green-600 font-medium">Online</p> */}
            </div>
          </div>
        </div>

        {/* Right Section - Action Buttons */}
        <div className="flex items-center space-x-1 flex-shrink-0">
          {/* Voice Call Button */}
          {/* <button
            onClick={handleCall}
            className="p-2.5 hover:bg-gray-100 rounded-full transition-colors"
            title="Voice call"
          >
            <IoCallOutline className="w-5 h-5 text-gray-600" />
          </button> */}

          {/* Video Call Button */}
          {/* <button
            onClick={handleVideoCall}
            className="p-2.5 hover:bg-gray-100 rounded-full transition-colors"
            title="Video call"
          >
            <IoVideocamOutline className="w-5 h-5 text-gray-600" />
          </button> */}

          {/* Menu Button */}
          {/* <button
            onClick={handleMenu}
            className="p-2.5 hover:bg-gray-100 rounded-full transition-colors"
            title="More options"
          >
            <IoEllipsisVerticalOutline className="w-5 h-5 text-gray-600" />
          </button> */}
        </div>
      </div>

      {/* Optional: Typing Indicator */}
      <div className="px-4 pb-2">
        <div className="flex items-center space-x-2 text-sm text-blue-600">
          {/* Uncomment to show typing indicator */}
          {/* <div className="flex space-x-1">
            <div className="w-1 h-1 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
            <div className="w-1 h-1 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
            <div className="w-1 h-1 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
          </div>
          <span className="font-medium">typing...</span> */}
        </div>
      </div>
    </header>
  );
}

export default ChatNavigationBar;
