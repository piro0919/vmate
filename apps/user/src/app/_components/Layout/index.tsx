"use client";
import { ReactNode } from "react";
import useShowWindowSize from "use-show-window-size";
import Header from "../Header";
import MobileNavigation from "../MobileNavigation";
import styles from "./style.module.css";

export type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps): JSX.Element {
  useShowWindowSize({
    disable: process.env.NODE_ENV === "production",
  });

  return (
    <div>
      <div className={styles.header}>
        <Header />
      </div>
      <main className={styles.main}>{children}</main>
      <aside className={styles.mobileNavigation}>
        <MobileNavigation />
      </aside>
    </div>
  );
}
