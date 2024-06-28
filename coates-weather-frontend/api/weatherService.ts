import axios from "axios";

const API_URL = "http://localhost:5000/api/weather";

export const fetchWeather = async (city: string) => {
  const response = await axios.get(`${API_URL}/${city}`);

  return response.data;
};
