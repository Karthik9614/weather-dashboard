import CurrentWeather from "@/components/CurrentWeather/CurrentWeather";
import HourlyForecast from "@/components/HourlyForecast/HourlyForecast";
import type { DailyForecastItem, HourlyForecastItem } from "@/types/weather";
import Header from "@/components/Header/Header";
import styles from './page.module.css';
import DailyForecast from "@/components/DailyForecast/DailyForecast";

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

 const hourlyForecast: HourlyForecastItem[] = [
  {
    time: "10 PM",
    temperature: 28,
    condition: "Sunny",
  },
  {
    time: "11 PM",
    temperature: 27,
    condition: "Sunny",
  },
  {
    time: "12 AM",
    temperature: 26,
    condition: "Cloudy",
  },
  {
    time: "1 AM",
    temperature: 26,
    condition: "Cloudy",
  },
  {
    time: "2 AM",
    temperature: 25,
    condition: "Cloudy",
  },
];

const dailyForecast: DailyForecastItem[] = [
  {
    day: "Thu",
    temperatureHigh: 31,
    temperatureLow: 24,
    condition: "Sunny",
  },
  {
    day: "Fri",
    temperatureHigh: 30,
    temperatureLow: 23,
    condition: "Cloudy",
  },
  {
    day: "Sat",
    temperatureHigh: 28,
    temperatureLow: 23,
    condition: "Rain",
  },
  {
    day: "Sun",
    temperatureHigh: 30,
    temperatureLow: 24,
    condition: "Sunny",
  },
  {
    day: "Mon",
    temperatureHigh: 29,
    temperatureLow: 22,
    condition: "Cloudy",
  },
];

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
      <HourlyForecast forecast={hourlyForecast} />
      <DailyForecast forecast={dailyForecast} />

    </main>
  );
}
