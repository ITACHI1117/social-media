import { success } from "zod/v4";
import { axiosInstance } from "./authServcies";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { API } from "./url";

async function getUser() {
  try {
    const user = await axiosInstance.get("/UserProfile");
    return user.data;
  } catch (err) {
    console.log(err);
    throw {
      success: false,
      message: err.response,
    };
  }
}

// get my posts
async function getPosts() {
  try {
    const myPosts = await axiosInstance.get("/Posts");
    return myPosts.data;
  } catch (err) {
    console.log(err);
    throw {
      success: false,
      message: err.response,
    };
  }
}

// get my posts
async function getMyPosts() {
  try {
    const myPosts = await axiosInstance.get("/Posts/me");
    return myPosts.data;
  } catch (err) {
    console.log(err);
    throw {
      success: false,
      message: err.response,
    };
  }
}
// upload image to cloud
async function uploadImage(file) {
  const AccessToken = localStorage.getItem("accessToken");

  try {
    // const formData = new FormData();
    // formData.append("file", file); // "file" is the correct field name
    const image = await axiosInstance.post(`${API}image/upload`, file, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${AccessToken}`,
      },
    });
    return image.data;
  } catch (err) {
    console.log(err);
    throw {
      success: false,
      message: err.response,
    };
  }
}

// delete image in cloud
async function deleteImage(id) {
  try {
    const response = await axiosInstance.delete(`/image/${id}`, id, {});
    return response.data;
  } catch (err) {
    console.log(err);
    throw {
      success: false,
      message: err.message,
    };
  }
}

async function newPost(postData) {
  const generatedId = uuidv4();
  const AccessToken = localStorage.getItem("accessToken");
  try {
    const newPost = axios.post(`${API}Posts`, postData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${AccessToken}`,
      },
    });
    console.log(newPost);

    return newPost;
  } catch (err) {
    console.log(err);
    throw {
      success: false,
      message: err.response || "Failed to create new post",
    };
  }
}

export { getUser, getPosts, getMyPosts, newPost, uploadImage, deleteImage };
