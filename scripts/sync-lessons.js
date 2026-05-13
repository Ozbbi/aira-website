#!/usr/bin/env node
/* eslint-disable */
/**
 * Sync lessons from the mobile app into the website.
 *
 * Reads the three mobile lesson source files (seedLessons.ts,
 * aiFoundationsAdvanced.ts, codeLessons.ts), extracts the lesson array
 * literal from each, evaluates it as JS, and writes a single combined
 * lessons.json that the website can import as a static asset.
 *
 * Run: node scripts/sync-lessons.js
 *
 * The mobile files are pure data + types — no React-Native imports —
 * so the extraction is just "strip the TS chrome, eval the literal".
 */

const fs = require('fs');
const path = require('path');

const MOBILE_DATA = path.resolve(__dirname, '..', '..', 'mobile', 'src', 'data');
const OUT_FILE = path.resolve(__dirname, '..', 'src', 'data', 'lessons.json');

const SOURCES = [
  { file: 'seedLessons.ts', exportName: 'SEED_LESSONS' },
  { file: 'aiFoundationsAdvanced.ts', exportName: 'AI_FOUNDATIONS_ADVANCED' },
  { file: 'codeLessons.ts', exportName: 'CODE_LESSONS' },
];

/**
 * Extract a single array literal export from a TS source string.
 * Finds `export const X[: Type] = [` and returns from there through the
 * matching closing `];`. Uses a brace/bracket depth counter so it
 * handles nested arrays + objects correctly.
 */
function extractArrayLiteral(source, exportName) {
  const reg = new RegExp(
    `export\\s+const\\s+${exportName}\\s*(?::[^=]+)?=\\s*(\\[)`,
    'm',
  );
  const match = source.match(reg);
  if (!match) {
    throw new Error(`couldn't find export const ${exportName} in source`);
  }
  const startIdx = match.index + match[0].length - 1; // index of the opening [
  let depth = 0;
  let inString = false;
  let stringChar = '';
  let escape = false;
  let inLineComment = false;
  let inBlockComment = false;
  for (let i = startIdx; i < source.length; i++) {
    const c = source[i];
    const next = source[i + 1];
    if (inLineComment) {
      if (c === '\n') inLineComment = false;
      continue;
    }
    if (inBlockComment) {
      if (c === '*' && next === '/') { inBlockComment = false; i++; }
      continue;
    }
    if (escape) {
      escape = false;
      continue;
    }
    if (inString) {
      if (c === '\\') { escape = true; continue; }
      if (c === stringChar) { inString = false; }
      continue;
    }
    // Outside string + comment territory
    if (c === '/' && next === '/') { inLineComment = true; i++; continue; }
    if (c === '/' && next === '*') { inBlockComment = true; i++; continue; }
    if (c === '"' || c === "'" || c === '`') {
      inString = true;
      stringChar = c;
      continue;
    }
    if (c === '[' || c === '{') depth++;
    else if (c === ']' || c === '}') {
      depth--;
      if (depth === 0 && c === ']') {
        return source.slice(startIdx, i + 1);
      }
    }
  }
  throw new Error(`unbalanced brackets in ${exportName} (final depth ${depth})`);
}

/**
 * Evaluate the array literal as JS. We allow the literal to use
 * template strings + nested objects but nothing else funky. We sandbox
 * it inside a Function so it can't reach globals.
 */
function evalArrayLiteral(literal) {
  // Mobile data is pure JSON-ish, but uses TS features we need to scrub:
  //   - `as const` casts: " as const"
  //   - trailing-only assertions: ` as readonly [string, string]`
  // Strip them out conservatively.
  const cleaned = literal
    .replace(/\s+as\s+const\b/g, '')
    .replace(/\s+as\s+readonly\s+\[[^\]]+\]/g, '');
  // eslint-disable-next-line no-new-func
  return Function(`"use strict"; return (${cleaned});`)();
}

(function main() {
  const allLessons = [];
  for (const src of SOURCES) {
    const file = path.join(MOBILE_DATA, src.file);
    if (!fs.existsSync(file)) {
      console.warn(`[sync-lessons] missing ${file}, skipping`);
      continue;
    }
    const raw = fs.readFileSync(file, 'utf8');
    const literal = extractArrayLiteral(raw, src.exportName);
    const lessons = evalArrayLiteral(literal);
    console.log(`[sync-lessons] ${src.exportName}: ${lessons.length} lessons`);
    for (const l of lessons) {
      // Slim payload — drop quiz questions + airaFeedback strings to keep
      // the web bundle small. Web is a preview / catalog, not a quiz host.
      allLessons.push({
        id: l.id,
        trackId: l.trackId,
        title: l.title,
        character: l.character,
        airaIntro: l.airaIntro,
        learnFirst: l.learnFirst,
        realWorldScenario: l.realWorldScenario,
        scenes: l.scenes || [],
        airaOutro: l.airaOutro,
        takeaway: l.takeaway,
        // Surface a single sandbox starter prompt for the example example.
        followUpExplanations: l.followUpExplanations || null,
      });
    }
  }

  // Make sure target dir exists
  const dir = path.dirname(OUT_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  fs.writeFileSync(OUT_FILE, JSON.stringify(allLessons, null, 2));
  console.log(`[sync-lessons] wrote ${allLessons.length} lessons -> ${OUT_FILE}`);
})();
