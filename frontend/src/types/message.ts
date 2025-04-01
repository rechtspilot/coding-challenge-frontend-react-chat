import { MessageData } from "../../../shared/types";

export type Message = MessageData & {
  timestamp: string;
  backendId?: string;
};

export type LocalMessage = Message & { status?: MessageStatus };

export const MessageStatus = {
  Pending: "pending",
  Success: "success",
  Error: "error",
} as const;
export type MessageStatus = (typeof MessageStatus)[keyof typeof MessageStatus];
