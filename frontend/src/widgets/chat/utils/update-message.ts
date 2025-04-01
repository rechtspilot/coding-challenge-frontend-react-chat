import { LocalMessage } from "../../../types/message";
import { sortMessages } from "./sort-messages";

export function updateMessage(
  messages: LocalMessage[],
  id: string,
  patch: Partial<LocalMessage>
) {
  return sortMessages(
    messages.map((message) =>
      message.id === id ? { ...message, ...patch } : message
    )
  );
}
