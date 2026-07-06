import { describe, expect, it } from "vitest";
import { removeQueuedFile } from "@/components/file-upload/use-file-upload";

describe("removeQueuedFile", () => {
  it("removes a pending upload without disturbing the remaining order", () => {
    const queue = [{ id: "one" }, { id: "two" }, { id: "three" }];
    expect(removeQueuedFile(queue, "two")).toEqual([{ id: "one" }, { id: "three" }]);
  });
});
