import { FC, useEffect, useRef } from "react";
import { LocalMessage } from "../../types/message";
import styles from "./index.module.css";
import { Message } from "../message";

export type MessageListProps = {
  messages: LocalMessage[];
  onRetry: (message: LocalMessage) => void;
};

export const MessageList: FC<MessageListProps> = ({ messages, onRetry }) => {
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    listRef.current?.scroll({
      top: listRef.current.scrollHeight,
    });
  }, [messages]);

  return (
    <ul className={styles.list} ref={listRef}>
      {messages.map((message) => (
        <li key={message.id}>
          <Message message={message} onRetry={onRetry} />
        </li>
      ))}
    </ul>
  );
};
