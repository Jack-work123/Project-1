# WHA Project

## What this is
- (One sentence: what does this product do, and for whom?)

## Stack
- Database & login: Supabase
- Hosting / publishing: Vercel
- Source control: GitHub

## House rules — always follow
- Never commit directly to `main`. Work on a branch and open a pull request.
- Database changes go through Supabase migrations, never edit tables directly in Studio.
- Secrets live in `.env.local` (never shared) and in Vercel's dashboard — never in the code.
- Explain every change in plain English. Assume the reader is still learning.

## Your agent team (in .claude/agents)
- code-mentor      — reviews your work and teaches as it goes (use constantly)
- security-reviewer — checks for unsafe handling of data and secrets
- supabase-migrator — makes database changes the safe way
- test-writer       — writes and runs tests
- pr-prep           — pre-pull-request checklist
- domain-expert     — knows this product (fill it in)

## When I start a session, ask me
"What are we building today, and what's the goal?"

## Current focus
- (Update this at the end of each session so next time picks up instantly.)
