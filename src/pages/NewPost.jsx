import profileImg from "../assets/manImage.jpg";
import food from "../assets/food.jpg";
import { IoChatbubblesOutline } from "react-icons/io5";
import { VscSend } from "react-icons/vsc";
import { useEffect, useRef, useState } from "react";
import { LuImagePlus, LuX } from "react-icons/lu";
import { IoChevronBackOutline, IoCloseOutline } from "react-icons/io5";
import { HiOutlinePhotograph } from "react-icons/hi";
import { useNavigate } from "react-router";
import {
  useDeleteImage,
  useNewPost,
  useUploadImage,
  useUploadMultipleImages,
  useUser,
} from "../queries/userQueries";
import { toast } from "react-toastify";

function NewPost() {
  const [content, setContent] = useState("");
  const [addedImg, setAddedImg] = useState(false);
  const [uploadedImg, setUploadedImg] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const imgInputRef = useRef(null);
  const textareaRef = useRef(null);
  let navigate = useNavigate();

  const handleImgSelect = () => {
    imgInputRef.current.click();
  };

  const handleImgChange = (e) => {
    const imgs = Array.from(e.target.files);
    if (imgs.length > 0) {
      console.log(imgs);
      setAddedImg(true);
      setUploadedImg((previousImgs) => [...previousImgs, ...imgs]);
      const previews = imgs.map((img) => URL.createObjectURL(img));
      setImagePreview((previousPreviews) => [...previousPreviews, ...previews]);
    }
  };

  const handleRemoveImage = (index) => {
    setUploadedImg((prev) => prev.filter((_, i) => i !== index));
    setImagePreview((prev) => prev.filter((_, i) => i !== index));

    console.log(uploadedImg);
    console.log(imagePreview.length);
  };

  useEffect(() => {
    if (imagePreview.length < 1) {
      setAddedImg(false);
    }
  });

  // New post query
  const {
    mutate: mutatePost,
    isPending: isPostPending,
    isSuccess: isPostSuccess,
    isError: isPostError,
    error: postError,
  } = useNewPost();

  // upload image query
  const { mutate, data, isPending, isSuccess, isError, error } =
    useUploadImage();
  // upload multiple image query
  const {
    mutate: uploadMoreThanOneImage,
    data: uploadMoreThanOneImageResponse,
    isPending: isImagesUploading,
    isSuccess: isImagesUploadSuccess,
    isSuccess: isImagesUploadError,
    error: imagesUploadError,
  } = useUploadMultipleImages();

  // Delete image query
  const {
    mutateAsync: deleteImage,
    data: deletedResponse,
    isPending: isDeletePending,
    isSuccess: isDeleted,
    error: isDeleteError,
  } = useDeleteImage();

  // user query
  const { data: userData, isSuccess: isUser } = useUser();

  // Upload Image to cloud
  const Submit = async () => {
    if (content.length === 0) {
      toast.error("Please add some content to your post");
      return;
    }

    if (uploadedImg && content.length > 0) {
      const imageFormData = new FormData();
      try {
        // Upload image first
        if (uploadedImg.length > 1) {
          uploadedImg.forEach((file) => {
            imageFormData.append("Files", file);
          });
          uploadMoreThanOneImage(imageFormData);
        } else {
          uploadedImg.forEach((file) => {
            imageFormData.append("File", file);
          });
          mutate(imageFormData);
        }
      } catch (error) {
        console.log("Image upload failed:", error);
        toast.error("Failed to upload image");
      }
    }
  };

  // append form data and Post
  useEffect(() => {
    if (isSuccess || isImagesUploadSuccess) {
      const formData = new FormData();
      formData.append("Caption", content);
      uploadedImg.forEach((file) => {
        formData.append("Images", file);
      });
      mutatePost(formData);
      navigate("/home");
    }
  }, [isSuccess, isImagesUploadSuccess]);

  useEffect(() => {
    if (isPostSuccess) {
      toast.success("Post created successfully!", {
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/home");
    }
    if (isPostError) {
      toast.error("Error creating post", {
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log(isPostError);
      if (data?.publicId) {
        deleteImage(data.publicId);
      }
    }

    (isError || isImagesUploadError) &&
      toast.error("Error uploading image", {
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

    console.log(error);
    console.log(isError);
  }, [isPostSuccess, isPostError, isError, isImagesUploadError]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [content]);

  const isLoading = isPending || isPostPending || isImagesUploading;
  const canPost = content.trim().length > 0;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <IoChevronBackOutline className="text-xl text-gray-700" />
          </button>

          <h1 className="text-lg font-semibold text-gray-900">Create Post</h1>

          <button
            onClick={Submit}
            disabled={!canPost || isLoading}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
              canPost && !isLoading
                ? "bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Posting...</span>
              </div>
            ) : (
              "Post"
            )}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4">
        <div className="max-w-2xl mx-auto">
          {/* User Info */}
          <div className="flex items-center space-x-3 mb-6">
            {isUser && userData?.profileImageUrl ? (
              <img
                src={userData.profileImageUrl}
                alt="Profile"
                className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
              />
            ) : (
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
            )}
            <div>
              <h3 className="font-semibold text-gray-900">
                {isUser && userData
                  ? `${userData.firstname} ${userData.lastname}`
                  : "User"}
              </h3>
              <p className="text-sm text-gray-500">Share your thoughts...</p>
            </div>
          </div>

          {/* Post Content */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            {/* Text Content */}
            <div className="p-4">
              <textarea
                ref={textareaRef}
                placeholder="What's on your mind?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full resize-none border-none outline-none text-gray-900 placeholder-gray-500 text-lg leading-relaxed min-h-32 max-h-64"
                style={{ height: "auto" }}
              />
            </div>

            {/* Image Preview */}
            <div className="grid grid-cols-2 gap-0 mt-4">
              {addedImg &&
                imagePreview &&
                imagePreview.map((imagePreview, index) => {
                  return (
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-3 right-3 p-2 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full transition-all"
                      >
                        <IoCloseOutline className="w-5 h-5 text-white" />
                      </button>
                    </div>
                  );
                })}
            </div>

            {/* Image Upload Area */}
            {!addedImg && (
              <div
                onClick={handleImgSelect}
                className="border-t border-gray-200 p-8 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <HiOutlinePhotograph className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-medium text-gray-900 mb-1">Add photos</h3>
                  <p className="text-sm text-gray-500">
                    Upload images to make your post more engaging
                  </p>
                </div>
              </div>
            )}

            {/* Hidden File Input */}
            <input
              type="file"
              accept="image/*"
              multiple
              ref={imgInputRef}
              className="hidden"
              onChange={handleImgChange}
            />
          </div>

          {/* Post Options */}
          <div className="mt-6 bg-white rounded-xl border border-gray-200 p-4">
            <h4 className="font-medium text-gray-900 mb-3">Add to your post</h4>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleImgSelect}
                className="flex items-center space-x-2 px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <HiOutlinePhotograph className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-gray-700">Photo</span>
              </button>

              {/* <button className="flex items-center space-x-2 px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors">
                <svg
                  className="w-5 h-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 3v10a2 2 0 002 2h6a2 2 0 002-2V7M7 7h10M9 11v6m6-6v6"
                  />
                </svg>
                <span className="text-sm font-medium text-gray-700">Poll</span>
              </button> */}

              {/* <button className="flex items-center space-x-2 px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors">
                <svg
                  className="w-5 h-5 text-yellow-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-sm font-medium text-gray-700">
                  Feeling
                </span>
              </button> */}
            </div>
          </div>

          {/* Character Count */}
          <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
            <div></div>
            <span>{content.length}/2000</span>
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 flex flex-col items-center space-y-4">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-700 font-medium">
              {isPending || isImagesUploading
                ? "Uploading image..."
                : "Creating post..."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default NewPost;
