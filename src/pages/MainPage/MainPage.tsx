import {
  useState,
  ChangeEvent,
  useEffect,
  useCallback,
  KeyboardEvent,
} from "react";
import axios from "axios";
import { ChatList } from "../../components/ChatList/ChatList";
import { MessageList } from "../../components/MessageList/MessageList";
import { url } from "../../utils/url";
import styles from "./MainPage.module.css";
import { keyEnter } from "../../utils/constant";
import { IMessage } from "../../types/MessageType";

export const MainPage = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isShowChat, setIsShowChat] = useState<boolean>(false);
  const [sendMessageList, setSendMessageList] = useState<IMessage[]>([]);
  const [receivedMessageList, setReceivedMessageList] = useState<IMessage[]>([]);
  const [messagesList, setMessagesList] = useState<IMessage[]>([]);

  const handlePhoneNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
    setMessagesList([]);
  };

  const handleMessageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleShowChat = () => {
    setIsShowChat(true);
  };

  useEffect(() => {
    setMessagesList([]);
  }, [phoneNumber]);

  const handleSendMessage = async () => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      const idInstance = user.idInstance;
      const apiTokenInstance = user.apiTokenInstance;
      const urlSendMessage = url(idInstance, "SendMessage", apiTokenInstance);
      const data = {
        chatId: `${phoneNumber}@c.us`,
        message: message,
      };

      try {
        await axios.post(urlSendMessage, data);
      } catch (error) {
        console.error(error);
      }
      setSendMessageList([
        ...sendMessageList,
        { text: message, time: new Date().getTime(), type: "sender" },
      ]);
      setMessage("");
    }
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === keyEnter) {
      handleSendMessage();
    }
  };

  const handleReceiveMessage = useCallback(async () => {
    const storedUser = sessionStorage.getItem("user");
    if (!storedUser) return;
    const user = JSON.parse(storedUser);
    const idInstance = user.idInstance;
    const apiTokenInstance = user.apiTokenInstance;
    const urlReceiveMessage = url(
      idInstance,
      "ReceiveNotification",
      apiTokenInstance
    );

    try {
      const response = await axios.get(urlReceiveMessage);
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
        const receiptId = response.data.receiptId;
        const urlDeleteNotification = `${url(
          idInstance,
          "DeleteNotification",
          apiTokenInstance
        )}/${receiptId}`;
        await axios.delete(urlDeleteNotification);
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

  useEffect(() => {
    const messagesList = sendMessageList
      .concat(receivedMessageList)
      .sort((a, b) => {
        return a.time - b.time;
      });

    setMessagesList(messagesList);
  }, [receivedMessageList, sendMessageList]);

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
          handleKeyPress={handleKeyPress}
          messagesList={messagesList}
        />
      )}
    </div>
  );
};
