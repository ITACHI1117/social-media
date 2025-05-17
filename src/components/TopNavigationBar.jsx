import profileImg from "../assets/manImage.jpg";
import { useNavigate } from "react-router";

function TopNavigationBar() {
  let navigate = useNavigate();

  const handleClick = () => {
    navigate("/profile");
  };
  return (
    <section className="sticky top-0 bg-white w-full h-[10%]  border-b border-blue-100">
      <div
        onClick={handleClick}
        className="flex items-center gap-2 p-2 w-[50%] cursor-pointer"
      >
        <img
          src={profileImg}
          alt=""
          className="w-[60px] h-[60px] object-cover rounded-full  border-blue-400 border-3"
        />
        <h1 className="font-bold">John Doe</h1>
      </div>
    </section>
  );
}

export default TopNavigationBar;
