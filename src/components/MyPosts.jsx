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
import { useNavigate } from "react-router";
import { useMyPosts, usePosts, useUser } from "../queries/userQueries";
import { useState } from "react";

function MyPosts() {
  const {
    data: myPosts,
    isError: postErrors,
    isSuccess: postSuccess,
  } = usePosts();

  const [likedPosts, setLikedPosts] = useState(new Set());
  const navigate = useNavigate();

  const handleReply = (postId) => {
    navigate(`/chat/${postId}`);
  };

  const handleLike = (postId) => {
    setLikedPosts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const formatTimeAgo = (date) => {
    // Mock time ago function - replace with actual implementation
    return "2h ago";
  };

  if (!postSuccess) {
    return (
      <section className="w-full p-4 space-y-4">
        {/* Loading skeleton */}
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 animate-pulse"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/6"></div>
              </div>
            </div>
            <div className="h-64 bg-gray-200 rounded-lg mb-3"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        ))}
      </section>
    );
  }

  if (!myPosts || myPosts.length === 0) {
    return (
      <section className="w-full p-4 flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-12 h-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No posts yet
          </h3>
          <p className="text-gray-500 mb-4">
            Be the first to share something amazing!
          </p>
          <button
            onClick={() => navigate("/new-post")}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Create Post
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full pb-20 bg-gray-50 min-h-screen">
      <div className="max-w-2xl mx-auto px-4 py-4 space-y-6">
        {myPosts.map((post) => {
          const isLiked = likedPosts.has(post.id);

          return (
            <article
              key={post.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200"
            >
              {/* Post Header */}
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <img
                      src={post.userProfileImage || profileImg}
                      alt="Profile"
                      className="w-10 h-10 rounded-full object-cover border-2 border-gray-100"
                    />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">
                      {post.userName || "Jeremy Dane"}
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
                    <button
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
                    </button>

                    {/* Comment Button */}
                    <button
                      onClick={() => handleReply(post.id)}
                      className="flex items-center space-x-1 hover:bg-gray-100 rounded-full p-2 transition-colors group"
                    >
                      <IoChatbubblesOutline className="w-6 h-6 text-gray-600 group-hover:text-blue-500 transition-colors" />
                      <span className="text-sm text-gray-600">
                        {post.commentsCount || 0}
                      </span>
                    </button>

                    {/* Share Button */}
                    <button className="flex items-center space-x-1 hover:bg-gray-100 rounded-full p-2 transition-colors group">
                      <IoShareOutline className="w-6 h-6 text-gray-600 group-hover:text-green-500 transition-colors" />
                    </button>
                  </div>

                  {/* Bookmark Button */}
                  <button className="hover:bg-gray-100 rounded-full p-2 transition-colors">
                    <IoBookmarkOutline className="w-6 h-6 text-gray-600 hover:text-yellow-500 transition-colors" />
                  </button>
                </div>

                {/* Like Count and Comments Preview */}
                {(post.likesCount > 0 || post.commentsCount > 0) && (
                  <div className="space-y-1">
                    {post.likesCount > 0 && (
                      <p className="text-sm font-semibold text-gray-900">
                        {post.likesCount}{" "}
                        {post.likesCount === 1 ? "like" : "likes"}
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
          );
        })}
      </div>
    </section>
  );
}

export default MyPosts;
