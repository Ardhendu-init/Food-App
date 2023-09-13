import Axios from "axios";

const BASE_URL = "http://localhost:3000/api";
export const serverAxios = Axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default serverAxios;
