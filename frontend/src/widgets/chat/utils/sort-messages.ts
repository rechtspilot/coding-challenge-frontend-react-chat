import { LocalMessage } from "../../../types/message";

export function sortMessages(messages: LocalMessage[]): LocalMessage[] {
  return messages.slice().sort((a, b) => {
    const dateA = new Date(a.timestamp);
    const dateB = new Date(b.timestamp);
    return dateA.getTime() - dateB.getTime();
  });
}
