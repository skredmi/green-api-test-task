import { FC } from "react";
import { Message } from "../../ui/Message/Message";
import styles from "./SendMessage.module.css";

interface ISendMessageProps {
  message: string;
}

export const SendMessage: FC<ISendMessageProps> = ({ message }) => {
  return (
    <>
      <Message message={message} className={styles.sendMessage} />
    </>
  );
};
