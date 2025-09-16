import { useEffect } from "react";
import axios from "axios";
import UseAuth from "./UseAuth";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000/",
});

const useAxiosSecure = () => {
  const { user } = UseAuth();

  useEffect(() => {
    const interceptor = axiosSecure.interceptors.request.use(
      (config) => {
        config.headers.Authorization = `Bearer ${user.accessToken}`;

        return config;
      },
      (error) => Promise.reject(error)
    );

    // cleanup: remove interceptor when user/logs out or changes
    return () => axiosSecure.interceptors.request.eject(interceptor);
  }, [user]);

  return axiosSecure;
};

export default useAxiosSecure;
