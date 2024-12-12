"use client";
import {
  IconClock,
  IconHome,
  IconMessageDots,
  IconUser,
} from "@tabler/icons-react";
import { ReactNode, useState } from "react";
import { Tab, TabList, Tabs } from "react-tabs";
import styles from "./style.module.css";

export type AuthLayoutProps = {
  children: ReactNode;
};

export default function AuthLayout({
  children,
}: AuthLayoutProps): React.JSX.Element {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <>
      <main className={styles.main}>{children}</main>
      <Tabs onSelect={(index) => setTabIndex(index)} selectedIndex={tabIndex}>
        <TabList className={styles.tabList}>
          <Tab className={styles.tab}>
            <IconHome size={24} />
            <span>ホーム</span>
          </Tab>
          <Tab className={styles.tab}>
            <IconMessageDots size={24} />
            <span>コミュニティ</span>
          </Tab>
          <Tab className={styles.tab}>
            <IconClock size={24} />
            <span>スケジュール</span>
          </Tab>
          <Tab className={styles.tab}>
            <IconUser size={24} />
            <span>マイページ</span>
          </Tab>
        </TabList>
      </Tabs>
    </>
  );
}
