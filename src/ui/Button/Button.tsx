import { FC, ReactNode } from "react";
import classnames from "classnames";
import styles from "./Button.module.css";

interface IButtonProps {
  children?: ReactNode;
  type: "button" | "submit";
  className?: string;
}

export const Button: FC<IButtonProps> = ({ children, type, className }) => {
  const blockClass = classnames(styles.button, className);

  return (
    <button className={blockClass} type={type}>
      {children}
    </button>
  );
};
