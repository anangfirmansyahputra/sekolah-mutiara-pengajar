import axios from "axios";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
const axiosInstance = axios.create({
    baseURL: publicRuntimeConfig.apiUrl,
});

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        if (error.response && error.response.status === 401) {
            const urlPath = error.response.config.url;
            if (urlPath !== "/api/auth/login") {
                localStorage.removeItem("token");
                window.location.href = "/auth/login";
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
