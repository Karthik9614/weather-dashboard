import type { SunInfo as SunInfoData } from "@/types/weather";

import styles from "./SunInfo.module.css";

type SunInfoProps = {
  sunInfo: SunInfoData;
};

function formatTime(dateTime: string): string {
  return new Date(dateTime).toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function getUvLabel(uvIndex: number): string {
  if (uvIndex <= 2) return "Low";
  if (uvIndex <= 5) return "Moderate";
  if (uvIndex <= 7) return "High";
  if (uvIndex <= 10) return "Very High";

  return "Extreme";
}

export default function SunInfo({ sunInfo }: SunInfoProps) {
  return (
    <section className={styles.sunInfo}>
      <div className={styles.header}>
        <p>SUN & UV</p>
      </div>

      <div className={styles.grid}>
        <div className={styles.item}>
          <span className={styles.icon}>🌅</span>

          <div>
            <p className={styles.label}>Sunrise</p>
            <p className={styles.value}>
              {formatTime(sunInfo.sunrise)}
            </p>
          </div>
        </div>

        <div className={styles.item}>
          <span className={styles.icon}>🌇</span>

          <div>
            <p className={styles.label}>Sunset</p>
            <p className={styles.value}>
              {formatTime(sunInfo.sunset)}
            </p>
          </div>
        </div>

        <div className={styles.item}>
          <span className={styles.icon}>☀️</span>

          <div>
            <p className={styles.label}>UV Index</p>
            <p className={styles.value}>
              {sunInfo.uvIndex.toFixed(1)}
            </p>
            <p className={styles.status}>
              {getUvLabel(sunInfo.uvIndex)}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}