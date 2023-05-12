import { FC, ChangeEvent } from "react";
import styles from "./MessageList.module.css";
import { Input } from "../../ui/Input/Input";
import { Button } from "../../ui/Button/Button";
import { TbCircleArrowRight } from "react-icons/tb";
import { SendMessage } from "../SendMessage/SendMessage";
import { ReceiveMessage } from "../ReceiveMessage/ReceiveMessage";

interface IMessageListProps {
  message: string;
  handleMessageChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSendMessage: () => void;
  handleReceiveMessage: () => void;
  sendMessageList: string[];
  receivedMessageList: string[];
  isRecipient: boolean;
}

export const MessageList: FC<IMessageListProps> = ({
  message,
  handleMessageChange,
  handleSendMessage,
  handleReceiveMessage,
  sendMessageList,
  receivedMessageList,
  isRecipient,
}) => {
  const messagesList = [
    { text: [...sendMessageList], category: "senter" },
    { text: [...receivedMessageList], category: "recipient" },
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.messageContainer}>
        {/*         {sendMessageList?.map((i, index) => (
          <div key={index}>
            <SendMessage message={i} />
          </div>
        ))}
        {receivedMessageList?.map((i, index) => (
          <div key={index}>
            <ReceiveMessage message={i} />
          </div>
        ))} */}

        {messagesList?.flatMap((i, index) => (
          <div key={index}>
            {i.category === "recipient" ? (
              <ReceiveMessage message={i.text} />
            ) : (
              <SendMessage message={i.text} />
            )}
          </div>
        ))}
      </div>
      <div className={styles.footer}>
        <Input
          placeholder="Type a message"
          value={message}
          onChange={handleMessageChange}
        />

        <Button
          type="button"
          disabled={!message}
          className={styles.messageButton}
          onClick={handleSendMessage}
        >
          <TbCircleArrowRight />
        </Button>
        <Button type="button" onClick={handleReceiveMessage} />
      </div>
    </div>
  );
};
