import { useState, ChangeEvent, useEffect, useCallback } from "react";
import axios from "axios";
import { ChatList } from "../../components/ChatList/ChatList";
import { MessageList } from "../../components/MessageList/MessageList";
import styles from "./MainPage.module.css";

export const MainPage = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isShowChat, setIsShowChat] = useState<boolean>(false);
  const [sendMessageList, setSendMessageList] = useState<string[]>([]);
  const [receivedMessageList, setReceivedMessageList] = useState<string[]>([]);
  const [isRecipient, setIsRecipient] = useState<boolean>(false);

  const handlePhoneNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  const handleMessageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleShowChat = () => {
    setIsShowChat(true);
  };

  const handleSendMessage = async () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      const idInstance = user.idInstance;
      const apiTokenInstance = user.apiTokenInstance;
      const url = `https://api.green-api.com/waInstance${idInstance}/SendMessage/${apiTokenInstance}`;
      const data = {
        chatId: `${phoneNumber}@c.us`,
        message: message,
      };

      try {
        await axios.post(url, data);
      } catch (error) {
        console.error(error);
      }
      setSendMessageList([...sendMessageList, message]);
      setIsRecipient(false);
      setMessage("");
    }
  };

  const handleReceiveMessage = useCallback(async () => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return;
    const user = JSON.parse(storedUser);
    const idInstance = user.idInstance;
    const apiTokenInstance = user.apiTokenInstance;
    const url = `https://api.green-api.com/waInstance${idInstance}/ReceiveNotification/${apiTokenInstance}`;

    try {
      const response = await axios.get(url);
      if (response && response.data) {
        const receivedMessage =
          response.data.body.messageData.textMessageData.textMessage;
        setReceivedMessageList([...receivedMessageList, receivedMessage]);
        setIsRecipient(true);
        const receiptId = response.data.receiptId;
        await axios.delete(
          `https://api.green-api.com/waInstance${idInstance}/DeleteNotification/${apiTokenInstance}/${receiptId}`
        );
      }
    } catch (error) {
      console.error(error);
    }
  }, [receivedMessageList]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      handleReceiveMessage();
    }, 5000);
    return () => clearInterval(intervalId);
  }, [handleReceiveMessage, receivedMessageList]);

  return (
    <div className={styles.main}>
      <ChatList
        phoneNumber={phoneNumber}
        handlePhoneNumberChange={handlePhoneNumberChange}
        handleShowChat={handleShowChat}
      />
      {isShowChat && (
        <MessageList
          message={message}
          handleMessageChange={handleMessageChange}
          handleSendMessage={handleSendMessage}
          sendMessageList={sendMessageList}
          handleReceiveMessage={handleReceiveMessage}
          receivedMessageList={receivedMessageList}
          isRecipient={isRecipient}
        />
      )}
    </div>
  );
};
