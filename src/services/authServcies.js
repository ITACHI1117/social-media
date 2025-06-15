import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: `https://campusconnect-avnt.onrender.com/api/`,
  // timeout: 20 * 1000, //20 seconds
  headers: {},
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

async function login(credentials) {
  try {
    const response = await axiosInstance.post(
      "authentication/login",
      credentials
    );
    return response.data;
  } catch (err) {
    console.log(err);
    throw {
      success: false,
      message: err.response || "Login failed",
    };
  }
}
async function register(credentials) {
  try {
    const response = await axiosInstance.post(
      "authentication/Register",
      credentials
    );
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err);
    throw {
      success: false,
      message: err.response || "Failed to register",
    };
  }
}

export { login, register };
