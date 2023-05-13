import { FC, ChangeEvent, useRef, useEffect, RefObject } from "react";
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
  messageCount: number
}

export const MessageList: FC<IMessageListProps> = ({
  message,
  handleMessageChange,
  handleSendMessage,
  messagesList,
  messageCount
}) => {

  const messagesRef = useRef<HTMLDivElement| null>(null)

  useEffect (() => {
    if (messagesRef.current !== null) {
      messagesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messageCount])

  return (
    <div className={styles.wrapper}>
      <div className={styles.messageContainer}>
        {messagesList?.map((i, index) => (
          <div key={index}>
            <Message
              message={i.text}
              className={i.type === "sender" ? styles.sendMessage : styles.receiveMessage}
              ref={messagesRef as RefObject<HTMLDivElement>}
            />
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
      </div>
    </div>
  );
};
