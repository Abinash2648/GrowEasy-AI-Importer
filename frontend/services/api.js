import axios from "axios";

const API = axios.create({
  baseURL: "https://groweasy-ai-importer-7z5a.onrender.com/api",
});

export default API;