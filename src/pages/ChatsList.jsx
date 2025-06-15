import React, { useState } from "react";
import TopNavigationBar from "../components/TopNavigationBar";
import BottomNavigationBar from "../components/BottomNavigationBar";
import profileImg from "../assets/student.jpg";
import { useNavigate } from "react-router";
import { IoSearchOutline, IoEllipsisVerticalOutline } from "react-icons/io5";
import { HiOutlinePencilAlt } from "react-icons/hi";

function ChatsList() {
  let navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // Mock chat data with more realistic information
  const chats = [
    {
      id: 1,
      name: "Jeremy Dane",
      lastMessage: "Hey! Are you coming to the study group today?",
      timestamp: "2m ago",
      unreadCount: 3,
      isOnline: true,
      avatar: profileImg,
      isTyping: false,
    },
    {
      id: 2,
      name: "Sarah Wilson",
      lastMessage: "Thanks for sharing the notes! 📚",
      timestamp: "15m ago",
      unreadCount: 0,
      isOnline: true,
      avatar: profileImg,
      isTyping: false,
    },
    {
      id: 3,
      name: "Mike Johnson",
      lastMessage: "You: See you tomorrow at the lab",
      timestamp: "1h ago",
      unreadCount: 0,
      isOnline: false,
      avatar: profileImg,
      isTyping: false,
    },
    {
      id: 4,
      name: "Emma Davis",
      lastMessage: "Can you help me with the assignment?",
      timestamp: "2h ago",
      unreadCount: 1,
      isOnline: false,
      avatar: profileImg,
      isTyping: true,
    },
    {
      id: 5,
      name: "Alex Turner",
      lastMessage: "Great presentation today! 👏",
      timestamp: "Yesterday",
      unreadCount: 0,
      isOnline: false,
      avatar: profileImg,
      isTyping: false,
    },
  ];

  const handleChat = (chatId) => {
    navigate(`/chat/`);
  };

  const handleNewChat = () => {
    navigate("/new-chat");
  };

  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatLastMessage = (message, isOwn = false) => {
    if (isOwn) return message;
    return message.length > 50 ? `${message.substring(0, 50)}...` : message;
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Top Navigation */}
      <TopNavigationBar />

      {/* Header Section */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleNewChat}
              className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors shadow-sm"
            >
              <HiOutlinePencilAlt className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <IoEllipsisVerticalOutline className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <IoSearchOutline className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-100 border-0 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
          />
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto bg-white">
        {filteredChats.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {filteredChats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => handleChat(chat.id)}
                className="flex items-center px-4 py-4 hover:bg-gray-50 cursor-pointer transition-colors active:bg-gray-100"
              >
                {/* Avatar */}
                <div className="relative flex-shrink-0 mr-3">
                  <img
                    src={chat.avatar}
                    alt={chat.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-gray-100"
                  />
                  {/* Online Status */}
                  {chat.isOnline && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                </div>

                {/* Chat Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-semibold text-gray-900 truncate">
                      {chat.name}
                    </h3>
                    <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                      {chat.timestamp}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center flex-1 min-w-0">
                      {chat.isTyping ? (
                        <div className="flex items-center text-blue-600">
                          <div className="flex space-x-1 mr-2">
                            <div
                              className="w-1 h-1 bg-blue-600 rounded-full animate-bounce"
                              style={{ animationDelay: "0ms" }}
                            ></div>
                            <div
                              className="w-1 h-1 bg-blue-600 rounded-full animate-bounce"
                              style={{ animationDelay: "150ms" }}
                            ></div>
                            <div
                              className="w-1 h-1 bg-blue-600 rounded-full animate-bounce"
                              style={{ animationDelay: "300ms" }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">typing...</span>
                        </div>
                      ) : (
                        <p
                          className={`text-sm truncate ${
                            chat.unreadCount > 0
                              ? "text-gray-900 font-medium"
                              : "text-gray-600"
                          }`}
                        >
                          {formatLastMessage(
                            chat.lastMessage,
                            chat.lastMessage.startsWith("You:")
                          )}
                        </p>
                      )}
                    </div>

                    {/* Unread Badge */}
                    {chat.unreadCount > 0 && (
                      <div className="flex-shrink-0 ml-2">
                        <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-blue-600 rounded-full">
                          {chat.unreadCount > 9 ? "9+" : chat.unreadCount}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Empty State
          <div className="flex flex-col items-center justify-center h-64 px-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No conversations found
            </h3>
            <p className="text-gray-500 text-center mb-4">
              {searchQuery
                ? "Try adjusting your search"
                : "Start a new conversation to get chatting!"}
            </p>
            {!searchQuery && (
              <button
                onClick={handleNewChat}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Start New Chat
              </button>
            )}
          </div>
        )}
      </div>

      {/* Quick Actions */}
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

      {/* Bottom Navigation */}
      <BottomNavigationBar />
    </div>
  );
}

export default ChatsList;
