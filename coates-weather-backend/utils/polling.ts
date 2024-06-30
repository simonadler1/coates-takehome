import { fetchWeatherData } from "../services/weatherService";
import cache from "./cache";

let citiesToPoll: string[] = [];

const pollWeatherData = (city: string) => {
  citiesToPoll.push(city);
};

const startPolling = () => {
  const interval = setInterval(async () => {
    console.log("Polling weather data...");
    const cities = [...citiesToPoll];
    citiesToPoll = []; // Clear the cities

    for (const city of cities) {
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

export { pollWeatherData, citiesToPoll };
