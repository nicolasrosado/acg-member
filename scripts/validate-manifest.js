#!/usr/bin/env node
/**
 * validate-manifest.js
 * Validates manifest.json against the ACG-DISCOVER-v1 schema.
 * Used by the verify-content GitHub Action on PRs.
 */

const fs = require('fs');
const path = require('path');

const MANIFEST_PATH = path.join(__dirname, '..', 'manifest.json');

const REQUIRED_FIELDS = {
  root: ['acg_protocol', 'member', 'achievements', 'stats', 'content', 'updated'],
  member: ['handle', 'github', 'joined', 'tagline', 'site_url'],
  stats: ['contributions', 'publications', 'vettings_passed', 'refusals_filed', 'audits_served', 'sessions_attended'],
  content: ['posts', 'projects', 'resources']
};

let errors = 0;

function check(condition, msg) {
  if (!condition) {
    console.error(`FAIL: ${msg}`);
    errors++;
  }
}

try {
  const raw = fs.readFileSync(MANIFEST_PATH, 'utf-8');
  const manifest = JSON.parse(raw);

  check(manifest.acg_protocol === 'ACG-DISCOVER-v1', 'acg_protocol must be "ACG-DISCOVER-v1"');

  for (const field of REQUIRED_FIELDS.root) {
    check(manifest[field] !== undefined, `Missing required root field: ${field}`);
  }

  if (manifest.member) {
    for (const field of REQUIRED_FIELDS.member) {
      check(manifest.member[field] !== undefined, `Missing required member field: ${field}`);
    }
    check(typeof manifest.member.handle === 'string' && manifest.member.handle.length > 0, 'member.handle must be a non-empty string');
    check(typeof manifest.member.github === 'string' && manifest.member.github.length > 0, 'member.github must be a non-empty string');
  }

  if (manifest.stats) {
    for (const field of REQUIRED_FIELDS.stats) {
      check(manifest.stats[field] !== undefined, `Missing required stats field: ${field}`);
      check(typeof manifest.stats[field] === 'number', `stats.${field} must be a number`);
    }
  }

  if (manifest.content) {
    for (const field of REQUIRED_FIELDS.content) {
      check(Array.isArray(manifest.content[field]), `content.${field} must be an array`);
    }
  }

  check(Array.isArray(manifest.achievements), 'achievements must be an array');

} catch (e) {
  console.error(`FAIL: Could not parse manifest.json: ${e.message}`);
  errors++;
}

if (errors > 0) {
  console.error(`\n${errors} validation error(s) found.`);
  process.exit(1);
} else {
  console.log('manifest.json is valid (ACG-DISCOVER-v1)');
}
