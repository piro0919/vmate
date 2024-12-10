"use client";
import { SignIn as ClerkSignIn } from "@clerk/nextjs";
import { Global, css } from "@emotion/react";
import styles from "./style.module.css";

export default function SignIn(): JSX.Element {
  return (
    <>
      <Global
        styles={css`
          html {
            font-size: 100%;
          }
        `}
      />
      <div className={styles.wrapper}>
        <ClerkSignIn />
      </div>
    </>
  );
}
