import { LocalMessage } from "../../../types/message";

export function removeDuplicates(messages: LocalMessage[]) {
  const messageMap: Record<LocalMessage["id"], LocalMessage> = {};

  for (const message of messages) {
    if (!messageMap[message.id]) {
      messageMap[message.id] = message;
      continue;
    }

    // rewrite local message with server message
    if (
      new Date(message.timestamp).getTime() >
      new Date(messageMap[message.id].timestamp).getTime()
    ) {
      messageMap[message.id] = message;
    }
  }

  return Object.values(messageMap);
}
