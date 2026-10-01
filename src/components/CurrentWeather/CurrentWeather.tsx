import type { WeatherData } from "@/types/weather";
import styles from "./CurrentWeather.module.css";

type CurrentWeatherProps = {
  weather: WeatherData;
};

export default function CurrentWeather({
  weather,
}: CurrentWeatherProps) {
  return (
    <section className={styles.card}>
      <div className={styles.main}>
        <div>
          <p className={styles.locationLabel}>CURRENT WEATHER</p>

          <h2>
            {weather.city}, {weather.country}
          </h2>

          <p className={styles.condition}>{weather.condition}</p>
        </div>

        <div className={styles.temperature}>
          {weather.temperature}°
        </div>
      </div>

      <div className={styles.stats}>
        <div className={styles.stat}>
          <span>Feels like</span>
          <strong>{weather.feelsLike}°C</strong>
        </div>

        <div className={styles.stat}>
          <span>Humidity</span>
          <strong>{weather.humidity}%</strong>
        </div>

        <div className={styles.stat}>
          <span>Wind</span>
          <strong>{weather.windSpeed} km/h</strong>
        </div>
      </div>
    </section>
  );
}