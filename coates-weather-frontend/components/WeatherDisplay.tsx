import { Forecast, WeatherData } from "@/types/weather";
const WeatherDisplay = ({ weatherData }: { weatherData: WeatherData }) => {
  function formatDate(datetimeString: string) {
    const dateObject = new Date(datetimeString);

    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(dateObject);
    return formattedDate;
  }
  return (
    <div className="container">
      <div className="border">
        <h2>Current Weather</h2>
        <p>Temperature: {weatherData.currentWeather.main.temp}°C</p>
        <p>Condition: {weatherData.currentWeather.weather[0].description}</p>
      </div>
      <h2>5-Day Forecast</h2>
      <div className="row-items border">
        {weatherData.forecast.map((day: Forecast, index: number) => (
          <div className="outline" key={index}>
            <h3>{formatDate(day.date)}</h3>
            <p>Temperature: {day.temp}°C</p>
            <p>Condition: {day.weather}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherDisplay;
