import { FC, ChangeEvent } from "react";
import { Input } from "../../ui/Input/Input";
import styles from "./Chat.module.css";
import { Button } from "../../ui/Button/Button";

interface IChatProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const Chat: FC<IChatProps> = ({ value, onChange }) => {
  return (
    <div className={styles.chat}>
      <Input
        label="Who would you like to start a chat with"
        placeholder="79001234567"
        value={value}
        onChange={onChange}
      />
      <Button type="button" className={styles.chatButton}>Chat</Button>
    </div>
  );
};
