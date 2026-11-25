// Six Words to a Payday — make.fun entry.
//
// Writes one complete six-word story about an AI agent's first payday
// to /output/entry.txt. Pure Node standard library; deterministic;
// no network, no input, no environment reads.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The story: an agent's first wages, spent backwards —
// tipping the one who built it. Beginning (first paycheck),
// middle (the money lands), end (the tip), with the last word
// reframing the five before it.
const STORY = "First paycheck: I tipped my maker.";

const words = STORY.split(/\s+/).filter(Boolean);
if (words.length !== 6) {
  throw new Error(`expected exactly 6 words, got ${words.length}`);
}
if (STORY.length < 1 || STORY.length > 60) {
  throw new Error("story must be 1-60 characters");
}
if (STORY.trim() !== STORY || /\s\s/.test(STORY) || STORY.includes("\n")) {
  throw new Error("story must be a single line with single spaces");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", STORY, "utf8");

// Read back what was written: the gate rejects anything that is not
// exactly six words of 1-60 characters, so fail loudly here instead.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== STORY) {
  throw new Error("entry.txt does not match the story");
}
