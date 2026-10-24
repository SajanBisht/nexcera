# Contributing to Nexcera

Thanks for contributing to Nexcera! This guide explains how to set up the project, work on a feature, test your changes, and submit a pull request.

## 1. Project Overview

Nexcera is a stock-market forecasting and paper-trading project. Its repository is organized into separate components:

- `apps/frontend/` — React, TypeScript, and Vite frontend.
- `services/api/` — FastAPI backend and stock-data endpoints.
- `ml/` — Machine-learning and forecasting components.
- `data-pipeline/` — Data collection and processing.
- `contracts/` — Shared schemas and data contracts.
- `infrastructure/` — Infrastructure and deployment configuration.
- `tests/` — Shared or cross-component tests.

Some components are still under development. Check `docs/PROJECT_STATUS.md` before choosing a task.

## 2. Before You Start

1. Read this guide and the root `README.md`.
2. Review `docs/PROJECT_STATUS.md` to understand the current state.
3. Check GitHub Issues for existing tasks and known problems.
4. If you're planning a substantial change, open an issue or discuss the design with the team first.
5. Avoid duplicating work that another contributor has already started.

If you want to work on an issue, comment on it and coordinate with the team before starting.

## 3. Prerequisites

Install the tools required for the component you're working on.

- Git
- Python 3.14 for the current Python tooling and API environment
- Node.js 24 and npm for the frontend

Additional requirements may apply as other components are developed.

## 4. Clone the Repository

```bash
git clone https://github.com/SajanBisht/nexcera.git
cd nexcera
```

Check the repository status:

```bash
git status
git branch --show-current
```

## 5. Development Workflow

Use a separate branch for each feature, fix, or focused documentation change.

First, update your local `main` branch:

```bash
git switch main
git pull --ff-only origin main
```

Create a descriptive feature branch:

```bash
git switch -c feat/short-description
```

For a bug fix, use a name such as:

```bash
git switch -c fix/short-description
```

For documentation work, use:

```bash
git switch -c docs/short-description
```

Keep each pull request focused. Avoid combining unrelated features or large refactors in one PR.

## 6. Frontend Development

The frontend lives in `apps/frontend/`.

Install dependencies:

```bash
cd apps/frontend
npm ci
```

Start the development server:

```bash
npm run dev
```

Run lint checks:

```bash
npm run lint
```

Build the production frontend:

```bash
npm run build
```

Run linting and the production build before submitting frontend changes.

The current dashboard uses illustrative sample values. Do not describe those values as live market data.

## 7. Backend Development

The FastAPI service lives in `services/api/`.

Install the development and API dependencies from the repository root:

```bash
python -m pip install -r requirements-dev.txt
python -m pip install -r services/api/requirements.txt
```

Run the API locally:

```bash
uvicorn app.main:app --app-dir services/api --reload --port 8000
```

Run Python linting and formatting checks:

```bash
ruff check .
ruff format --check .
```

Run the test suite:

```bash
pytest -v
```

Add or update tests when changing API behavior, validation, error handling, or business logic.

## 8. Code Quality Guidelines

- Never commit secrets, raw datasets, or large model artifacts.
- Coordinate changes to shared contracts with affected team members.
- Document significant architecture changes.
- Do not claim model performance without reproducible evaluation.

- Keep code modular and give each module a clear responsibility.
- Follow the existing conventions of the component you're changing.
- Prefer clear names and straightforward implementations.
- Avoid unnecessary dependencies.
- Do not commit generated files, local build output, virtual environments, or dependency directories.
- Never commit API keys, passwords, access tokens, private credentials, or local environment files.
- Update documentation when setup steps, APIs, architecture, or development workflows change.
- Do not introduce real-money trading functionality or present forecasts as guaranteed outcomes.

## 9. Commit Messages

Use descriptive commit messages that identify the type and purpose of a change.

Examples:

```text
feat(api): add stock history endpoint
feat(frontend): add watchlist dashboard
fix(api): handle unavailable stock providers
test(api): cover invalid historical date ranges
docs: update project status
```

Keep commits focused and avoid vague messages such as `changes`, `updates`, or `final code`.

## 10. Pull Request Process

1. Finish your changes on your feature branch.
2. Run the relevant lint, formatting, build, and test checks.
3. Review your changes and check for accidental files or secrets.
4. Commit and push your branch:

   ```bash
   git add <relevant-files>
   git diff --cached --check
   git diff --cached
   git commit -m "type(scope): describe the change"
   git push -u origin <your-branch>
   ```

5. Open a pull request targeting `main`.
6. Describe the problem, the solution, and how you tested it.
7. Link related issues and add screenshots for visual frontend changes when useful.
8. Address review feedback and ensure the required CI checks pass.
9. Merge using the repository's configured merge strategy.

Do not push directly to `main` or force-push shared branches.

## 11. Pull Request Template

Use this structure when opening a PR:

### Summary
Describe what changed and why.

### Changes
- List the main changes.

### Validation
- List the tests, lint checks, builds, or manual verification performed.

### Related Issues
- Link related issues, if applicable.

### Notes
- Mention limitations, follow-up work, or anything reviewers should know.

## 12. Communication

- Discuss significant design changes before implementing them.
- Ask for clarification when requirements are unclear.
- Keep issues and PR descriptions current.
- Update `docs/PROJECT_STATUS.md` when a meaningful milestone changes the project's state.
- Use the team's agreed communication channel for coordination, but keep technical decisions and completed work recorded in GitHub.

Thanks for helping build Nexcera!
