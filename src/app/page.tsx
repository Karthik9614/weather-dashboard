import type { DailyForecastItem, HourlyForecastItem } from "@/types/weather";
import Header from "@/components/Header/Header";
import styles from './page.module.css';
import WeatherDashboard from "@/components/WeatherDashboard/WeatherDashboard";

export default function Home() {

  return (
    <main className={styles.dashboard}>
      <Header />

      <section className={styles.hero}>
        <p className={styles.eyebrow}>WEATHER DASHBOARD</p>

        <h1>Know your weather.</h1>

        <p className={styles.subtitle}>
          Plan your day with accurate weather information at a glance.
        </p>
      </section>

      <WeatherDashboard />

    </main>
  );
}
