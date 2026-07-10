# QuickTools.ai - Git & Version Control Rules

## Branching Strategy
- `main`: Production-ready code only. What is here is live on Vercel.
- `dev`: Active development branch.
- `feat/feature-name`: For new features (e.g., `feat/ai-writer`).
- `fix/bug-name`: For bug fixes (e.g., `fix/image-download`).

## Commit Messages
Use Conventional Commits format:
- `feat: added AI Logo Generator tool`
- `fix: resolved mobile overflow on navbar`
- `style: updated dark mode colors in Tailwind`
- `refactor: optimized database queries for blogs`
- `chore: updated dependencies`

## Pull Requests
- Never push directly to `main`.
- Create a PR from `feat` to `dev`, test it locally, and then merge to `main` for deployment.
