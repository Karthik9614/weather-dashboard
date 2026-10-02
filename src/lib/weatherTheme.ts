export type WeatherTheme =
  | "clear-day"
  | "clear-night"
  | "cloudy-day"
  | "cloudy-night"
  | "rain"
  | "snow"
  | "fog"
  | "storm";

export function getWeatherTheme(
  weatherCode: number,
  isDay: boolean,
): WeatherTheme {
  if (weatherCode === 0) {
    return isDay ? "clear-day" : "clear-night";
  }

  if ([1, 2, 3].includes(weatherCode)) {
    return isDay ? "cloudy-day" : "cloudy-night";
  }

  if ([45, 48].includes(weatherCode)) {
    return "fog";
  }

  if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(weatherCode)) {
    return "rain";
  }

  if ([71, 73, 75, 77, 85, 86].includes(weatherCode)) {
    return "snow";
  }

  if ([95, 96, 99].includes(weatherCode)) {
    return "storm";
  }

  return isDay ? "clear-day" : "clear-night";
}