import { toast } from "react-toastify";
const API_ROOT = process.env.NEXT_PUBLIC_BACKEND_API_ROOT || "http://localhost:5000";

const API_URL = `${API_ROOT}/api/weather`;

export const fetchWeather = async (city: string): Promise<any> => {
  let response: Response;
  response = await fetch(`${API_URL}/${city}`);
  if (!response.ok) {
    toast.error(`Failed to fetch weather data for ${city}`);
    throw new Error("Failed to fetch weather data");
  }
  const data = await response.json();
  return data;
};
export const runtime = "edge";
