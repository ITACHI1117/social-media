import React, { useEffect, useState } from "react";
import TopNavigationBar from "../components/TopNavigationBar";
import BottomNavigationBar from "../components/BottomNavigationBar";
import { useNavigate } from "react-router";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { IoEllipsisVerticalOutline } from "react-icons/io5";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useUser } from "../queries/userQueries";
import { db } from "../../firebaseConfig";
import ChatCard from "../components/ChatCard";

function ChatsList() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [chats, setChats] = useState([]);
  const [loadingChats, setLoadingChats] = useState(true);
  const [chatError, setChatError] = useState(null);

  const {
    data: userData,
    isSuccess,
    isPending: loadingUser,
    isError,
    error,
  } = useUser();

  useEffect(() => {
    if (isSuccess && userData?.id) {
      try {
        const q = query(
          collection(db, "chats"),
          where("participants", "array-contains", userData.id)
        );

        const unsubscribe = onSnapshot(
          q,
          (snapshot) => {
            const chatData = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setChats(chatData);
            setLoadingChats(false);
          },
          (err) => {
            console.error("Error fetching chats:", err.message);
            setChatError("Failed to load chats. Please try again later.");
            setLoadingChats(false);
          }
        );

        return () => unsubscribe();
      } catch (err) {
        console.error("Unexpected error:", err.message);
        setChatError("An unexpected error occurred.");
        setLoadingChats(false);
      }
    }
  }, [isSuccess, userData]);

  const handleChat = (chatId) => navigate(`/chat/${chatId}`);
  // const handleNewChat = () => navigate("/new-chat");

  const filteredChats = chats.filter((chat) =>
    chat.participants.some((p) =>
      p.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const showEmpty =
    !loadingChats &&
    !chatError &&
    filteredChats.length === 0 &&
    searchQuery === "";

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <TopNavigationBar />

      {/* Header Section */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
          <div className="flex items-center space-x-2">
            {/* <button
              onClick={handleNewChat}
              className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors shadow-sm"
            >
              <HiOutlinePencilAlt className="w-5 h-5" />
            </button> */}
            {/* <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <IoEllipsisVerticalOutline className="w-5 h-5 text-gray-600" />
            </button> */}
          </div>
        </div>
      </div>

      {/* Main Chat Section */}
      <div className="flex-1 overflow-y-auto bg-white">
        {loadingUser || loadingChats ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-500">Loading chats...</p>
          </div>
        ) : isError ? (
          <div className="flex items-center justify-center h-64 px-4 text-center text-red-500">
            <p>{error?.message || "Something went wrong loading user data."}</p>
          </div>
        ) : chatError ? (
          <div className="flex items-center justify-center h-64 px-4 text-center text-red-500">
            <p>{chatError}</p>
          </div>
        ) : showEmpty ? (
          <div className="flex flex-col items-center justify-center h-64 px-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No conversations found
            </h3>
            <p className="text-gray-500 text-center mb-4">
              Start a new conversation to get chatting!
            </p>
            <button
              onClick={handleNewChat}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Start New Chat
            </button>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredChats.map((chat) => (
              <ChatCard
                key={chat.id}
                chat={chat}
                handleChat={handleChat}
                searchQuery={searchQuery}
              />
            ))}
          </div>
        )}
      </div>

      {/* Bottom Actions */}
      {filteredChats.length > 0 && (
        <div className="bg-white border-t border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">
              {filteredChats.length} conversation
              {filteredChats.length !== 1 ? "s" : ""}
            </span>
            <div className="flex items-center space-x-4">
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                Mark all as read
              </button>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                Archive
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNavigationBar />
    </div>
  );
}

export default ChatsList;
