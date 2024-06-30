import axios from "axios";

const API_ROOT = process.env.BACKEND_API_ROOT || "http://localhost:5000";

const API_URL = `${API_ROOT}/api/weather`;

export const fetchWeather = async (city: string) => {
  const response = await axios.get(`${API_URL}/${city}`);

  return response.data;
};
export const runtime = "edge";
