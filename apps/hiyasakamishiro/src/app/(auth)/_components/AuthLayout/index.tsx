"use client";
import {
  IconClock,
  IconHome,
  IconMessageDots,
  IconUser,
} from "@tabler/icons-react";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useMemo } from "react";
import { Tab, TabList, Tabs } from "react-tabs";
import styles from "./style.module.css";

type TabItem = {
  icon: ReactNode;
  label: string;
  path: string;
};

const TAB_ITEMS = [
  {
    icon: <IconHome size={24} />,
    label: "ホーム",
    path: "/",
  },
  {
    icon: <IconMessageDots size={24} />,
    label: "コミュニティ",
    path: "/community",
  },
  {
    icon: <IconClock size={24} />,
    label: "スケジュール",
    path: "/schedule",
  },
  {
    icon: <IconUser size={24} />,
    label: "マイページ",
    path: "/mypage",
  },
] as const;

function NavTab({
  item,
  onClick,
}: {
  item: TabItem;
  onClick: () => void;
}): React.JSX.Element {
  return (
    <Tab className={styles.tab} onClick={onClick}>
      {item.icon}
      <span>{item.label}</span>
    </Tab>
  );
}

export type AuthLayoutProps = {
  children: ReactNode;
};

export default function AuthLayout({
  children,
}: AuthLayoutProps): React.JSX.Element {
  const pathname = usePathname();
  const router = useRouter();
  const selectedIndex = useMemo(
    () => TAB_ITEMS.findIndex((item) => item.path === pathname),
    [pathname],
  );

  return (
    <div className={styles.container}>
      <main className={styles.main}>{children}</main>
      <Tabs selectedIndex={selectedIndex}>
        <TabList className={styles.tabList}>
          {TAB_ITEMS.map((item) => (
            <NavTab
              item={item}
              key={item.path}
              onClick={() => router.push(item.path)}
            />
          ))}
        </TabList>
      </Tabs>
    </div>
  );
}
