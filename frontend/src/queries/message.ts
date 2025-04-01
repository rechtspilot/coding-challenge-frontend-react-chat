import { QueryFunctionContext } from "@tanstack/react-query";
import { SendMessagePayload } from "../../../shared/types";
import { fetchWithTimeout } from "../utils/fetch";
import { Message } from "../types/message";

export const MessageQueryKey = {
  all: ["messages"] as const,
  get: (sessionId: string) => [...MessageQueryKey.all, sessionId] as const,
};

export const MessageQueryFn = {
  async get({
    queryKey,
  }: QueryFunctionContext<ReturnType<typeof MessageQueryKey.get>>) {
    const response = await fetchWithTimeout(`/api/messages/${queryKey[1]}`);

    if (!response.ok) {
      throw new Error("Messages not found");
    }

    const data = (await response.json()) as Message[];

    return data;
  },
};

export const MessageMutationFn = {
  async create(payload: SendMessagePayload) {
    const response = await fetchWithTimeout("/api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Message not created");
    }
  },
};
