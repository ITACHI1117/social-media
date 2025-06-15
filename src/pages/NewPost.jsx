import profileImg from "../assets/manImage.jpg";
import food from "../assets/food.jpg";
// import profileImg from "../assets/student.jpg";
import { IoChatbubblesOutline } from "react-icons/io5";
import { VscSend } from "react-icons/vsc";
import { useEffect, useRef, useState } from "react";
import { LuImagePlus } from "react-icons/lu";
import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router";
import {
  useDeleteImage,
  useNewPost,
  useUploadImage,
  useUser,
} from "../queries/userQueries";
import { toast } from "react-toastify";
import { newPost, uploadImage } from "../services/userServices";

function NewPost() {
  const posts = [
    {
      id: 1,
      title: "Post 1",
      content: "This is the content of post 1",
      image: "https://via.placeholder.com/150",
      user: {
        id: 1,
        name: "John Doe",
        profilePicture: "https://via.placeholder.com/50",
      },
    },
    {
      id: 2,
      title: "Post 2",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum  ",
      image: "https://via.placeholder.com/150",
      user: {
        id: 2,
        name: "John Doe",
        profilePicture: "https://via.placeholder.com/50",
      },
    },
    {
      id: 3,
      title: "Post 3",
      content: "This is the content of post 3",
      image: "https://via.placeholder.com/150",
      user: {
        id: 3,
        name: "Jane Doe",
        profilePicture: "https://via.placeholder.com/50",
      },
    },
  ];
  const [content, setContent] = useState("");
  const [addedImg, setAddedImg] = useState(false);
  const [uploadedImg, setUploadedImg] = useState(null);
  const imgInputRef = useRef(null);
  const [postData, setPostData] = useState({});
  let navigate = useNavigate();

  const handelImgSelect = () => {
    imgInputRef.current.click();
  };

  const handelImgChange = (e) => {
    const img = e.target.files[0];
    if (img) {
      console.log(img);
      setAddedImg(true);
      setUploadedImg(img);
    }
  };

  const handelPost = () => {
    content.length > 0
      ? console.log("Post Created")
      : alert("Please add content");
  };

  // New post query
  const {
    mutate: mutatePost,
    isPending: isPostPending,
    isSuccess: isPostSuccess,
    error: postError,
  } = useNewPost();

  // upload image query
  const { mutate, data, isPending, isSuccess, error } = useUploadImage();

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
    if (uploadedImg && content.length > 0) {
      try {
        // Upload image first
        mutate({ file: uploadedImg });

        // Just the URL string

        try {
          // Create post
          // Create FormData for post
        } catch (postError) {
          // Delete image if post creation fails
          await deleteImage(data.publicId);
          console.log("Post failed, image deleted");
        }
      } catch (error) {
        console.log("Image upload failed:", error);
      }
    }
  };

  // append form data and Post
  useEffect(() => {
    console.log();
    const formData = new FormData();
    isSuccess && formData.append("Caption", content);
    isSuccess && formData.append("Images", uploadedImg);
    isSuccess && mutatePost(formData);
    isSuccess && console.log(data.url);
    postError && deleteImage(data.publicId);
    isSuccess && navigate("/home");
    // deleteImage(data.publicId);
  }, [isSuccess]);

  useEffect(() => {
    if (isPostSuccess) {
      toast.success("Post Sent successfully", {
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      // navigate("/home");
    }
    if (postError) {
      toast.error("Error Sending Post", {
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log(error);
    }
  }, [isPostSuccess, postError]);

  return (
    <>
      <div className="flex items-center justify-center py-2">
        <div className="absolute left-5" onClick={() => navigate(-1)}>
          <IoChevronBackOutline className="text-xl" />
        </div>
        <h1 className="font-bold text-xl">New Post</h1>
      </div>
      <section className="w-full h-[90%] p-5 mb-50 flex overflow-y-scroll">
        <div className=" w-full border-b-2 border-blue-100 pb-2 mb-4">
          <div className="w-full flex gap-3 ">
            {isUser && (
              <img
                src={userData.profileImageUrl}
                alt=""
                className="w-[50px] h-[50px] rounded-full object-cover"
              />
            )}

            <div className="w-full">
              <input
                type="file"
                accept="image/*"
                ref={imgInputRef}
                className="hidden"
                onChange={handelImgChange}
              />
              {!addedImg ? (
                <>
                  <div
                    onClick={handelImgSelect}
                    className="w-[100%] h-[200px] bg-blue-200 flex items-center justify-center"
                  >
                    <LuImagePlus className="text-[40px] text-white" />
                  </div>
                </>
              ) : (
                <img
                  onClick={handelImgSelect}
                  src={URL.createObjectURL(uploadedImg)}
                  alt=""
                  className="w-[100%] rounded-t object-cover"
                />
              )}

              <div
                className="w-full bg-blue-400 p-2 rounded-b whitespace-pre-wrap break-words text-white"
                style={{
                  maxWidth: "100%",
                  wordWrap: "break-word",
                  overflowWrap: "break-word",
                }}
              >
                {content}
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="fixed bottom-0 p-3 w-full flex items-center px-3 bg-white gap-3">
        <div className="w-[90%] bg-blue-100 ">
          <textarea
            type="text"
            placeholder="Type here..."
            className="w-full outline-none  h-[30px] max-h-[100px] px-2"
            onChange={(e) => setContent(e.target.value)}
            value={content}
            name="content"
            onInput={(e) => {
              e.target.style.height = "auto";
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
          />
        </div>
        <button
          onClick={Submit}
          disabled={isPostPending}
          className={`p-3 rounded-full ${
            isPostPending || isPending ? "bg-gray-400" : "bg-blue-400"
          }  text-white cursor-pointer`}
        >
          <VscSend />
        </button>
      </div>
    </>
  );
}

export default NewPost;
