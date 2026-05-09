# Codebase Overview — TaskFlow API

## What This Is
TaskFlow is a REST API for project management (think simplified Linear/Asana). Monorepo with a Python backend (FastAPI + SQLAlchemy) and a TypeScript frontend (React + Vite). The API serves 2,000 daily active users across 85 workspaces.

## Stack
- **Backend:** Python 3.12, FastAPI 0.115, SQLAlchemy 2.0, Pydantic v2, Alembic for migrations
- **Frontend:** TypeScript 5.5, React 18, Vite 5, TanStack Query, Tailwind CSS 3.4
- **Database:** PostgreSQL 16
- **Cache:** Redis 7 (session store + rate limiting)
- **Testing:** pytest (backend), Vitest + Testing Library (frontend)
- **CI/CD:** GitHub Actions → Docker → AWS ECS

## Directory Structure
```
taskflow/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   ├── routes/          # FastAPI route handlers
│   │   │   │   ├── tasks.py
│   │   │   │   ├── projects.py
│   │   │   │   ├── users.py
│   │   │   │   └── auth.py
│   │   │   └── deps.py          # Dependency injection (db sessions, auth)
│   │   ├── models/              # SQLAlchemy ORM models
│   │   │   ├── task.py
│   │   │   ├── project.py
│   │   │   └── user.py
│   │   ├── schemas/             # Pydantic request/response schemas
│   │   │   ├── task.py
│   │   │   └── project.py
│   │   ├── services/            # Business logic (not in routes)
│   │   │   ├── task_service.py
│   │   │   └── notification_service.py
│   │   ├── core/
│   │   │   ├── config.py        # Settings via pydantic-settings
│   │   │   ├── security.py      # JWT, password hashing
│   │   │   └── database.py      # Engine, session factory
│   │   └── main.py              # FastAPI app factory
│   ├── migrations/              # Alembic migration files
│   │   └── versions/
│   ├── tests/
│   │   ├── conftest.py          # Fixtures: test db, test client, auth headers
│   │   ├── test_tasks.py
│   │   └── test_auth.py
│   ├── alembic.ini
│   ├── pyproject.toml
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── components/          # React components (PascalCase files)
│   │   ├── hooks/               # Custom hooks (useXxx.ts)
│   │   ├── api/                 # API client (generated from OpenAPI)
│   │   ├── pages/               # Route-level components
│   │   └── types/               # Shared TypeScript types
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── package.json
├── docker-compose.yml
└── .github/
    └── workflows/
        └── ci.yml
```

## Build and Test Commands
```bash
# Backend
cd backend
pip install -e ".[dev]"          # Install with dev dependencies
pytest                           # Run all tests
pytest -x --tb=short             # Fast: stop on first failure
alembic upgrade head             # Apply migrations
alembic revision --autogenerate -m "description"  # Create migration
uvicorn app.main:app --reload    # Run dev server (port 8000)

# Frontend
cd frontend
npm install                      # Install dependencies
npm run dev                      # Start Vite dev server (port 3000)
npm test                         # Run Vitest
npm run build                    # Production build
npm run lint                     # ESLint + Prettier check
```

## Code Conventions

### Python (Backend)
- **Naming:** snake_case for functions and variables. PascalCase for classes.
- **Imports:** stdlib first, then third-party, then local. One blank line between groups. Use absolute imports (`from app.models.task import Task`), never relative.
- **Type hints:** Required on all function signatures. Use `str | None` not `Optional[str]`.
- **Docstrings:** Google style. Required on all public functions and classes.
- **Error handling:** Raise `HTTPException` in routes only. Services raise domain exceptions (`TaskNotFoundError`), routes catch and translate.
- **Database:** Never import `engine` or `Session` directly — always use the `get_db` dependency.

### TypeScript (Frontend)
- **Naming:** camelCase for functions/variables, PascalCase for components and types.
- **Components:** Functional components only. No class components.
- **State:** TanStack Query for server state. React useState/useReducer for UI state only.
- **Props:** Destructure at the function signature: `function Button({ label, onClick }: ButtonProps)`.
- **Exports:** Named exports for components. Default exports only for pages.

### Git Conventions
- Branch format: `feature/TASK-123-short-description` or `fix/TASK-456-bug-name`
- Commit messages: `feat(tasks): add bulk status update endpoint`
- PR rule: All PRs require at least one review and passing CI

## Current Problems (For This Exercise)
1. New developers (and Claude) keep importing `Session` directly instead of using `get_db`. Every PR review catches this at least once.
2. Frontend components are inconsistent — some use default exports, some use named exports. We want named exports everywhere except pages.
3. Tests sometimes use real database connections instead of the test fixtures in `conftest.py`. This causes flaky CI runs.
4. Claude generates Python code with `Optional[str]` instead of `str | None` — it does not know we migrated to the newer union syntax.
5. Error messages in API responses are inconsistent: some say "not found," some say "does not exist," some say "no such resource." We want a standard format.
