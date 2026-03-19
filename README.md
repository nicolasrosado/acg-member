# ACG Member Template

Your node in the AI Craftspeople Guild's decentralized network.

**The guild site is a hub, not a host. Your page is yours. The network is ours.**

## Quick Start

### 1. Fork this template
Click **"Use this template"** (or fork) to create your own copy.

### 2. Edit your identity
Open `manifest.json` and fill in your info:
- `handle` — your guild name
- `github` — your GitHub username
- `joined` — when you joined
- `tagline` — your motto
- `site_url` — update with your GitHub username

### 3. Add your avatar
Replace `assets/avatar.png` with your image.

### 4. Enable GitHub Pages
Go to **Settings > Pages** and set source to **main branch, root (/)**.
Your site will be live at `https://yourusername.github.io/ACG_Repo_Template/`

### 5. Register with the hub
Submit a PR to the [ACG Hub repo](https://github.com/AICraftspeopleGuild) adding your manifest URL to `data/registry.json`:
```json
{
  "handle": "YourHandle",
  "manifest_url": "https://yourusername.github.io/ACG_Repo_Template/manifest.json",
  "registered": "2026-03-19"
}
```
An existing member reviews and merges. You're in.

### 6. Start publishing
Add markdown files to `content/posts/`, `content/projects/`, or `content/resources/`.
GitHub Actions will auto-update your manifest. The hub discovers your content on its next crawl.

## How It Works

```
Your Repo (GitHub Pages)          ACG Hub (GitHub Pages)
  manifest.json ──────GET──────→ Discovery Action
                                      │
                                      ▼
                                 network.json
                                      │
                   ←──────GET─────────┘
              (your rank, leaderboard, network stats)
```

- **No servers.** GitHub Pages hosts everything.
- **No databases.** JSON files in git repos.
- **No API keys.** Public HTTPS GETs between static files.
- **No permission needed.** Fork, edit, PR, done.

## File Structure

```
├── index.html              # Your public profile page
├── manifest.json           # Machine-readable identity (ACG-DISCOVER-v1)
├── achievements.html       # Achievement showcase
├── content/
│   ├── posts/              # Your blog posts (markdown)
│   ├── projects/           # Project showcases (markdown)
│   └── resources/          # Shared resources (markdown)
├── assets/
│   ├── avatar.png          # Your avatar
│   └── style.css           # Customizable theme
├── data/
│   ├── local-stats.json    # Auto-updated by GitHub Actions
│   └── achievements.json   # Achievement definitions + unlocks
├── scripts/
│   ├── update-manifest.js  # Manifest auto-updater
│   ├── validate-manifest.js # Schema validator
│   └── validate-content.js  # Content frontmatter validator
├── .github/workflows/
│   ├── update-manifest.yml # Auto-updates manifest on push
│   └── verify-content.yml  # Validates content on PRs
├── CUSTOMIZE.md            # What to edit and what not to
└── README.md               # This file
```

## Gamification

Your profile shows your **Brain Tier** based on contribution points:

| Tier | Name | Points |
|------|------|--------|
| 0 | Smooth Brain | 0 |
| 1 | Wrinkled Brain | 100 |
| 2 | Big Brain | 500 |
| 3 | Galaxy Brain | 1,500 |
| 4 | Cosmic Brain | 5,000 |
| 5 | Transcendent Brain | 10,000 |

Earn points by attending sessions, publishing content, serving as reviewer/auditor, filing ethical refusals, and more. Unlock achievements displayed on your profile.

## Customization

See [CUSTOMIZE.md](CUSTOMIZE.md) for the full guide. Short version:
- **Edit** `manifest.json`, `assets/`, `content/` — make it yours
- **Keep** the manifest schema and protocol version — so the hub can find you
- **Theme** via CSS custom properties in `assets/style.css`

## The Protocol: ACG-DISCOVER-v1

This template implements the ACG-DISCOVER-v1 federation protocol:
1. Each member publishes a `manifest.json` at a known URL
2. The hub fetches all registered manifests on a schedule
3. The hub builds `network.json` (aggregate index)
4. Members fetch `network.json` for rankings and network data
5. No central server. Git is the backend. JSON is the database.

## License

Part of the [AI Craftspeople Guild](https://github.com/AICraftspeopleGuild).
Built with purpose and integrity.
