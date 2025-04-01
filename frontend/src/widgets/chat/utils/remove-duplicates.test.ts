import { describe, expect, it } from "vitest";
import { removeDuplicates } from "./remove-duplicates";
import { LocalMessage } from "../../../types/message";

describe("removeDuplicates", () => {
  it("exists", () => {
    expect(removeDuplicates).toBeDefined();
  });

  it("removes duplicates", () => {
    expect(
      removeDuplicates(
        [
          {
            id: "2",
            timestamp: "2023-10-02T12:00:00Z",
          },
          {
            id: "2",
            timestamp: "2023-10-02T12:00:00Z",
          },
          {
            id: "1",
            timestamp: "2023-10-01T12:00:00Z",
          },
        ].sort() as LocalMessage[]
      )
    ).toEqual(
      [
        {
          id: "1",
          timestamp: "2023-10-01T12:00:00Z",
        },
        {
          id: "2",
          timestamp: "2023-10-02T12:00:00Z",
        },
      ].sort()
    );
  });

  it("picks message created later", () => {
    expect(
      removeDuplicates(
        [
          {
            id: "2",
            timestamp: "2023-10-02T12:00:00Z",
          },
          {
            id: "2",
            timestamp: "2023-10-03T12:00:00Z",
          },
          {
            id: "1",
            timestamp: "2023-10-01T12:00:00Z",
          },
        ].sort() as LocalMessage[]
      )
    ).toEqual(
      [
        {
          id: "1",
          timestamp: "2023-10-01T12:00:00Z",
        },
        {
          id: "2",
          timestamp: "2023-10-03T12:00:00Z",
        },
      ].sort()
    );
  });
});
