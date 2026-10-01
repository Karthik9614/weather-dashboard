import CurrentWeather from "@/components/CurrentWeather/CurrentWeather";
import Header from "@/components/Header/Header";
import styles from './page.module.css';

export default function Home() {
  const weather = {
    city: "Coimbatore",
    country: "India",
    temperature: 29,
    condition: "Sunny",
    feelsLike: 31,
    humidity: 68,
    windSpeed: 12,
  };

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

      <CurrentWeather weather={weather} />
    </main>
  );
}
