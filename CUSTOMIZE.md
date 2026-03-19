# Customizing Your ACG Member Page

Welcome to the guild. This template is yours to make your own.
Here's what to edit and what to leave alone.

## MUST Edit (required to join the network)

### `manifest.json`
Update these fields with your info:
```json
{
  "member": {
    "handle": "YourHandle",
    "github": "YourGitHubUsername",
    "joined": "2026-03-19",
    "tagline": "your personal tagline",
    "avatar_url": "./assets/avatar.png",
    "site_url": "https://yourgithubusername.github.io/ACG_Repo_Template/"
  }
}
```

### `assets/avatar.png`
Replace with your photo, icon, or any image that represents you.

## SHOULD Edit (makes your page useful)

### `content/posts/`
Add markdown files for blog posts. Format:
```markdown
---
title: My Post Title
date: 2026-03-19
tags: ethics, ai, craft
excerpt: A short summary of the post.
---

Your post content here in markdown.
```

### `content/projects/`
Same format as posts, for project showcases.

### `content/resources/`
Guides, tools, references you want to share with the guild.

## CAN Edit (personalization)

### `assets/style.css`
The CSS custom properties at the top control the entire theme:
```css
:root {
  --bg-primary: #0a0a0a;     /* Main background */
  --accent: #4ae08a;          /* Guild green — change to your color */
  --font-mono: 'IBM Plex Mono', monospace;
}
```
Change colors, fonts, spacing — make it yours.

### `index.html`
Modify the layout, add sections, rearrange things.
Keep the manifest.json loading logic intact so the hub can still discover you.

### `achievements.html`
Adjust display preferences, add custom sections.

## MUST NOT Edit (breaks the protocol)

### `manifest.json` schema structure
The field names and nesting must stay the same. The hub reads this file
automatically — if the structure changes, discovery breaks.

### `manifest.json` → `acg_protocol`
Must remain `"ACG-DISCOVER-v1"`.

### `.github/workflows/`
These automate your manifest updates. Editing them may break auto-updates.
If you know what you're doing, go ahead — but the defaults work.

### Hub communication JavaScript
The `loadNetwork()` and related functions in `index.html` talk to the hub.
Modify the display, but keep the fetch logic intact.

## Philosophy

> The template gives you guild identity.
> Your edits give you personal identity.
> The constraint is the schema (so the hub can read your manifest).
> Everything else is yours.

Thomas's page should look like Thomas's page.
Alex's page should look like Alex's page.
The guild aesthetic is a shared thread, not a uniform.
