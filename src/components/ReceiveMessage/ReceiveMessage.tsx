import { FC } from "react";
import { Message } from "../../ui/Message/Message";
import styles from "./ReceiveMessage.module.css";

interface IReceiveMessageProps {
  message: string[];
}

export const ReceiveMessage: FC<IReceiveMessageProps> = ({ message }) => {
  return (
    <>
      {message.map((i, index) => (
        <Message key={index} message={i} className={styles.receiveMessage} />
      ))}
    </>
  );
};
