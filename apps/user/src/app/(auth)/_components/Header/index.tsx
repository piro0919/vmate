import { useClerk } from "@clerk/nextjs";
import { Lobster } from "next/font/google";
import styles from "./style.module.css";

const lobster = Lobster({
  display: "swap",
  subsets: ["latin"],
  weight: "400",
});

export default function Header(): JSX.Element {
  const { signOut } = useClerk();

  return (
    <header className={styles.header}>
      <div className={`${styles.title} ${lobster.className}`}>Vmate</div>
      <button onClick={() => signOut({ redirectUrl: "/" })}>Sign out</button>
    </header>
  );
}
