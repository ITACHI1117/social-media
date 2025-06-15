import { VscSend } from "react-icons/vsc";
import ChatNavigationBar from "../components/ChatNavigationBar";

function Chat() {
  const MyId = 22;
  const chat = [
    {
      id: 1,
      userid: 11,
      name: "John Doe",
      message: "Hello, how are you?",
      time: "10:00 AM",
    },
    {
      id: 2,
      userid: 22,
      name: "You",
      message: "I'm good, thanks!",
      time: "10:01 AM",
    },
    {
      id: 3,
      userid: 11,
      name: "John Doe",
      message: "What about you?",
      time: "10:02 AM",
    },
    {
      id: 4,
      userid: 22,
      name: "You",
      message: "I'm doing great!",
      time: "10:03 AM",
    },
    {
      id: 4,
      userid: 22,
      name: "You",
      message: "I'm doing great!",
      time: "10:03 AM",
    },
    {
      id: 4,
      userid: 22,
      name: "You",
      message: "I'm doing great!",
      time: "10:03 AM",
    },
    {
      id: 4,
      userid: 22,
      name: "You",
      message: "I'm doing great!",
      time: "10:03 AM",
    },
    {
      id: 4,
      userid: 22,
      name: "You",
      message: "I'm doing great!",
      time: "10:03 AM",
    },
    {
      id: 4,
      userid: 22,
      name: "You",
      message: "I'm doing great!",
      time: "10:03 AM",
    },
    {
      id: 4,
      userid: 22,
      name: "You",
      message: "I'm doing great!",
      time: "10:03 AM",
    },
    {
      id: 4,
      userid: 22,
      name: "You",
      message: "I'm doing great!",
      time: "10:03 AM",
    },
    {
      id: 4,
      userid: 22,
      name: "You",
      message: "I'm doing great!",
      time: "10:03 AM",
    },
    {
      id: 4,
      userid: 22,
      name: "You",
      message: "I'm doing great!",
      time: "10:03 AM",
    },
    {
      id: 4,
      userid: 22,
      name: "You",
      message: "I'm doing great!",
      time: "10:03 AM",
    },
    {
      id: 4,
      userid: 22,
      name: "You",
      message: "I'm doing great!",
      time: "10:03 AM",
    },
    {
      id: 4,
      userid: 22,
      name: "You",
      message: "I'm doing great!",
      time: "10:03 AM",
    },
  ];
  return (
    <>
      <section className="w-full bg-blue-100 h-[100vh] ">
        <ChatNavigationBar />
        <div className="flex flex-col  gap-3  p-3 h-[85vh] overflow-scroll overflow-y-scroll">
          {chat.map((item) => {
            return (
              <section key={item.id}>
                {item.userid != MyId ? (
                  <div className="flex gap-2">
                    <div className="bg-white p-2 rounded-lg shadow-md">
                      <h1 className="font-bold">{item.name}</h1>
                      <p>{item.message}</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-2 justify-end">
                    <div className="bg-blue-400 text-white p-2 rounded-lg shadow-md">
                      <h1 className="font-bold">{item.name}</h1>
                      <p>{item.message}</p>
                    </div>
                  </div>
                )}
              </section>
            );
          })}
          {/* <div className="flex gap-2">
            <div className="bg-white p-2 rounded-lg shadow-md">
              <h1 className="font-bold">John Doe</h1>
              <p>Hello, how are you?</p>
            </div>
          </div>
          <div className="flex gap-2 justify-end">
            <div className="bg-blue-400 text-white p-2 rounded-lg shadow-md">
              <h1 className="font-bold">You</h1>
              <p>I'm good, thanks!</p>
            </div>
          </div> */}
        </div>

        <div className="fixed bottom-0 p-3 w-full flex items-center px-3 bg-white gap-3">
          <div className="w-[90%] ">
            <input
              type="text"
              placeholder="Type here..."
              className="w-full outline-none"
            />
          </div>
          <div className="p-3 rounded-full bg-blue-400 text-white cursor-pointer">
            <VscSend />
          </div>
        </div>
      </section>
    </>
  );
}

export default Chat;
