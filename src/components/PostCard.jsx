import React from "react";
import profileImg from "../assets/student.jpg";
import food from "../assets/food.jpg";
import {
  IoChatbubblesOutline,
  IoHeartOutline,
  IoHeart,
  IoShareOutline,
  IoBookmarkOutline,
} from "react-icons/io5";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

import { useGetUserById } from "../queries/userQueries";
import { useNavigate } from "react-router";

function PostCard({ post }) {
  const {
    data: userData,
    isSuccess,
    isError,
    error,
  } = useGetUserById(post.userId);

  const navigate = useNavigate();

  const handleReply = (userId) => {
    navigate(`/chat/${userId}`);
  };

  const formatTimeAgo = (date) => {
    // Mock time ago function - replace with actual implementation
    return "2h ago";
  };
  return (
    <>
      {isSuccess ? (
        <article
          key={post.id}
          className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200"
        >
          {/* Post Header */}
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img
                  src={isSuccess ? userData.profileImageUrl : profileImg}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover border-2 border-gray-100"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">
                  {userData.firstname} {userData.lastname}
                </h3>
                <p className="text-xs text-gray-500">
                  {formatTimeAgo(post.createdAt)}
                </p>
              </div>
            </div>

            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <HiOutlineDotsHorizontal className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Post Content */}
          {post.caption && (
            <div className="px-4 pb-3">
              <p className="text-gray-800 text-sm leading-relaxed">
                {post.caption}
              </p>
            </div>
          )}

          {/* Post Images */}
          {post.imageUrls && post.imageUrls.length > 0 && (
            <div
              className={`${
                post.imageUrls.length === 1
                  ? "aspect-square"
                  : post.imageUrls.length === 2
                  ? "grid grid-cols-2 gap-1"
                  : post.imageUrls.length === 3
                  ? "grid grid-cols-2 gap-1"
                  : "grid grid-cols-2 gap-1"
              }`}
            >
              {post.imageUrls.slice(0, 4).map((image, index) => (
                <div
                  key={image}
                  className={`relative overflow-hidden ${
                    post.imageUrls.length === 3 && index === 0
                      ? "row-span-2"
                      : ""
                  } ${
                    post.imageUrls.length === 1
                      ? "aspect-square"
                      : "aspect-square"
                  }`}
                >
                  <img
                    src={image}
                    alt={`Post image ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                    onClick={() => {
                      /* Handle image modal */
                    }}
                  />
                  {/* Show +N more overlay for 4+ images */}
                  {post.imageUrls.length > 4 && index === 3 && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <span className="text-white font-semibold text-lg">
                        +{post.imageUrls.length - 4}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Post Actions */}
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-4">
                {/* Like Button */}
                {/* <button
                      onClick={() => handleLike(post.id)}
                      className="flex items-center space-x-1 hover:bg-gray-100 rounded-full p-2 transition-colors group"
                    >
                      {isLiked ? (
                        <IoHeart className="w-6 h-6 text-red-500" />
                      ) : (
                        <IoHeartOutline className="w-6 h-6 text-gray-600 group-hover:text-red-500 transition-colors" />
                      )}
                      <span className="text-sm text-gray-600">
                        {post.likesCount || 0}
                      </span>
                    </button> */}

                {/* Comment Button */}
                <button
                  onClick={() => handleReply(post.userId)}
                  className="flex items-center space-x-1 hover:bg-gray-100 rounded-full p-2 transition-colors group"
                >
                  <IoChatbubblesOutline className="w-6 h-6 text-gray-600 group-hover:text-blue-500 transition-colors" />
                  <span className="text-sm text-gray-600">
                    Message {userData.firstname}
                    {/* {post.commentsCount || 0} */}
                  </span>
                </button>

                {/* Share Button */}
                {/* <button className="flex items-center space-x-1 hover:bg-gray-100 rounded-full p-2 transition-colors group">
                      <IoShareOutline className="w-6 h-6 text-gray-600 group-hover:text-green-500 transition-colors" />
                    </button> */}
              </div>

              {/* Bookmark Button */}
              {/* <button className="hover:bg-gray-100 rounded-full p-2 transition-colors">
                    <IoBookmarkOutline className="w-6 h-6 text-gray-600 hover:text-yellow-500 transition-colors" />
                  </button> */}
            </div>

            {/* Like Count and Comments Preview */}
            {(post.likesCount > 0 || post.commentsCount > 0) && (
              <div className="space-y-1">
                {post.likesCount > 0 && (
                  <p className="text-sm font-semibold text-gray-900">
                    {post.likesCount} {post.likesCount === 1 ? "like" : "likes"}
                  </p>
                )}

                {post.commentsCount > 0 && (
                  <button
                    onClick={() => handleReply(post.id)}
                    className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    View all {post.commentsCount} comments
                  </button>
                )}
              </div>
            )}
          </div>
        </article>
      ) : (
        " "
      )}
    </>
  );
}

export default PostCard;
