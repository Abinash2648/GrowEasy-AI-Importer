import axios from "axios";

const API = axios.create({
  baseURL: "https://groweasy-ai-importer-9101.onrender.com/api",
});

export default API;