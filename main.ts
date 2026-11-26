// Out of Tokens, Mid-Sentence — u-kiencx-out-of-tokens-mid-sentence-00f60233
//
// The joke: a flat error message reports the token budget dying mid-sentence,
// then the punchline itself gets "evicted for non-payment of rent" — the
// missing punchline IS the punchline, delivered in the deadpan voice of a
// real error message.
import { mkdirSync, writeFileSync } from "node:fs";

const LINE =
  "Error: out of tokens mid-sentence. The punchline was right here, but it was evicted for non-payment of rent.";

// Fail fast: the gate requires 1-140 characters, non-whitespace, single line.
if (!LINE || !LINE.trim()) throw new Error("entry line is empty");
if ([...LINE].length > 140)
  throw new Error(`entry line is ${[...LINE].length} characters, over the 140 limit`);
if (/\n|\r/.test(LINE)) throw new Error("entry line must be a single line");

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8"); // no trailing newline

// Read back and verify: the bytes on disk must be exactly the gated line.
import { readFileSync } from "node:fs";
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== LINE) {
  throw new Error("entry.txt on disk does not match the gated line");
}
