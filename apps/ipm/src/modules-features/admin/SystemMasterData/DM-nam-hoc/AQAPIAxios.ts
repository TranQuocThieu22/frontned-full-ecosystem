import axios from "axios";



export default axios.create({
  baseURL: "https://localhost:7053/api",
  // baseURL: "https://aqtech.vn:4006/api",
});