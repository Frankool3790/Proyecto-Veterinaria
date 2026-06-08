import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3002/api";

export default axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});