import Link from "next/link";
import { useMemo } from "react";
import styles from "./style.module.css";

export default function MobileNavigation(): JSX.Element {
  const items = useMemo(
    () =>
      [
        {
          path: "/",
          text: "ホーム",
        },
        {
          path: "community/",
          text: "コミュニティ",
        },
        {
          path: "/schedule",
          text: "スケジュール",
        },
        {
          path: "/pypage",
          text: "マイページ",
        },
      ].map(({ path, text }) => (
        <li key={path}>
          <Link className={styles.link} href="/">
            {text}
          </Link>
        </li>
      )),
    [],
  );

  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>{items}</ul>
    </nav>
  );
}
