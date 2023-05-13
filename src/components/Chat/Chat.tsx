import { FC, ChangeEvent } from "react";
import { Input } from "../../ui/Input/Input";
import styles from "./Chat.module.css";
import { Button } from "../../ui/Button/Button";
import { regexPhoneNumber } from "../../utils/regex";

interface IChatProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleShowChat: () => void;
}

export const Chat: FC<IChatProps> = ({ value, onChange, handleShowChat }) => {
  const isValidInputValue = regexPhoneNumber.test(value);

  return (
    <div className={styles.chat}>
      <Input
        label="Who would you like to start a chat with"
        placeholder="79001234567"
        value={value}
        onChange={onChange}
      />

      <Button
        type="button"
        className={styles.chatButton}
        onClick={handleShowChat}
        disabled={!isValidInputValue}
      >
        Chat
      </Button>
    </div>
  );
};
