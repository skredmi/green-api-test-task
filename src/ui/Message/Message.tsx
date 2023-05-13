import { FC, RefObject } from "react";
import styles from "./Message.module.css";
import classnames from "classnames";

interface IMessageProps {
  message: string;
  className?: string;
  ref: RefObject<HTMLDivElement>
}

export const Message: FC<IMessageProps> = ({ message, className, ref }) => {
  const blockClass = classnames(styles.message, className);

  return <div className={blockClass} ref={ref}>{message}</div>;
};
