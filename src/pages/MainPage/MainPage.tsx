import { useState, ChangeEvent, useEffect, useCallback } from "react";
import axios from "axios";
import { ChatList } from "../../components/ChatList/ChatList";
import { MessageList } from "../../components/MessageList/MessageList";
import styles from "./MainPage.module.css";

export const MainPage = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isShowChat, setIsShowChat] = useState<boolean>(false);
  const [sendMessageList, setSendMessageList] = useState<
    { text: string; time: number; type: string }[]
  >([]);
  const [receivedMessageList, setReceivedMessageList] = useState<
    { text: string; time: number; type: string }[]
  >([]);
  const [messagesList, setMessagesList] = useState<
    { text: string; time: number; type: string }[]
  >([]);
  const [messageCount, setMessageCount] = useState<number>(0);

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
      setSendMessageList([
        ...sendMessageList,
        { text: message, time: new Date().getTime(), type: "sender" },
      ]);
      setMessageCount(messageCount + 1);
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
        setReceivedMessageList([
          ...receivedMessageList,
          {
            text: receivedMessage,
            time: new Date().getTime(),
            type: "recipient",
          },
        ]);
        setMessageCount(messageCount + 1);
        const receiptId = response.data.receiptId;
        await axios.delete(
          `https://api.green-api.com/waInstance${idInstance}/DeleteNotification/${apiTokenInstance}/${receiptId}`
        );
      }
    } catch (error) {
      console.error(error);
    }
  }, [messageCount, receivedMessageList]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      handleReceiveMessage();
    }, 5000);
    return () => clearInterval(intervalId);
  }, [handleReceiveMessage, receivedMessageList]);

  useEffect(() => {
    const messagesList = sendMessageList
      .concat(receivedMessageList)
      .sort((a, b) => {
        return a.time - b.time;
      });

    setMessagesList(messagesList);
  }, [receivedMessageList, sendMessageList]);

  console.log(messagesList);

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
          messagesList={messagesList}
          messageCount={messageCount}
        />
      )}
    </div>
  );
};
