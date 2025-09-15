import axios from "axios";
import React from "react";
const axiosIntense = axios.create({
  baseURL: "http://localhost:3000/",
});

const useAxios = () => {
  return axiosIntense;
};

export default useAxios;
