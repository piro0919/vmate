import {
  IconClock,
  IconHome,
  IconMessageDots,
  IconUserSquare,
} from "@tabler/icons-react";
import Link from "next/link";
import { useMemo } from "react";
import styles from "./style.module.css";

export default function MobileNavigation(): JSX.Element {
  const items = useMemo(
    () =>
      [
        {
          Icon: IconHome,
          path: "/",
          text: "ホーム",
        },
        {
          Icon: IconMessageDots,
          path: "community/",
          text: "コミュニティ",
        },
        {
          Icon: IconClock,
          path: "/schedule",
          text: "スケジュール",
        },
        {
          Icon: IconUserSquare,
          path: "/pypage",
          text: "マイページ",
        },
      ].map(({ Icon, path, text }) => (
        <li key={path}>
          <Link className={styles.link} href="/">
            <Icon />
            <span className={styles.text}>{text}</span>
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
