import _axios from "axios";

const axios = _axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Use environment variable
});

export default axios;
