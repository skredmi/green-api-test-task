import { FC, ChangeEvent } from "react";
import { Chat } from "../Chat/Chat";
import styles from "./ChatList.module.css";

interface IChatListProps {
  phoneNumber: string;
  handlePhoneNumberChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleShowChat: () => void;
}

export const ChatList: FC<IChatListProps> = ({
  phoneNumber,
  handlePhoneNumberChange,
  handleShowChat
}) => {
  return (
    <div className={styles.list}>
      <Chat value={phoneNumber} onChange={handlePhoneNumberChange} handleShowChat={handleShowChat} />
    </div>
  );
};
