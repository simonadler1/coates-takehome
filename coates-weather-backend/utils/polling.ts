import { fetchWeatherData } from "../services/weatherService";
import cache from "./cache";

let citiesToPoll: string[] = [];

const handleCitiesToPoll = (city: string) => {
  if (!citiesToPoll.includes(city)) {
    citiesToPoll.push(city);
  }
};

const startPolling = () => {
  const interval = setInterval(async () => {
    for (const city of citiesToPoll) {
      try {
        const weatherData = await fetchWeatherData(city);
        cache[city] = weatherData;
      } catch (error) {
        console.error(`Error polling weather data for ${city}:`, error);
      }
    }
  }, 10 * 60 * 1000); // Run every 10 minutes

  // Clear cities every 12 hours
  setTimeout(() => {
    clearInterval(interval);
    citiesToPoll = [];
  }, 12 * 60 * 60 * 1000);
};
startPolling();

export { handleCitiesToPoll, citiesToPoll };
