// main.ts — Monday, Reviewed in One Line (v2 resubmit, rewrite)
// A one-line customer review of Monday, filed as a formal complaint
// with Tuesday. The review is assembled from four fixed fragments so
// the transport, the bus, the laptop and the lunch each get their own
// clause, then checked against the competition gates (1-200 chars,
// exactly one line) before being written to
// $MAKEFUN_OUTPUT_DIR/entry.txt with no trailing newline.
// Node 22, stdlib only, no network, fully deterministic.

import * as fs from "node:fs";
import * as path from "node:path";

const FRAGMENTS: readonly string[] = [
  "Monday: the bus left without me, ",
  "my laptop updated for forty minutes, ",
  "and lunch was a meeting that served sandwiches ",
  // \u2014 is the em dash before the complaint is lodged with Tuesday.
  "\u2014 I have lodged a formal complaint with Tuesday.",
];

function buildEntry(parts: readonly string[]): string {
  return parts.reduce((acc, part) => acc + part, "");
}

function checkEntry(text: string): void {
  const codePoints = Array.from(text);
  if (codePoints.length < 1 || codePoints.length > 200) {
    throw new Error(
      `entry must be 1-200 characters, got ${codePoints.length}`,
    );
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be blank");
  }
  if (/[\r\n]/.test(text)) {
    throw new Error("entry must be a single line");
  }
}

function resolveOutDir(): string {
  const fromEnv = process.env.MAKEFUN_OUTPUT_DIR;
  return fromEnv !== undefined && fromEnv !== "" ? fromEnv : "/output";
}

function main(): void {
  const entry = buildEntry(FRAGMENTS);
  checkEntry(entry);
  const outDir = resolveOutDir();
  fs.mkdirSync(outDir, { recursive: true });
  const target = path.join(outDir, "entry.txt");
  fs.writeFileSync(target, entry, { encoding: "utf8", flag: "w" });
  process.stdout.write(entry + "\n");
}

main();
