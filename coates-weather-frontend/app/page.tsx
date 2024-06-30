"use client";
import WeatherDisplay from "@/components/WeatherDisplay";
import SearchByCity from "@/components/SearchByCity";
import { fetchWeather } from "@/app/api/weatherService";
import { useState } from "react";
import { WeatherData } from "../..//types/weather";
const App = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState<WeatherData>();
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout>();

  const handleSearch = async () => {
    clearInterval(intervalId);
    getWeatherData(city);
    handlePolling();
  };
  const getWeatherData = async (city: string) => {
    const data = await fetchWeather(city);
    setWeatherData(data);
  };
  const handlePolling = async () => {
    const Id = setInterval(() => {
      getWeatherData(city);
    }, 60250);
    setIntervalId(Id);
  };

  return (
    <>
      <SearchByCity city={city} setCity={setCity} handleSearch={handleSearch} />
      {weatherData && <WeatherDisplay weatherData={weatherData} />}
    </>
  );
};
export default App;
