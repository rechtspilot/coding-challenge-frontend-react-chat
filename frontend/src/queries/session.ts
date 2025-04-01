import { QueryFunctionContext } from "@tanstack/react-query";
import { NewSessionResponse } from "../../../shared/types";
import { fetchWithTimeout } from "../utils/fetch";

export const SessionQueryKey = {
  all: ["sessions"] as const,
  get: (sessionId: string) => [...SessionQueryKey.all, sessionId] as const,
};

export const SessionQueryFn = {
  async getAll() {
    const response = await fetchWithTimeout("/api/sessions");
    if (!response.ok) {
      throw new Error("Sessions not found");
    }
    const data = (await response.json()) as NewSessionResponse[];
    return data;
  },
  async get({
    queryKey,
  }: QueryFunctionContext<ReturnType<typeof SessionQueryKey.get>>) {
    const [, sessionId] = queryKey;

    const allSessions = await SessionQueryFn.getAll();

    const session = allSessions.find(
      (session) => session.sessionId === sessionId
    );

    if (!session) {
      throw new Error("Session not found");
    }

    return session;
  },
};

export const SessionMutationFn = {
  async create() {
    const response = await fetchWithTimeout("/api/sessions", {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error("Session not created");
    }

    const data = (await response.json()) as NewSessionResponse;

    return data;
  },
};
