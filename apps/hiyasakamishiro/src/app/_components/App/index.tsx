"use client";
import { IconHome } from "@tabler/icons-react";
import { useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import styles from "./style.module.css";

export default function App(): React.JSX.Element {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <Tabs
      className={styles.tabs}
      onSelect={(index) => setTabIndex(index)}
      selectedIndex={tabIndex}
    >
      <TabPanel>
        <h2>ホーム</h2>
        <p>
          ホーム画面のコンテンツ
          <br />
          ホーム画面のコンテンツ
          <br />
          ホーム画面のコンテンツ
          <br />
          ホーム画面のコンテンツ
          <br />
          ホーム画面のコンテンツ
          <br />
          ホーム画面のコンテンツ
          <br />
          ホーム画面のコンテンツ
          <br />
          ホーム画面のコンテンツ
          <br />
          ホーム画面のコンテンツ
          <br />
          ホーム画面のコンテンツ
          <br />
          ホーム画面のコンテンツ
          <br />
          ホーム画面のコンテンツ
          <br />
          ホーム画面のコンテンツ
          <br />
          ホーム画面のコンテンツ
          <br />
          ホーム画面のコンテンツ
          <br />
          ホーム画面のコンテンツ
          <br />
          ホーム画面のコンテンツ
          <br />
          ホーム画面のコンテンツ
          <br />
          ホーム画面のコンテンツ
          <br />
          ホーム画面のコンテンツ
          <br />
          ホーム画面のコンテンツ
          <br />
          ホーム画面のコンテンツ
          <br />
          ホーム画面のコンテンツ
          <br />
          ホーム画面のコンテンツ
          <br />
          ホーム画面のコンテンツ
          <br />
          ホーム画面のコンテンツ
          <br />
          ホーム画面のコンテンツ
          <br />
          ホーム画面のコンテンツ
          <br />
          ホーム画面のコンテンツ
          <br />
          ホーム画面のコンテンツ
          <br />
          ホーム画面のコンテンツ
          <br />
          ホーム画面のコンテンツ
          <br />
          ホーム画面のコンテンツ
          <br />
          ホーム画面のコンテンツ
          <br />
          ホーム画面のコンテンツ
          <br />
          ホーム画面のコンテンツ
          <br />
          ホーム画面のコンテンツ
          <br />
          ホーム画面のコンテンツ
          <br />
          ホーム画面のコンテンツ
          <br />
          ホーム画面のコンテンツ
          <br />
          ホーム画面のコンテンツ
          <br />
          ホーム画面のコンテンツ
          <br />
          ホーム画面のコンテンツ
          <br />
          ホーム画面のコンテンツ
          <br />
          ホーム画面のコンテンツ
          <br />
          ホーム画面のコンテンツ
        </p>
      </TabPanel>
      <TabPanel>
        <h2>検索</h2>
        <p>検索画面のコンテンツ</p>
      </TabPanel>
      <TabPanel>
        <h2>通知</h2>
        <p>通知画面のコンテンツ</p>
      </TabPanel>
      <TabPanel>
        <h2>プロフィール</h2>
        <p>プロフィール画面のコンテンツ</p>
      </TabPanel>
      <TabList className={styles.tabList}>
        <Tab className={styles.tab}>
          <IconHome size={24} />
          <span>ホーム</span>
        </Tab>
        <Tab className={styles.tab}>
          <IconHome size={24} />
          <span>検索</span>
        </Tab>
        <Tab className={styles.tab}>
          <IconHome size={24} />
          <span>通知</span>
        </Tab>
        <Tab className={styles.tab}>
          <IconHome size={24} />
          <span>プロフィール</span>
        </Tab>
      </TabList>
    </Tabs>
  );
}
