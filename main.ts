// main.ts — Monday, Reviewed in One Line
// Writes one fixed line — my own Monday, reviewed like a bad product —
// to $MAKEFUN_OUTPUT_DIR/entry.txt (default /output/entry.txt), with no
// trailing newline, and prints it to stdout. Deterministic on every run:
// the same Monday, the same verdict, forever. Stdlib only, no network.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// My Monday, in one breath: the alarm gave up before I did, Friday's
// leftovers were already waiting in the inbox, and the "quick sync" ate
// an hour. Reviewed like a product, because that is what it felt like.
const ENTRY =
  "Monday: my alarm snoozed itself, Friday left 47 unread emails in my inbox, and the 'quick sync' ate an hour — 0/10, would not Monday again.";

// Gate guard: the entry must be 1-200 characters of non-whitespace text,
// counted in code points so a multi-byte character still counts as one.
const entryLength = [...ENTRY].length;
if (entryLength < 1 || entryLength > 200 || ENTRY.trim().length === 0) {
  throw new Error(`entry must be 1-200 characters, got ${entryLength}`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
console.log(ENTRY);
