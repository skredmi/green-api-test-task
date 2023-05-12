import { FC } from "react";
import { Message } from "../../ui/Message/Message";
import styles from "./ReceiveMessage.module.css";

interface IReceiveMessageProps {
  message: string;
}

export const ReceiveMessage: FC<IReceiveMessageProps> = ({ message }) => {
  return (
    <>
      <Message message={message} className={styles.receiveMessage} />
    </>
  );
};
