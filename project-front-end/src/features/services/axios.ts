import axios from "axios";

const baseURL = "http://localhost:3001";
const token = localStorage.getItem("@rentalToken");

export const api = axios.create({
  baseURL: baseURL,
  timeout: 5000,
});
