"use client";

import { useEffect, useRef, useState } from "react";

import CitySearch from "@/components/CitySearch/CitySearch";
import CurrentWeather from "@/components/CurrentWeather/CurrentWeather";
import HourlyForecast from "@/components/HourlyForecast/HourlyForecast";
import DailyForecast from "@/components/DailyForecast/DailyForecast";

import { getWeatherCondition, getWeatherIcon } from "@/lib/weather";
import { formatHour, formatDay } from "@/lib/date";
import { getWeatherTheme } from "@/lib/weatherTheme";

type WeatherDashboardProps = {
  onThemeChange: (theme: string) => void;
  temperatureUnit: "celsius" | "fahrenheit";
};

import type {
  WeatherData,
  HourlyForecastItem,
  DailyForecastItem,
} from "@/types/weather";

type WeatherApiResponse = {
  error: string;
  location: {
    name: string;
    country: string;
  };
  weather: {
    current: {
      time: string;
      temperature_2m: number;
      apparent_temperature: number;
      relative_humidity_2m: number;
      wind_speed_10m: number;
      weather_code: number;
      is_day: number;
    };
    hourly: {
      time: string[];
      temperature_2m: number[];
      weather_code: number[];
    };
    daily: {
      time: string[];
      temperature_2m_max: number[];
      temperature_2m_min: number[];
      weather_code: number[];
    };
  };
};

function processWeatherData(data: WeatherApiResponse) {
  const current = data.weather.current;
  const hourly = data.weather.hourly;
  const daily = data.weather.daily;

  const weather: WeatherData = {
    city: data.location.name,
    country: data.location.country,
    temperature: current.temperature_2m,
    condition: getWeatherCondition(current.weather_code),
    icon: getWeatherIcon(current.weather_code),
    feelsLike: current.apparent_temperature,
    humidity: current.relative_humidity_2m,
    windSpeed: current.wind_speed_10m,
    weatherCode: current.weather_code,
    isDay: current.is_day === 1,
  };

  const currentHour = current.time.slice(0, 13) + ":00";

  const startIndex = hourly.time.findIndex((time) => time === currentHour);

  const nextHours: HourlyForecastItem[] = hourly.time
    .slice(startIndex, startIndex + 24)
    .map((time, index) => ({
      time: formatHour(time),
      temperature: Math.round(hourly.temperature_2m[startIndex + index]),
      condition: getWeatherCondition(hourly.weather_code[startIndex + index]),
      icon: getWeatherIcon(hourly.weather_code[startIndex + index]),
    }));

  const nextDays: DailyForecastItem[] = daily.time.map((date, index) => ({
    day: formatDay(date, index),
    temperatureHigh: Math.round(daily.temperature_2m_max[index]),
    temperatureLow: Math.round(daily.temperature_2m_min[index]),
    condition: getWeatherCondition(daily.weather_code[index]),
    icon: getWeatherIcon(daily.weather_code[index]),
  }));

  return {
    weather,
    hourly: nextHours,
    daily: nextDays,
  };
}

type WeatherLocation =
  | {
      type: "city";
      city: string;
    }
  | {
      type: "coordinates";
      latitude: number;
      longitude: number;
    };

export default function WeatherDashboard({
  onThemeChange,
  temperatureUnit,
}: WeatherDashboardProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [weatherLocation, setWeatherLocation] =
    useState<WeatherLocation | null>(null);
  const [hourlyForecast, setHourlyForecast] = useState<HourlyForecastItem[]>(
    [],
  );
  const [dailyForecast, setDailyForecast] = useState<DailyForecastItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const previousTemperatureUnit = useRef(temperatureUnit);

  const weatherTheme = weather
    ? getWeatherTheme(weather.weatherCode, weather.isDay)
    : "clear-day";

  useEffect(() => {
    handleLocationRequest();
  }, []);

  useEffect(() => {
  if (previousTemperatureUnit.current === temperatureUnit) {
    return;
  }

  previousTemperatureUnit.current = temperatureUnit;

  if (!weatherLocation) {
    return;
  }

  const refreshWeather = async () => {
    setLoading(true);
    setError("");

    try {
      let url = "";

      if (weatherLocation.type === "city") {
        url = `/api/weather?city=${encodeURIComponent(
          weatherLocation.city,
        )}&unit=${temperatureUnit}`;
      } else {
        url = `/api/weather?lat=${weatherLocation.latitude}&lon=${weatherLocation.longitude}&unit=${temperatureUnit}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to fetch weather");
      }

      const result = processWeatherData(data);

      updateWeather(result);
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "Unable to refresh weather",
      );
    } finally {
      setLoading(false);
    }
  };

  refreshWeather();
}, [temperatureUnit, weatherLocation]);

  const updateWeather = (result: {
    weather: WeatherData;
    hourly: HourlyForecastItem[];
    daily: DailyForecastItem[];
  }) => {
    setWeather(result.weather);
    setHourlyForecast(result.hourly);
    setDailyForecast(result.daily);

    onThemeChange(
      getWeatherTheme(result.weather.weatherCode, result.weather.isDay),
    );
  };

  const handleSearch = async (city: string) => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `/api/weather?city=${encodeURIComponent(city)}&unit=${temperatureUnit}`,
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to fetch weather");
      }

      console.log("Weather API response:", data);

      const result = processWeatherData(data);
      updateWeather(result);
      setWeatherLocation({
        type: "city",
        city,
      });

      // setWeather(result.weather);
      // setHourlyForecast(result.hourly);
      // setDailyForecast(result.daily);
    } catch (error) {
      console.error(error);

      setError(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleLocationRequest = () => {
    if (!navigator.geolocation) {
      setError("Location is not supported by your browser.");
      return;
    }

    setLoading(true);
    setError("");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          // Get city name from coordinates
          const locationUrl = new URL(
            "https://api.bigdatacloud.net/data/reverse-geocode-client",
          );

          locationUrl.searchParams.set("latitude", String(latitude));

          locationUrl.searchParams.set("longitude", String(longitude));

          locationUrl.searchParams.set("localityLanguage", "en");

          const locationResponse = await fetch(locationUrl);

          if (!locationResponse.ok) {
            throw new Error("Unable to determine your city");
          }

          const locationData = await locationResponse.json();

          const city =
            locationData.city || locationData.locality || "Current location";

          const country = locationData.countryName || "";

          // Get weather using the device coordinates
          const weatherResponse = await fetch(
            `/api/weather?lat=${latitude}&lon=${longitude}&unit=${temperatureUnit}`,
          );

          const weatherData: WeatherApiResponse = await weatherResponse.json();

          if (!weatherResponse.ok) {
            throw new Error(
              weatherData.error || "Unable to fetch local weather",
            );
          }

          // Replace "Current location" with the
          // actual city detected by reverse geocoding.
          const dataWithLocation = {
            ...weatherData,
            location: {
              ...weatherData.location,
              name: city,
              country,
            },
          };

          const result = processWeatherData(dataWithLocation);
          updateWeather(result);
          setWeatherLocation({
            type: "coordinates",
            latitude,
            longitude,
          });
        } catch (error) {
          console.error(error);

          setError(
            error instanceof Error
              ? error.message
              : "Unable to get your local weather",
          );
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        setLoading(false);

        if (error.code === error.PERMISSION_DENIED) {
          setError(
            "Location permission was denied. Please search for a city instead.",
          );
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          setError("Unable to determine your location.");
        } else {
          setError("Unable to get your location.");
        }
      },
    );
  };

  return (
    <>
      <CitySearch
        onSearch={handleSearch}
        onLocationRequest={handleLocationRequest}
      />

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
