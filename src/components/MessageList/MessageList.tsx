import { FC } from "react";
import styles from "./MessageList.module.css";
import { Input } from "../../ui/Input/Input";
import { Button } from "../../ui/Button/Button";
import { TbCircleArrowRight } from "react-icons/tb";
import { SendMessage } from "../SendMessage/SendMessage";
import { ReceiveMessage } from "../ReceiveMessage/ReceiveMessage";

export const MessageList = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.messageContainer}>
        <SendMessage message="Send message"/>
        <ReceiveMessage message="Received message"/>
      </div>
      <div className={styles.footer}>
        <Input placeholder="enter a message" value onChange />
        <Button type="button" className={styles.messageButton}>
          <TbCircleArrowRight />
        </Button>
      </div>
    </div>
  );
};
