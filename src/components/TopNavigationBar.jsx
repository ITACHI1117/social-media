import { useNavigate } from "react-router";
import profileImg from "../assets/manImage.jpg";
import { useUser } from "../queries/userQueries";
import { useEffect } from "react";

function TopNavigationBar() {
  let navigate = useNavigate();

  const { data: userProfileData, isSuccess } = useUser();

  // useEffect(() => {
  //   mutate();
  // }, [isSuccess]);

  const handleClick = () => {
    navigate("/profile");
  };
  return (
    <section className="sticky top-0 bg-white w-full h-[10%]  border-b border-blue-100">
      <div
        onClick={handleClick}
        className="flex items-center gap-2 p-2 w-[50%] cursor-pointer"
      >
        {isSuccess ? (
          <img
            src={userProfileData.profileImageUrl}
            alt=""
            className="w-[60px] h-[60px] object-cover rounded-full  border-blue-400 border-3"
          />
        ) : (
          <div
            alt=""
            className="w-[60px] h-[60px] object-cover rounded-full  border-blue-400 border-3"
          ></div>
        )}

        <h1 className="font-bold">{isSuccess && userProfileData.firstname}</h1>
      </div>
    </section>
  );
}

export default TopNavigationBar;
