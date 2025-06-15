import { useMutation } from "@tanstack/react-query";
import { login, register } from "../services/authServcies";

export const useLogin = () => {
  return useMutation({
    mutationFn: async (data) => login(data),
    onSuccess: (response) => {
      console.log("Login Successful");
      console.log(response);
      return response;
    },
    onError: (err) => {
      console.log(err);
      return err;
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: async (data) => register(data),
    onSuccess: (response) => {
      console.log("Login Successful");
      console.log(response);
    },
    onError: (err) => {
      console.log(err);
    },
  });
};
