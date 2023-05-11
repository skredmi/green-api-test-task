import { ChatList } from "../../components/ChatList/ChatList";
import { MessageList } from "../../components/MessageList/MessageList";
import styles from "./MainPage.module.css";

export const MainPage = () => {
  return (
    <div className={styles.main}>
      <ChatList />
      <MessageList />
    </div>
  );
};
