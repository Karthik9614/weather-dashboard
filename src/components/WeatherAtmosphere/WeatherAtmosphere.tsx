import styles from "./WeatherAtmosphere.module.css";

type WeatherAtmosphereProps = {
  theme: string;
};

export default function WeatherAtmosphere({
  theme,
}: WeatherAtmosphereProps) {
  return (
    <div
      className={`${styles.atmosphere} ${styles[theme]}`}
      aria-hidden="true"
    >
      <div className={styles.sunGlow} />

      <div className={styles.stars}>
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>

      <div className={styles.clouds}>
        <span className={styles.cloudOne} />
        <span className={styles.cloudTwo} />
        <span className={styles.cloudThree} />
      </div>

      <div className={styles.rain}>
        {Array.from({ length: 40 }).map((_, index) => (
          <span key={index} />
        ))}
      </div>
    </div>
  );
}