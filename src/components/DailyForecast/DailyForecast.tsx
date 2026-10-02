import type { DailyForecastItem } from "@/types/weather";
import styles from "./DailyForecast.module.css";

type DailyForecastProps = {
  forecast: DailyForecastItem[];
};

export default function DailyForecast({ forecast }: DailyForecastProps) {
  return (
    <section className={styles.dailyForecast}>
      <div className={styles.header}>
        <p>DAILY FORECAST</p>
      </div>

      <div className={styles.list}>
        {forecast.map((item) => (
          <div className={styles.item} key={item.day}>
            <span className={styles.day}>{item.day}</span>

            <span>{item.icon}</span>

            <span className={styles.condition}>{item.condition}</span>

            <span className={styles.high}>{item.temperatureHigh}°</span>

            <span className={styles.low}>{item.temperatureLow}°</span>
          </div>
        ))}
      </div>
    </section>
  );
}
