#!/usr/bin/env node
/**
 * validate-content.js
 * Validates markdown content files have proper frontmatter.
 * Used by the verify-content GitHub Action on PRs.
 */

const fs = require('fs');
const path = require('path');

const CONTENT_DIR = path.join(__dirname, '..', 'content');
const REQUIRED_FRONTMATTER = ['title', 'date'];

let errors = 0;
let checked = 0;

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;
  const fm = {};
  for (const line of match[1].split('\n')) {
    const idx = line.indexOf(':');
    if (idx > 0) {
      fm[line.slice(0, idx).trim()] = line.slice(idx + 1).trim();
    }
  }
  return fm;
}

function scanDir(dir) {
  if (!fs.existsSync(dir)) return;
  for (const file of fs.readdirSync(dir)) {
    if (!file.endsWith('.md')) continue;
    checked++;
    const filePath = path.join(dir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const fm = parseFrontmatter(content);

    if (!fm) {
      console.error(`FAIL: ${filePath} — missing frontmatter (needs --- block)`);
      errors++;
      continue;
    }

    for (const field of REQUIRED_FRONTMATTER) {
      if (!fm[field]) {
        console.error(`FAIL: ${filePath} — missing required frontmatter field: ${field}`);
        errors++;
      }
    }

    if (fm.date && !/^\d{4}-\d{2}-\d{2}/.test(fm.date)) {
      console.error(`FAIL: ${filePath} — date must be in YYYY-MM-DD format`);
      errors++;
    }
  }
}

scanDir(path.join(CONTENT_DIR, 'posts'));
scanDir(path.join(CONTENT_DIR, 'projects'));
scanDir(path.join(CONTENT_DIR, 'resources'));

if (errors > 0) {
  console.error(`\n${errors} validation error(s) in ${checked} file(s).`);
  process.exit(1);
} else {
  console.log(`All ${checked} content file(s) valid.`);
}
