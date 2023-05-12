import { FC, ChangeEvent } from "react";
import styles from "./Input.module.css";

interface IInputProps {
  label?: string;
  placeholder: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const Input: FC<IInputProps> = ({
  label,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <label className={styles.input}>
      {label}
      <input
        className={styles.inputField}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </label>
  );
};
