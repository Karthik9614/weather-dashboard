export type WeatherData = {
  city: string;
  country: string;
  temperature: number;
  condition: string;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
};

export type HourlyForecastItem = {
  time: string;
  temperature: number;
  condition: string;
};

export type DailyForecastItem = {
  day: string;
  temperatureHigh: number;
  temperatureLow: number;
  condition: string;
};
