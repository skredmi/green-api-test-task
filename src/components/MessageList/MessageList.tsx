import { FC, ChangeEvent, useRef, useEffect, KeyboardEvent } from "react";
import styles from "./MessageList.module.css";
import { Input } from "../../ui/Input/Input";
import { Button } from "../../ui/Button/Button";
import { TbCircleArrowRight } from "react-icons/tb";
import { Message } from "../../ui/Message/Message";

interface IMessageListProps {
  message: string;
  handleMessageChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSendMessage: () => void;
  messagesList: { text: string; time: number; type: string }[];
  handleKeyPress: (event: KeyboardEvent<HTMLInputElement>) => void;
}

export const MessageList: FC<IMessageListProps> = ({
  message,
  handleMessageChange,
  handleSendMessage,
  messagesList,
  handleKeyPress,
}) => {
  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messagesList]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.messageContainer}>
        {messagesList?.map((i, index) => (
          <div key={index}>
            <Message
              message={i.text}
              className={
                i.type === "sender" ? styles.sendMessage : styles.receiveMessage
              }
              ref={messagesRef}
            />
          </div>
        ))}
      </div>
      <div className={styles.footer}>
        <Input
          placeholder="Type a message"
          value={message}
          onChange={handleMessageChange}
          onKeyDown={handleKeyPress}
        />

        <Button
          type="button"
          disabled={!message}
          className={styles.messageButton}
          onClick={handleSendMessage}
        >
          <TbCircleArrowRight />
        </Button>
      </div>
    </div>
  );
};
