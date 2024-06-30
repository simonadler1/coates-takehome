import axios from "axios";
import cache from "../utils/cache";
import { ForecastEntry } from "../../types/forecast";

const API_KEY = process.env.OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const fetchWeatherData = async (city: string) => {
  const currentWeatherUrl = `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`;
  const forecastUrl = `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`;

  //check if cached data is less than 10 minutes old. openweathermap api returns the dt in seconds rather than the standard milliseconds. also it seems openweathemap can return data with old timestamps

  if (cache[city] && Date.now() / 1000 - cache[city].currentWeather.dt < 600) {
    console.log(
      `Returning cached data for ${city} because age of data is ${
        Date.now() / 1000 - cache[city].currentWeather.dt
      } which is less than 600 seconds`
    );
    return cache[city];
  }

  console.log("returning fresh data");

  let currentWeatherResponse;
  let forecastResponse;
  try {
    [currentWeatherResponse, forecastResponse] = await Promise.all([
      axios.get(currentWeatherUrl),
      axios.get(forecastUrl),
    ]);
  } catch (error) {
    console.log("Error fetching weather data" + error);
    console.log(error);

    return new Error(`Failed to fetch weather data for ${city}`);
  }

  const currentWeather = currentWeatherResponse.data;

  const forecast = forecastResponse.data.list
    .filter((item: ForecastEntry) => item.dt_txt.endsWith("12:00:00"))
    .slice(0, 5)
    .map((entry: ForecastEntry) => ({
      date: entry.dt_txt,
      temp: entry.main.temp,
      weather: entry.weather[0].description,
    }));

  cache[city] = {
    currentWeather,
    forecast,
  };

  return { currentWeather, forecast };
};
