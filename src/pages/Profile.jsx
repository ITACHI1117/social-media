import profileImg from "../assets/manImage.jpg";
import food from "../assets/food.jpg";
import BottomNavigationBar from "../components/BottomNavigationBar";
import Posts from "../components/Posts";
import { useMyPosts, useUser } from "../queries/userQueries";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import MyPosts from "../components/MyPosts";

function Profile() {
  let navigate = useNavigate();
  const {
    data: userData,
    isError: userError,
    isSuccess: userSuccess,
  } = useUser();

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  const handleLogout = () => {
    localStorage.clear("accessToken");
    localStorage.clear("refreshToken");
    navigate("/");
  };

  const handleEditProfile = () => {
    navigate("/edit-profile"); // Navigate to edit profile page
  };

  return (
    <>
      {!userData ? (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <h1 className="text-gray-600 text-lg">Loading...</h1>
          </div>
        </div>
      ) : (
        <section className="w-full min-h-screen bg-gray-50">
          {/* Header Section */}
          <div className="relative bg-white shadow-sm">
            {/* Cover Image */}
            <div className="relative">
              <img
                src={food}
                alt="Cover"
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>

            {/* Profile Section */}
            <div className="relative px-4 pb-6">
              {/* Profile Image */}
              <div className="flex justify-between items-start -mt-12 mb-4">
                <div className="relative">
                  <img
                    src={userData.profileImageUrl}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg bg-white"
                  />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-2 border-white rounded-full"></div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 mt-12">
                  <button
                    onClick={handleEditProfile}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium text-sm shadow-sm"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    Edit Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm border"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    Logout
                  </button>
                </div>
              </div>

              {/* User Info */}
              <div className="space-y-2">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {userData.firstname} {userData.lastname}
                  </h1>
                  <p className="text-blue-500 text-sm font-medium">
                    {userData.email}
                  </p>
                </div>

                {/* Stats */}
                {/* <div className="flex gap-6 pt-3">
                  <div className="text-center">
                    <div className="text-xl font-bold text-gray-900">42</div>
                    <div className="text-xs text-gray-500 font-medium">
                      Posts
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-gray-900">1.2K</div>
                    <div className="text-xs text-gray-500 font-medium">
                      Followers
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-gray-900">328</div>
                    <div className="text-xs text-gray-500 font-medium">
                      Following
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>

          {/* Posts Section */}
          <div className="mt-4 bg-white">
            <div className="px-4 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900">My Posts</h2>
                <div className="flex gap-2">
                  {/* <button className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
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
                        d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                      />
                    </svg>
                  </button>
                  <button className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
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
                        d="M4 6h16M4 10h16M4 14h16M4 18h16"
                      />
                    </svg>
                  </button> */}
                </div>
              </div>
            </div>

            <div className="pb-20">
              <MyPosts />
            </div>
          </div>

          <BottomNavigationBar />
        </section>
      )}
    </>
  );
}

export default Profile;
