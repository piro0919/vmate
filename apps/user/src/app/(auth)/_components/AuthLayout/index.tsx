"use client";
import { Spin as Hamburger } from "hamburger-react";
import { ReactNode } from "react";
import { useBoolean } from "usehooks-ts";
import Drawer from "../Drawer";
import Header from "../Header";
import MobileNavigation from "../MobileNavigation";
import styles from "./style.module.css";

export type AuthLayoutProps = {
  children: ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps): JSX.Element {
  const {
    setFalse: offIsOpen,
    toggle: toggleIsOpen,
    value: isOpen,
  } = useBoolean(false);

  return (
    <>
      <div className={styles.header}>
        <Header />
      </div>
      <main className={styles.main}>{children}</main>
      <aside className={styles.mobileNavigation}>
        <MobileNavigation />
      </aside>
      <Drawer onClose={offIsOpen} open={isOpen} />
      <div className={styles.hamburger}>
        <Hamburger size={24} toggle={toggleIsOpen} toggled={isOpen} />
      </div>
    </>
  );
}
