type MainWeatherParams = {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
};

type WeatherCondition = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

type Clouds = {
  all: number;
};

type Wind = {
  speed: number;
  deg: number;
  gust: number;
};

type Sys = {
  pod: string;
};

type Rain = {
  "3h": number;
};

type ForecastEntry = {
  dt: number;
  main: MainWeatherParams;
  weather: Array<WeatherCondition>;
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number;
  sys: Sys;
  dt_txt: string;
  rain?: Rain;
};

type ForecastData = {
  cod: string;
  message: number;
  cnt: number;
  list: Array<ForecastEntry>;
};
export type { ForecastData, ForecastEntry };
// Compare this snippet from types/weather.ts:
