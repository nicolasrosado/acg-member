#!/usr/bin/env node
/**
 * update-manifest.js
 * Scans content/ directory for posts, projects, and resources.
 * Updates manifest.json content arrays and local-stats.json.
 * Runs automatically via GitHub Actions on push to main.
 */

const fs = require('fs');
const path = require('path');

const CONTENT_DIR = path.join(__dirname, '..', 'content');
const MANIFEST_PATH = path.join(__dirname, '..', 'manifest.json');
const STATS_PATH = path.join(__dirname, '..', 'data', 'local-stats.json');

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const fm = {};
  for (const line of match[1].split('\n')) {
    const idx = line.indexOf(':');
    if (idx > 0) {
      const key = line.slice(0, idx).trim();
      const val = line.slice(idx + 1).trim().replace(/^["']|["']$/g, '');
      fm[key] = val;
    }
  }
  return fm;
}

function scanDirectory(dir, type) {
  const items = [];
  if (!fs.existsSync(dir)) return items;

  for (const file of fs.readdirSync(dir)) {
    if (!file.endsWith('.md')) continue;
    const content = fs.readFileSync(path.join(dir, file), 'utf-8');
    const fm = parseFrontmatter(content);
    items.push({
      title: fm.title || file.replace('.md', '').replace(/-/g, ' '),
      date: fm.date || null,
      tags: fm.tags ? fm.tags.split(',').map(t => t.trim()) : [],
      excerpt: fm.excerpt || '',
      file: `content/${type}/${file}`
    });
  }

  return items.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
}

// Main
const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf-8'));

const posts = scanDirectory(path.join(CONTENT_DIR, 'posts'), 'posts');
const projects = scanDirectory(path.join(CONTENT_DIR, 'projects'), 'projects');
const resources = scanDirectory(path.join(CONTENT_DIR, 'resources'), 'resources');

manifest.content.posts = posts;
manifest.content.projects = projects;
manifest.content.resources = resources;
manifest.stats.publications = posts.length + projects.length;
manifest.updated = new Date().toISOString();

fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + '\n');

const stats = {
  total_posts: posts.length,
  total_projects: projects.length,
  total_resources: resources.length,
  last_updated: new Date().toISOString()
};
fs.writeFileSync(STATS_PATH, JSON.stringify(stats, null, 2) + '\n');

console.log(`Manifest updated: ${posts.length} posts, ${projects.length} projects, ${resources.length} resources`);
