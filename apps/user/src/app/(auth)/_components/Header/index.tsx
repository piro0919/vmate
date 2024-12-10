import { Lobster } from "next/font/google";
import Link from "next/link";
import styles from "./style.module.css";

const lobster = Lobster({
  display: "swap",
  subsets: ["latin"],
  weight: "400",
});

export default function Header(): JSX.Element {
  return (
    <header className={styles.header}>
      <Link className={`${styles.title} ${lobster.className}`} href="/">
        Vmate
      </Link>
    </header>
  );
}
