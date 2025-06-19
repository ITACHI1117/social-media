import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: `https://campusconnect-avnt.onrender.com/api/`,
  // timeout: 20 * 1000, //20 seconds
  headers: {},
});

let isRefreshing = false;
let failedQueue = [];

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Prevent infinite loops
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = "Bearer " + token;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken"); // or from context/cookie
        const response = await axiosInstance.post("token/refresh", {
          refreshToken,
        });

        const newAccessToken = response.data.accessToken;
        localStorage.setItem("accessToken", newAccessToken);

        api.defaults.headers.common.Authorization = "Bearer " + newAccessToken;
        processQueue(null, newAccessToken);
        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);
        // Optionally: logout the user
        localStorage.clear("accessToken");
        localStorage.clear("refreshToken");
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

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
