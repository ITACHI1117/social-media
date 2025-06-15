import { useMutation, useQuery } from "@tanstack/react-query";
import {
  deleteImage,
  getMyPosts,
  getPosts,
  getUser,
  newPost,
  uploadImage,
} from "../services/userServices";

export const useUser = () => {
  return useQuery({ queryKey: [`user`], queryFn: getUser, initialData: [] });
};

export const usePosts = () => {
  return useQuery({
    queryKey: [`myPosts`],
    queryFn: getPosts,
    initialData: [],
  });
};

export const useMyPosts = () => {
  return useQuery({ queryKey: [`myPosts`], queryFn: getMyPosts });
};

export const useUploadImage = () => {
  return useMutation({
    mutationFn: (data) => uploadImage(data),
    onSuccess: (response) => {
      console.log(response);
      return response;
    },
    onError: (error) => {
      console.log(error);
      return error;
    },
  });
};

export const useDeleteImage = () => {
  return useMutation({
    mutationFn: (id) => deleteImage(id),
    onSuccess: (response) => {
      console.log(response);
      return response;
    },
    onError: (error) => {
      console.log(error);
      return error;
    },
  });
};

export const useNewPost = () => {
  return useMutation({
    mutationFn: (data) => {
      newPost(data);
    },
    onSuccess: (response) => {
      console.log(response);
      return response;
    },
    onError: (err) => {
      console.log(err);
      return err;
    },
  });
};
// export const useUser = () => {
//   return useMutation({
//     mutationFn: () => getUser(),
//     onSuccess: (response) => {
//       console.log(response);
//     },
//     onError: (error) => {
//       console.log(error);
//     },
//   });
// };
