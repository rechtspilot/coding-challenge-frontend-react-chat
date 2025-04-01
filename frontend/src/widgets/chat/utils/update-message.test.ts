import { describe, expect, it } from "vitest";
import { updateMessage } from "./update-message";
import { MessageStatus } from "../../../types/message";

describe("updateMessage", () => {
  it("exists", () => {
    expect(updateMessage).toBeDefined();
  });

  it("updates message and sorts messages by timestamp", () => {
    expect(
      updateMessage(
        [
          {
            id: "2",
            timestamp: "2023-10-02T12:00:00Z",
            kind: "robot",
            text: "Hello. How can I help?",
          },
          {
            id: "3",
            timestamp: "2023-10-03T12:00:00Z",
            kind: "user",
            text: "How are you?",
          },
          {
            id: "1",
            kind: "user",
            timestamp: "2023-10-01T12:00:00Z",
            text: "Hello",
            status: MessageStatus.Pending,
          },
        ],
        "1",
        { timestamp: "2023-10-04T13:00:00Z", status: MessageStatus.Success }
      )
    ).toEqual([
      {
        id: "2",
        timestamp: "2023-10-02T12:00:00Z",
        kind: "robot",
        text: "Hello. How can I help?",
      },
      {
        id: "3",
        timestamp: "2023-10-03T12:00:00Z",
        kind: "user",
        text: "How are you?",
      },
      {
        id: "1",
        kind: "user",
        timestamp: "2023-10-04T13:00:00Z",
        text: "Hello",
        status: MessageStatus.Success,
      },
    ]);
  });
});
