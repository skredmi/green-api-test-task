import { useState, ChangeEvent } from "react";
import { Chat } from "../Chat/Chat";
import styles from './ChatList.module.css';

export const ChatList = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const handlePhoneNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  return (
    <div className={styles.list}>
      <Chat value={phoneNumber} onChange={handlePhoneNumberChange} />
    </div>
  );
};
