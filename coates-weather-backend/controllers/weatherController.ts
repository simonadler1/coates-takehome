import { Request, Response } from "express";
import { fetchWeatherData } from "../services/weatherService";
import { pollWeatherData, citiesToPoll } from "../utils/polling";

export const getWeather = async (req: Request, res: Response) => {
  const city = req.params.city;
  try {
    const weatherData = await fetchWeatherData(city);
    if (!citiesToPoll.includes(city)) {
      pollWeatherData(city);
    }
    res.status(200).json(weatherData);
  } catch (error) {
    res.status(500).json({ error: "Error fetching weather data" });
  }
};
