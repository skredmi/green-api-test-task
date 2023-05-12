import { FC, ReactNode, MouseEvent } from "react";
import classnames from "classnames";
import styles from "./Button.module.css";

interface IButtonProps {
  children?: ReactNode;
  type: "button" | "submit";
  className?: string;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  disabled?:boolean
}

export const Button: FC<IButtonProps> = ({
  children,
  type,
  className,
  onClick,
  disabled
}) => {
  const blockClass = classnames(styles.button, className);

  return (
    <button className={blockClass} type={type} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};
