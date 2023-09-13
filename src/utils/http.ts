import Axios from "axios";

export const serverAxios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default serverAxios;
