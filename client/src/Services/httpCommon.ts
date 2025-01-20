import axios from "axios";

export default axios.create({
  // baseURL: "http://localhost:5000",
  baseURL: "http://server-api:5000",
  headers: {
    "Content-type": "application/json",
  },
});
