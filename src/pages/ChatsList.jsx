import React from "react";
import TopNavigationBar from "../components/TopNavigationBar";
import BottomNavigationBar from "../components/BottomNavigationBar";
import profileImg from "../assets/student.jpg";
import { useNavigate } from "react-router";

function ChatsList() {
  let navigate = useNavigate();
  const dummyChat = [1, 2, 3, 4, 5];
  const handelChat = () => {
    navigate("/chat");
  };
  return (
    <>
      {/* navigation bar */}
      <TopNavigationBar />
      <section>
        <div className=" py-2">
          <h1 className="p-4 py-2 font-bold text-2xl">Chats</h1>
          {dummyChat.map((item) => {
            return (
              <div
                onClick={handelChat}
                className="flex items-center gap-2 p-2  cursor-pointer border-y-1 border-blue-200 w-full"
              >
                <img
                  src={profileImg}
                  alt=""
                  className="w-[60px] h-[60px] object-cover rounded-full "
                />
                <div>
                  <h1 className="font-bold">John Doe</h1>
                  <p className="text-sm">What's good bro</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <BottomNavigationBar />
    </>
  );
}

export default ChatsList;
