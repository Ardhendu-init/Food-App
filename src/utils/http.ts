import Axios from "axios";

export const serverAxios = Axios.create({
  baseURL: process.env.NEXTAUTH_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default serverAxios;
