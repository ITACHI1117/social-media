import { useNavigate } from "react-router";
import profileImg from "../assets/manImage.jpg";
import { IoChevronBack } from "react-icons/io5";

function ChatNavigationBar() {
  let navigate = useNavigate();

  const handleClick = () => {
    navigate("/profile");
  };
  const goBack = () => {
    navigate(-1);
  };
  return (
    <section className="sticky top-0 bg-white w-full h-[8%]  border-b border-blue-100">
      <div className="flex items-center gap-2 p-2 w-[50%] cursor-pointer">
        <IoChevronBack onClick={goBack} className="text-2xl mr-2" />
        <img
          onClick={handleClick}
          src={profileImg}
          alt=""
          className="w-[60px] h-[60px] object-cover rounded-full  border-blue-400 border-3"
        />
        <h1 onClick={handleClick} className="font-bold">
          John Doe
        </h1>
      </div>
    </section>
  );
}

export default ChatNavigationBar;
