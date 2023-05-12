import { FC } from "react";
import { Message } from "../../ui/Message/Message";
import styles from "./SendMessage.module.css";

interface ISendMessageProps {
  message: string[];
}

export const SendMessage: FC<ISendMessageProps> = ({ message }) => {
  
  return (
    <>
      {message.map((i, index) => <Message key={index} message={i} className={styles.sendMessage} />)}
    </>
  );
};
