import { useNavigate } from "react-router";
import profileImg from "../assets/manImage.jpg";
import { useUser } from "../queries/userQueries";
import { useEffect } from "react";

function TopNavigationBar() {
  let navigate = useNavigate();

  const { data: userProfileData, isSuccess } = useUser();

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleNotificationClick = () => {
    navigate("/notifications");
  };

  const handleSearchClick = () => {
    navigate("/search");
  };

  return (
    <header className="sticky top-0 bg-white w-full z-40 border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left Side - Profile Section */}
        <div
          onClick={handleProfileClick}
          className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 rounded-lg p-2 transition-colors min-w-0 flex-1"
        >
          {/* Profile Image */}
          <div className="relative flex-shrink-0">
            {isSuccess && userProfileData?.profileImageUrl ? (
              <img
                src={userProfileData.profileImageUrl}
                alt="Profile"
                className="w-10 h-10 object-cover rounded-full border-2 border-blue-400 shadow-sm"
              />
            ) : (
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center border-2 border-blue-400 shadow-sm">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
            )}
            {/* Online Status Indicator */}
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
          </div>

          {/* User Info */}
          <div className="flex flex-col min-w-0 flex-1">
            {isSuccess && userProfileData?.firstname ? (
              <>
                <span className="font-semibold text-gray-900 text-sm truncate">
                  Hello, {userProfileData.firstname}
                </span>
                <span className="text-xs text-gray-500 truncate">
                  Welcome back
                </span>
              </>
            ) : (
              <>
                <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-3 w-16 bg-gray-200 rounded animate-pulse mt-1"></div>
              </>
            )}
          </div>

          {/* Chevron Icon */}
          <svg
            className="w-4 h-4 text-gray-400 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>

        {/* Right Side - Action Buttons */}
        <div className="flex items-center gap-2 ml-2">
          {/* Search Button */}
          {/* <button
            onClick={handleSearchClick}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors relative"
            title="Search"
          >
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button> */}

          {/* Notifications Button */}
          {/* <button
            onClick={handleNotificationClick}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors relative"
            title="Notifications"
          >
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg> */}
          {/* Notification Badge */}
          {/* <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-bold">3</span>
            </div>
          </button> */}

          {/* Menu Button */}
          {/* <button
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            title="Menu"
          >
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button> */}
        </div>
      </div>
    </header>
  );
}

export default TopNavigationBar;
