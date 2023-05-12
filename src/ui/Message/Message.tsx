import { FC } from "react";
import styles from "./Message.module.css";
import classnames from "classnames";

interface IMessageProps {
  message: string;
  className?: string;
}

export const Message: FC<IMessageProps> = ({ message, className }) => {
  const blockClass = classnames(styles.message, className);

  return <div className={blockClass}>{message}</div>;
};
