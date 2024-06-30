const API_ROOT = process.env.BACKEND_API_ROOT || "http://localhost:5000";

const API_URL = `${API_ROOT}/api/weather`;

export const fetchWeather = async (city: string) => {
  let response: any;
  fetch(`${API_URL}/${city}`).then((res) => {
    response = res.json();
  });
  if (!response) {
    throw new Error("Failed to fetch weather data");
  }
  if (!response.data) {
    throw new Error("Failed to fetch weather data");
  }

  return response.data;
};
export const runtime = "edge";
