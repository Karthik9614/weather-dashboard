export type WeatherData = {
  city: string;
  country: string;
  temperature: number;
  condition: string;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  icon: string;
  weatherCode: number;
  isDay: boolean;
  windDirection: number;
  precipitation: number;
  pressure: number;
  visibility: number;
};

export type HourlyForecastItem = {
  time: string;
  temperature: number;
  condition: string;
  icon: string;
};

export type DailyForecastItem = {
  day: string;
  temperatureHigh: number;
  temperatureLow: number;
  condition: string;
  icon: string;
};

export type SunInfo = {
  sunrise: string;
  sunset: string;
  uvIndex: number;
};
