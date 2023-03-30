import axios from "axios";

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    let token;
    const user = localStorage.getItem("user");
    if (user) {
      token = JSON.parse(user).token;
    }
    // Do something before request is sent
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    // OR config.headers.common['Authorization'] = `Bearer ${your_token}`;
    config.baseURL = "http://localhost:4000/api";

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  patch: axios.patch,
};
