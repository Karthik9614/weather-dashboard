import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <h2>Weatherly</h2>
        <p>Weather at a glance</p>
      </div>

      <button className={styles.themeButton} type="button">
        Theme
      </button>
    </header>
  );
}