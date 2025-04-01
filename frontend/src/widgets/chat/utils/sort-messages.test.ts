import { describe, expect, it } from "vitest";
import { sortMessages } from "./sort-messages";
import { LocalMessage } from "../../../types/message";

describe("sortMessages", () => {
  it("exists", () => {
    expect(sortMessages).toBeDefined();
  });

  it("sorts messages by timestamp", () => {
    expect(
      sortMessages([
        {
          id: "2",
          timestamp: "2023-10-02T12:00:00Z",
        },
        {
          id: "3",
          timestamp: "2023-10-03T12:00:00Z",
        },
        {
          id: "1",
          timestamp: "2023-10-01T12:00:00Z",
        },
      ] as LocalMessage[])
    ).toEqual([
      {
        id: "1",
        timestamp: "2023-10-01T12:00:00Z",
      },
      {
        id: "2",
        timestamp: "2023-10-02T12:00:00Z",
      },
      {
        id: "3",
        timestamp: "2023-10-03T12:00:00Z",
      },
    ]);
  });
});
