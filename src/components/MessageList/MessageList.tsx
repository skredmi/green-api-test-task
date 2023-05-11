import { FC } from "react";
import styles from "./MessageList.module.css";

export const MessageList = () => {
  return (
    <div className={styles.wrapper}>
      <div>Chat</div>
      <div>Input</div>
    </div>
  );
};
