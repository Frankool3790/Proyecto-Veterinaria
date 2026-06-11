import axios from "axios";
import { getApiBaseUrl } from "../utils/apiConfig";

export default axios.create({
  baseURL: getApiBaseUrl(),
  headers: {
    "Content-Type": "application/json",
  },
});
