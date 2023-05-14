import { FC, ChangeEvent, useContext } from "react";
import { Chat } from "../Chat/Chat";
import styles from "./ChatList.module.css";
import { Button } from "../../ui/Button/Button";
import { AuthContext } from "../../utils/AuthProvider";
import { IAuthContext } from "../../types/AuthTypes";

interface IChatListProps {
  phoneNumber: string;
  handlePhoneNumberChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleShowChat: () => void;
}

export const ChatList: FC<IChatListProps> = ({
  phoneNumber,
  handlePhoneNumberChange,
  handleShowChat,
}) => {
  const auth = useContext<IAuthContext | null>(AuthContext);

  const handleLogoutClick = () => {
    auth?.setIsAuthenticated(false);
  };

  return (
    <div className={styles.list}>
      <Chat
        value={phoneNumber}
        onChange={handlePhoneNumberChange}
        handleShowChat={handleShowChat}
      />
      <Button type="button" onClick={handleLogoutClick}>
        Logout
      </Button>
    </div>
  );
};
