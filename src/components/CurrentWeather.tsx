import type { WeatherData } from "@/types/weather";

type CurrentWeatherProps = {
  weather: WeatherData;
};

export default function CurrentWeather({
  weather,
}: CurrentWeatherProps) {
  return (
    <section className="current-weather">
      <div className="weather-main">
        <div>
          <p className="location-label">CURRENT WEATHER</p>

          <h2>
            {weather.city}, {weather.country}
          </h2>

          <p className="condition">{weather.condition}</p>
        </div>

        <div className="temperature">
          {weather.temperature}°
        </div>
      </div>

      <div className="weather-stats">
        <div className="weather-stat">
          <span>Feels like</span>
          <strong>{weather.feelsLike}°C</strong>
        </div>

        <div className="weather-stat">
          <span>Humidity</span>
          <strong>{weather.humidity}%</strong>
        </div>

        <div className="weather-stat">
          <span>Wind</span>
          <strong>{weather.windSpeed} km/h</strong>
        </div>
      </div>
    </section>
  );
}