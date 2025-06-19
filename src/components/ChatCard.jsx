import React from "react";
import { formatRelativeDate } from "../utils/dateTimeFormats";
import { useGetUserById } from "../queries/userQueries";
import profileImg from "../assets/student.jpg"; // fallback profile image

function ChatCard({ chat, handleChat }) {
  const {
    data: chatUserData,
    isSuccess,
    isPending,
    isError,
    error,
  } = useGetUserById(chat.participants[1]);

  const formatLastMessage = (message, isOwn = false) => {
    if (isOwn) return message;
    return message.length > 50 ? `${message.substring(0, 50)}...` : message;
  };

  // Handle loading state
  if (isPending) {
    return (
      <div className="flex items-center px-4 py-4 animate-pulse">
        <div className="w-12 h-12 rounded-full bg-gray-200 mr-3"></div>
        <div className="flex-1 space-y-2">
          <div className="w-1/3 h-3 bg-gray-200 rounded"></div>
          <div className="w-2/3 h-3 bg-gray-100 rounded"></div>
        </div>
      </div>
    );
  }

  // Handle error state
  if (isError || !chatUserData) {
    console.error("Failed to load chat user data:", error);
    return null; // Or render a placeholder/error card
  }

  return (
    <div
      key={chat.id}
      onClick={() => handleChat(chatUserData.id)}
      className="flex items-center px-4 py-4 hover:bg-gray-50 cursor-pointer transition-colors active:bg-gray-100"
    >
      {/* Avatar */}
      <div className="relative flex-shrink-0 mr-3">
        <img
          src={chatUserData.profileImageUrl || profileImg}
          alt={chatUserData.firstname || "User"}
          className="w-12 h-12 rounded-full object-cover border-2 border-gray-100"
        />
      </div>

      {/* Chat Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-sm font-semibold text-gray-900 truncate">
            {chatUserData.firstname} {chatUserData.lastname}
          </h3>
          <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
            {chat.updatedAt?.toDate
              ? formatRelativeDate(chat.updatedAt.toDate())
              : ""}
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
                  chat.lastMessage || "",
                  chat.lastMessage?.startsWith("You:")
                )}
              </p>
            )}
          </div>

          {/* Unread Badge (Optional) */}
          {/* {chat.unreadCount > 0 && (
            <div className="flex-shrink-0 ml-2">
              <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-blue-600 rounded-full">
                {chat.unreadCount > 9 ? "9+" : chat.unreadCount}
              </span>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
}

export default ChatCard;
