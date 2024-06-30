import { fetchWeatherData } from "../services/weatherService";

let citiesToPoll: string[] = [];

const handleCitiesToPoll = (city: string) => {
  if (!citiesToPoll.includes(city)) {
    citiesToPoll.push(city);
  }
};

const startPolling = () => {
  console.log("setting up interval for polling weather data");

  const interval = setInterval(async () => {
    for (const city of citiesToPoll) {
      try {
        console.log(`Polling weather data for ${city}`);

        const weatherData = await fetchWeatherData(city);
        //check if weatherData is an error
        if (weatherData instanceof Error) {
          console.log("error");
          console.log(weatherData);
          continue;
        }
      } catch (error) {
        console.error(`Error polling weather data for ${city}:`, error);
      }
    }
  }, 10 * 60 * 1000);

  // Clear cities every 12 hours
  setTimeout(() => {
    clearInterval(interval);
    citiesToPoll = [];
  }, 12 * 60 * 60 * 1000);
};
startPolling();

export { handleCitiesToPoll, citiesToPoll };
