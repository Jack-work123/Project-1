# WHA Coding Starter

A ready-to-open starting point for building with Claude Code — with a built-in
AI helper team and house rules baked in. No terminal or setup required.

## 📖 New here? Read the guide first
The full Day-1 walkthrough lives at **`docs/index.html`** (open it in any browser),
or on the web once Pages is turned on (see "Publishing" below).

## 🚀 Start building (about 60 seconds)
1. Get this project onto your computer (clone it, or use "Use this template").
2. Open **Claude Desktop** → **Code** tab → **Local** → **Select folder** → choose this folder.
3. In the message box type `/agents` to meet your team, then start building.

## 🤖 Your agent team (in `.claude/agents/`)
- **code-mentor** — reviews your work and teaches the why. Use constantly.
- **security-reviewer** — catches unsafe handling of data and secrets.
- **supabase-migrator** — changes the database the safe, reversible way.
- **test-writer** — writes and runs tests.
- **pr-prep** — pre-publish checklist.
- **domain-expert** — knows your product (fill it in).

## 🔑 Connecting Supabase
Copy `.env.example` to `.env.local` and fill in your Project URL + publishable key
(Supabase dashboard → Connect, or Settings → API Keys). `.env.local` is gitignored,
so your keys are never committed.

---

## 🛠️ Maintainer notes (for James)

**Publish the guide as a website:** repo **Settings → Pages → Source: Deploy from a
branch → main → /docs**. The guide goes live at
`https://<org-or-user>.github.io/wha-coding-starter/`.

**Make it one-click reusable:** repo **Settings → General → ✅ Template repository**.
Then each new product = "Use this template" → new repo, agents already inside.

**Improve an agent once, everyone benefits:** edit a file in `.claude/agents/`,
commit, push. People pull (or use the template fresh) and get the update.
