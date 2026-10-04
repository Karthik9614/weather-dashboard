import type { WeatherData } from "@/types/weather";

import styles from "./WeatherDetails.module.css";

type WeatherDetailsProps = {
  weather: WeatherData;
};

function getWindDirection(degrees: number): string {
  const directions = [
    "N",
    "NE",
    "E",
    "SE",
    "S",
    "SW",
    "W",
    "NW",
  ];

  const index = Math.round(degrees / 45) % 8;

  return directions[index];
}

export default function WeatherDetails({
  weather,
}: WeatherDetailsProps) {
  const visibilityKm = Math.round(weather.visibility / 1000);

  return (
    <section className={styles.details}>
      <div className={styles.header}>
        <p>WEATHER DETAILS</p>
      </div>

      <div className={styles.grid}>
        <div className={styles.item}>
          <span className={styles.icon}>💧</span>

          <div>
            <p className={styles.label}>Precipitation</p>
            <p className={styles.value}>
              {weather.precipitation} mm
            </p>
          </div>
        </div>

        <div className={styles.item}>
          <span className={styles.icon}>👁️</span>

          <div>
            <p className={styles.label}>Visibility</p>
            <p className={styles.value}>
              {visibilityKm} km
            </p>
          </div>
        </div>

        <div className={styles.item}>
          <span className={styles.icon}>🧭</span>

          <div>
            <p className={styles.label}>Wind Direction</p>
            <p className={styles.value}>
              {getWindDirection(weather.windDirection)} (
              {Math.round(weather.windDirection)}°)
            </p>
          </div>
        </div>

        <div className={styles.item}>
          <span className={styles.icon}>🌡️</span>

          <div>
            <p className={styles.label}>Pressure</p>
            <p className={styles.value}>
              {Math.round(weather.pressure)} hPa
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}