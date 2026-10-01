import type { HourlyForecastItem } from "@/types/weather";
import styles from "./HourlyForecast.module.css";

type HourlyForecastProps = {
  forecast: HourlyForecastItem[];
};

export default function HourlyForecast({ forecast }: HourlyForecastProps) {
  return (
    <section className={styles.hourlyForecast}>
      <div className={styles.header}>
        <p>HOURLY FORECAST</p>
      </div>

      <div className={styles.list}>
        {forecast.map((item) => (
          <div className={styles.item} key={item.time}>
            <span className={styles.time}>{item.time}</span>
            <span className={styles.condition}>{item.condition}</span>
            <strong className={styles.temperature}>{item.temperature}°</strong>
          </div>
        ))}
      </div>
    </section>
  );
}
