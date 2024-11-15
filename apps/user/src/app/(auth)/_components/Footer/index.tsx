import styles from "./style.module.css";

export default function Footer(): JSX.Element {
  return (
    <footer className={styles.footer}>
      <small className={styles.copyright}>&copy; 2024 Vmate</small>
    </footer>
  );
}
