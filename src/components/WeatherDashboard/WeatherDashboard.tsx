"use client";

import { useState } from "react";

import CitySearch from "@/components/CitySearch/CitySearch";
import CurrentWeather from "@/components/CurrentWeather/CurrentWeather";
import HourlyForecast from "@/components/HourlyForecast/HourlyForecast";
import DailyForecast from "@/components/DailyForecast/DailyForecast";

import { getWeatherCondition } from "@/lib/weather";

import type {
  WeatherData,
  HourlyForecastItem,
  DailyForecastItem,
} from "@/types/weather";

export default function WeatherDashboard() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [hourlyForecast, setHourlyForecast] = useState<HourlyForecastItem[]>(
    [],
  );
  const [dailyForecast, setDailyForecast] = useState<DailyForecastItem[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (city: string) => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `/api/weather?city=${encodeURIComponent(city)}`,
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to fetch weather");
      }

      console.log("Weather API response:", data);

      const current = data.weather.current;
      const hourly = data.weather.hourly;
      const daily = data.weather.daily;

      // Current weather
      const currentWeather: WeatherData = {
        city: data.location.name,
        country: data.location.country,
        temperature: current.temperature_2m,
        condition: getWeatherCondition(current.weather_code),
        feelsLike: current.apparent_temperature,
        humidity: current.relative_humidity_2m,
        windSpeed: current.wind_speed_10m,
      };

      setWeather(currentWeather);
      //Hourly forecast
      const currentHour = current.time.slice(0, 13) + ":00";

      const startIndex = hourly.time.findIndex(
        (time: string) => time === currentHour,
      );

      const nextHours = hourly.time
        .slice(startIndex, startIndex + 5)
        .map((time: string, index: number) => ({
          time,
          temperature: hourly.temperature_2m[startIndex + index],
          condition: getWeatherCondition(
            hourly.weather_code[startIndex + index],
          ),
        }));

      setHourlyForecast(nextHours);
      //Daily forecast
      const nextDays = daily.time.map((date: string, index: number) => ({
        day: date,
        temperatureHigh: daily.temperature_2m_max[index],
        temperatureLow: daily.temperature_2m_min[index],
        condition: getWeatherCondition(daily.weather_code[index]),
      }));

      setDailyForecast(nextDays);
    } catch (error) {
      console.error(error);

      setError(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <CitySearch onSearch={handleSearch} />

      {loading && <p>Loading weather...</p>}

      {error && <p>{error}</p>}

      {weather && <CurrentWeather weather={weather} />}

      {hourlyForecast.length > 0 && (
        <HourlyForecast forecast={hourlyForecast} />
      )}

      {dailyForecast.length > 0 && <DailyForecast forecast={dailyForecast} />}
    </>
  );
}
