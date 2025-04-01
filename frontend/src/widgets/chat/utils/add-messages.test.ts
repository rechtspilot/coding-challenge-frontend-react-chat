import { describe, expect, it } from "vitest";
import { addMessages } from "./add-messages";
import { MessageStatus } from "../../../types/message";

describe("addMessages", () => {
  it("exists", () => {
    expect(addMessages).toBeDefined();
  });

  it("merges, sorts and removes duplicates", () => {
    expect(
      addMessages(
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
            id: "4",
            kind: "user",
            timestamp: "2023-10-04T12:00:00Z",
            text: "Hello",
            status: MessageStatus.Pending,
          },
          {
            id: "6",
            kind: "user",
            timestamp: "2023-10-04T12:01:00Z",
            text: "Come on it's not so bad",
            status: MessageStatus.Pending,
          },
        ],
        [
          {
            id: "2",
            timestamp: "2023-10-03T12:00:00Z",
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
            id: "4",
            kind: "user",
            timestamp: "2023-10-04T12:00:50Z",
            text: "Hello",
          },
          {
            id: "5",
            kind: "robot",
            timestamp: "2023-10-04T12:00:55Z",
            text: "Not you again, god please no",
          },
        ]
      )
    ).toEqual([
      {
        id: "2",
        timestamp: "2023-10-03T12:00:00Z",
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
        id: "4",
        kind: "user",
        timestamp: "2023-10-04T12:00:50Z",
        text: "Hello",
      },
      {
        id: "5",
        kind: "robot",
        timestamp: "2023-10-04T12:00:55Z",
        text: "Not you again, god please no",
      },
      {
        id: "6",
        kind: "user",
        timestamp: "2023-10-04T12:01:00Z",
        text: "Come on it's not so bad",
        status: MessageStatus.Pending,
      },
    ]);
  });
});
