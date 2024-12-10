"use client";
import { SignUp as ClerkSignUp } from "@clerk/nextjs";
import { Global, css } from "@emotion/react";
import styles from "./style.module.css";

export default function SignUp(): JSX.Element {
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
        <ClerkSignUp />
      </div>
    </>
  );
}
