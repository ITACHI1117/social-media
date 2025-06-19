import { VscSend } from "react-icons/vsc";
import {
  IoAttachOutline,
  IoMicOutline,
  IoHappyOutline,
  IoImageOutline,
} from "react-icons/io5";
import { HiOutlineDotsVertical } from "react-icons/hi";
import ChatNavigationBar from "../components/ChatNavigationBar";
import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router";
import { useGetUserById, useUser } from "../queries/userQueries";
import { SendMessage } from "../utils/sendMessage";
import { getChatID } from "../utils/getChatID";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../firebaseConfig";

function Chat() {
  const MyId = 22;
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [chat, setChats] = useState([]);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // get logged in user
  const { data: userData, isPending, isRefetchError, error } = useUser();

  // get user2 id from params
  let params = useParams();
  useEffect(() => {
    console.log(params.userId);
  }, [params]);

  // get user2 data by id
  const {
    data: user2Data,
    isSuccess,
    isError,
    error: user2Dataerror,
  } = useGetUserById(params.userId);

  // const chat = [
  //   {
  //     id: 1,
  //     userid: 11,
  //     name: "John Doe",
  //     message: "Hey! How's your day going?",
  //     time: "10:00 AM",
  //     status: "delivered",
  //   },
  //   {
  //     id: 2,
  //     userid: 22,
  //     name: "You",
  //     message:
  //       "It's going well, thanks for asking! Just finished my morning workout 💪",
  //     time: "10:01 AM",
  //     status: "read",
  //   },
  //   {
  //     id: 3,
  //     userid: 11,
  //     name: "John Doe",
  //     message: "That's awesome! I should probably start working out too 😅",
  //     time: "10:02 AM",
  //     status: "delivered",
  //   },
  //   {
  //     id: 4,
  //     userid: 22,
  //     name: "You",
  //     message: "You definitely should! Want to join me tomorrow?",
  //     time: "10:03 AM",
  //     status: "read",
  //   },
  //   {
  //     id: 5,
  //     userid: 11,
  //     name: "John Doe",
  //     message: "Sounds great! What time?",
  //     time: "10:04 AM",
  //     status: "delivered",
  //   },
  //   {
  //     id: 6,
  //     userid: 22,
  //     name: "You",
  //     message: "How about 7 AM? I know it's early but the gym is less crowded",
  //     time: "10:05 AM",
  //     status: "read",
  //   },
  //   {
  //     id: 7,
  //     userid: 11,
  //     name: "John Doe",
  //     message: "Perfect! See you there 👍",
  //     time: "10:06 AM",
  //     status: "delivered",
  //   },
  // ];

  // generate unique chat id
  const chatId = getChatID(userData.id, params.userId);

  useEffect(() => {
    // Firebase queries and function to get and send messages
    const q = query(
      collection(db, "chats", chatId, "messages"),
      orderBy("timestamp")
    );

    onSnapshot(q, (snapshot) => {
      const messages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setChats(messages);
      // console.log(messages);
    });
  }, [message]);

  // scroll doen to see latest messages FN
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [message]);

  // Send Message
  const handleSend = async (e) => {
    e.preventDefault();
    SendMessage(chatId, userData.id, params.userId, message);
    setMessage("");
    inputRef.current?.focus();
  };

  // const handleKeyPress = (e) => {
  //   if (e.key === "Enter" && !e.shiftKey) {
  //     e.preventDefault();
  //     handleSend();
  //   }
  // };

  const formatTime = (timeString) => {
    return timeString;
  };

  const groupMessagesByDate = (messages) => {
    const groups = [];
    let currentDate = null;
    let currentGroup = [];

    messages.forEach((msg) => {
      const msgDate = new Date().toDateString(); // Mock - use actual date from message

      if (msgDate !== currentDate) {
        if (currentGroup.length > 0) {
          groups.push({ date: currentDate, messages: currentGroup });
        }
        currentDate = msgDate;
        currentGroup = [msg];
      } else {
        currentGroup.push(msg);
      }
    });

    if (currentGroup.length > 0) {
      groups.push({ date: currentDate, messages: currentGroup });
    }

    return groups;
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Chat Header */}
      <ChatNavigationBar user2Data={user2Data} />

      {/* Messages Container */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto px-4 py-4 space-y-1">
          {/* Date Header */}
          <div className="flex justify-center mb-4">
            <div className="bg-gray-300 text-gray-700 text-xs font-medium px-3 py-1 rounded-full">
              Today
            </div>
          </div>

          {/* Messages */}
          {chat.map((item, index) => {
            const isMyMessage = item.senderId === userData.id;
            return (
              <div key={`${item.id}-${index}`} className="mb-2">
                <div
                  className={`flex ${
                    isMyMessage ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                      isMyMessage
                        ? "bg-blue-500 text-white rounded-br-md"
                        : "bg-white text-gray-800 rounded-bl-md shadow-sm"
                    }`}
                  >
                    <p className="text-sm leading-relaxed break-words">
                      {item.text}
                    </p>
                  </div>
                </div>

                {/* Message Time and Status */}
                {/* {showTime && (
                  <div
                    className={`flex items-center mt-1 ${
                      isMyMessage ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div className="flex items-center space-x-1">
                      <span className="text-xs text-gray-500">
                        {formatTime(item.time)}
                      </span>
                      {isMyMessage && (
                        <div className="flex space-x-0.5">
                          {item.status === "sent" && (
                            <div className="w-4 h-4 text-gray-400">
                              <svg viewBox="0 0 16 16" fill="currentColor">
                                <path d="M6 12L2 8l1.4-1.4L6 9.2l6.6-6.6L14 4l-8 8z" />
                              </svg>
                            </div>
                          )}
                          {item.status === "delivered" && (
                            <div className="w-4 h-4 text-gray-400">
                              <svg viewBox="0 0 16 16" fill="currentColor">
                                <path d="M6 12L2 8l1.4-1.4L6 9.2l6.6-6.6L14 4l-8 8z" />
                                <path d="M10.6 6L12 4.6L6 10.6L4.6 9.2" />
                              </svg>
                            </div>
                          )}
                          {item.status === "read" && (
                            <div className="w-4 h-4 text-blue-500">
                              <svg viewBox="0 0 16 16" fill="currentColor">
                                <path d="M6 12L2 8l1.4-1.4L6 9.2l6.6-6.6L14 4l-8 8z" />
                                <path d="M10.6 6L12 4.6L6 10.6L4.6 9.2" />
                              </svg>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )} */}
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start mb-4">
              <div className="bg-white text-gray-800 px-4 py-3 rounded-2xl rounded-bl-md shadow-sm">
                <div className="flex space-x-1">
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Input */}
      <div className="bg-white border-t border-gray-200 px-4 py-3">
        <div className="flex items-end space-x-3">
          {/* Attachment Button */}
          {/* <button className="p-2 text-gray-500 hover:text-blue-500 transition-colors">
            <IoAttachOutline className="w-6 h-6" />
          </button> */}

          {/* Message Input Container */}
          <div className="flex-1 bg-gray-100 rounded-2xl px-4 py-2 min-h-[44px] max-h-32">
            <div className="flex items-end space-x-2">
              <textarea
                ref={inputRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                // onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                className="flex-1 bg-transparent resize-none outline-none text-gray-800 placeholder-gray-500 py-2 max-h-20"
                rows="1"
                style={{
                  minHeight: "24px",
                  maxHeight: "80px",
                }}
                onInput={(e) => {
                  e.target.style.height = "auto";
                  e.target.style.height =
                    Math.min(e.target.scrollHeight, 80) + "px";
                }}
              />

              {/* Emoji Button */}
              {/* <button className="p-1 text-gray-500 hover:text-blue-500 transition-colors">
                <IoHappyOutline className="w-5 h-5" />
              </button> */}

              {/* Image Button */}
              {/* <button className="p-1 text-gray-500 hover:text-blue-500 transition-colors">
                <IoImageOutline className="w-5 h-5" />
              </button> */}
            </div>
          </div>

          {/* Send Message */}
          <button
            onClick={(e) => handleSend(e)}
            className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors shadow-lg"
          >
            <VscSend className="w-5 h-5" />
          </button>

          {/* Send/Voice Button */}
          {/* {message.trim() ? (
            <button
              onClick={handleSend}
              className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors shadow-lg"
            >
              <VscSend className="w-5 h-5" />
            </button>
          ) : (
            <button className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors shadow-lg">
              <IoMicOutline className="w-5 h-5" />
            </button>
          )} */}
        </div>
      </div>
    </div>
  );
}

export default Chat;
