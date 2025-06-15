import { CiCirclePlus } from "react-icons/ci";
import { GoHome } from "react-icons/go";
import { IoChatbubblesOutline } from "react-icons/io5";
import { Link } from "react-router";

function BottomNavigationBar() {
  return (
    <div className="fixed w-full bottom-0 h-[50px] bg-blue-400">
      <div className="flex justify-between h-full p-2 items-center">
        <Link to={"/home"}>
          <GoHome className="text-2xl text-white" />
        </Link>
        <Link to={"/new-post"}>
          <CiCirclePlus className="text-2xl text-white" />
        </Link>
        <Link to={"/chats"}>
          <IoChatbubblesOutline className="text-2xl text-white" />
        </Link>
      </div>
    </div>
  );
}

export default BottomNavigationBar;
