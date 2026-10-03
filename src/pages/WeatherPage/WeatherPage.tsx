"use client";
import { useState } from "react";
import Header from "@/components/Header/Header";
import WeatherDashboard from "@/components/WeatherDashboard/WeatherDashboard";
import WeatherAtmosphere from "@/components/WeatherAtmosphere/WeatherAtmosphere";
import styles from "./WeatherPage.module.css";

export default function WeatherPage() {
  const [weatherTheme, setWeatherTheme] = useState("clear-day");
  const [temperatureUnit, setTemperatureUnit] = useState<
    "celsius" | "fahrenheit"
  >("celsius");

  return (
    <main className={`${styles.dashboard} ${styles[weatherTheme]}`}>
      <WeatherAtmosphere theme={weatherTheme} />

      <div className={styles.content}>
        <Header
          temperatureUnit={temperatureUnit}
          onTemperatureUnitChange={setTemperatureUnit}
        />

        <section className={styles.hero}>
          <p className={styles.eyebrow}>WEATHER DASHBOARD</p>

          <h1>Know your weather.</h1>

          <p className={styles.subtitle}>
            Plan your day with accurate weather information at a glance.
          </p>
        </section>

        <WeatherDashboard
          onThemeChange={setWeatherTheme}
          temperatureUnit={temperatureUnit}
        />
      </div>
    </main>
  );
}
