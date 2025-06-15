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
  return (
    <>
      {!userData ? (
        <h1>Loading</h1>
      ) : (
        <section className="w-full h-full bg-white">
          <div className="mb-3">
            {/* bg-img */}
            <img src={food} alt="" className="w-full h-[200px] object-cover" />
            {/* profile-img */}
            <div className="">
              <img
                src={userData.profileImageUrl}
                alt=""
                className="rounded-full  w-[80px] h-[80px] object-cover border-4 border-blue-400 absolute -mt-5 ml-3  shadow-lg"
              />
            </div>
            <div className="ml-25  flex items-center justify-between pr-5">
              <div>
                <h1 className=" font-bold text-xl">
                  {userData.firstname} {userData.lastname}
                </h1>
                <h1 className=" text-blue-400  text-sm">{userData.email}</h1>
              </div>
              <button
                onClick={handleLogout}
                className="bg-blue-400 rounded p-1 text-white px-4"
              >
                Log out
              </button>
            </div>
          </div>
          <div className="p-3 border-b border-blue-300">
            <h1 className="font-bold">Posts</h1>
          </div>
          <MyPosts />
          <BottomNavigationBar />
        </section>
      )}
    </>
  );
}

export default Profile;
