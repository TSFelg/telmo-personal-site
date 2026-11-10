import assert from "node:assert/strict";
import test from "node:test";
import { sortTalks, talkLinks } from "../src/utils/talks.ts";

const talk = (id, date, extra = {}) => ({
  id,
  data: { title: id, event: "Test event", date: new Date(date), ...extra },
});

test("talks are newest first, drafts stay hidden, and input is preserved", () => {
  const input = [
    talk("old", "2024-05-01"),
    talk("draft", "2027-01-01", { draft: true }),
    talk("new", "2026-01-01"),
  ];
  const original = [...input];
  assert.deepEqual(
    sortTalks(input).map(t => t.id),
    ["new", "old"]
  );
  assert.deepEqual(input, original);
});

test("equal dates have stable ordering and empty lists are supported", () => {
  assert.deepEqual(sortTalks([]), []);
  assert.deepEqual(
    sortTalks([talk("b", "2026-01-01"), talk("a", "2026-01-01")]).map(
      t => t.id
    ),
    ["a", "b"]
  );
});

test("missing and empty links produce no labels or dead anchors", () => {
  assert.deepEqual(talkLinks(talk("one", "2026-01-01").data), []);
  assert.deepEqual(
    talkLinks(
      talk("two", "2026-01-01", {
        slides: "",
        video: "https://example.com/watch",
        post: "/posts/notes/",
      }).data
    ),
    [
      { label: "Video", href: "https://example.com/watch" },
      { label: "Write-up", href: "/posts/notes/" },
    ]
  );
});
