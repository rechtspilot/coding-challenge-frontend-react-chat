import { nanoid } from "nanoid";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  MessageMutationFn,
  MessageQueryFn,
  MessageQueryKey,
} from "../../queries/message";
import { FC, useEffect, useState } from "react";
import { SendMessagePayload } from "../../../../shared/types";
import { LocalMessage, MessageStatus } from "../../types/message";
import { InputForm } from "../../components/input-form";
import styles from "./index.module.css";
import { MessageList } from "../../components/message-list";
import { updateMessage } from "./utils/update-message";
import { addMessages } from "./utils/add-messages";
import { Loader } from "../../components/loader";

export type ChatProps = {
  sessionId: string;
};

export const Chat: FC<ChatProps> = ({ sessionId }) => {
  const [messages, setMessages] = useState<LocalMessage[]>([]);

  const messageQuery = useQuery({
    queryKey: MessageQueryKey.get(sessionId),
    queryFn: MessageQueryFn.get,
    enabled: Boolean(sessionId),
  });

  useEffect(() => {
    if (messageQuery.data) {
      setMessages((state) => addMessages(state, messageQuery.data));
    }
  }, [messageQuery.data, setMessages]);

  const queryClient = useQueryClient();

  const createMessage = useMutation({
    mutationFn: MessageMutationFn.create,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: MessageQueryKey.get(variables.sessionId),
      });
    },
    onError(_error, variables) {
      setMessages((state) =>
        updateMessage(state, variables.message.id, {
          status: MessageStatus.Error,
        })
      );
    },
  });

  function handleFormSubmit(input: string) {
    const message: SendMessagePayload["message"] = {
      text: input,
      id: nanoid(),
    };

    const localMessage: LocalMessage = {
      ...message,
      timestamp: new Date().toISOString(),
      kind: "user",
      status: MessageStatus.Pending,
    };

    setMessages((state) => addMessages(state, [localMessage]));

    createMessage.mutate({
      message,
      sessionId,
    });
  }

  function handleRetry(failedMessage: LocalMessage) {
    setMessages((state) =>
      updateMessage(state, failedMessage.id, {
        status: MessageStatus.Pending,
        timestamp: new Date().toISOString(),
      })
    );

    createMessage.mutate({
      message: {
        text: failedMessage.text,
        id: failedMessage.id,
      },
      sessionId,
    });
  }

  return (
    <div className={styles.wrap}>
      {messageQuery.isPending ? (
        <Loader />
      ) : (
        <>
          <div className={styles.listWrap}>
            <MessageList messages={messages} onRetry={handleRetry} />
          </div>
          <InputForm
            onSubmit={handleFormSubmit}
            loading={createMessage.isPending}
          />
        </>
      )}
    </div>
  );
};
