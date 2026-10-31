# PetPortal — Frontend

**PetPortal** is a web platform where beginner developers find a team, join pet projects and get their first real experience of building software together, experience they can put in a portfolio or CV.

This repository contains the web client. The API lives in [PetPortalBack](https://github.com/DotPointt/PetPortalBack).

## Why PetPortal

Competition for entry-level IT jobs is high and keeps growing. Employers don't want to hire people who still need training. Junior candidates often can't even get an interview because they have no real development experience, and they can't get that experience without a job. For employers, finding the right candidate costs a lot of time and money.

Plenty of developers also have a project idea but no team, and find it hard to put into words what kind of teammates and skills the project needs.

PetPortal helps developers start a career by practicing on real projects. On PetPortal they can find a team for a startup and find or create a project worth working on. The project was started by students of the Institute of Information Technology and Intelligent Systems at Kazan Federal University, who ran into this problem themselves. The institute's students are the first audience. The plan is to expand to other universities after that.

## Goals

- **Build a team around an idea.** A beginner developer publishes a project idea and gathers a team to build it.
- **Gain first experience.** Developers join existing pet projects, work together on them and add the result to their portfolio.
- **Connect developers and companies.** Companies use the platform to find young developers, publish technical tasks, get MVPs built and bring people to hackathons.
- **Make requirements easy to write.** An AI assistant on the project creation page will help pick a tech stack, decide which roles the team needs and list the skills each role requires (planned).
- **Be sustainable.** The platform earns money from paid project placement, promotion packages, partner advertising (jobs, hiring, education) and an AI assistant subscription.

## Who it is for

| Audience | What PetPortal gives them |
|---|---|
| Students and beginner developers | Practice on real projects, portfolio cases, a team to work with |
| Experienced and independent developers | Co-authors or a team, a place to try new technologies, a way to hand frontend/backend tasks to less experienced developers |
| Startups | A team to build and test an idea |
| Companies | A hiring pipeline, outsourced MVPs and prototypes, hackathon participants |

## Features

Already implemented:

- Project catalogue with search, filters (role, commercial/non-commercial, budget, tags, archived) and sorting
- Commercial and non-commercial projects, each with its own card and flow
- Create and edit projects: description, plan, requirements, expected result, team roles, tags, budget and deadlines
- Paid project placement through YooKassa
- Projects are archived automatically once their application deadline has passed
- Applications to projects (responses) and reviewing them as the project owner
- Favourites
- Real-time chat (SignalR) with email notifications about unread messages
- Sign-up with email confirmation, sign-in (JWT in a cookie), password recovery
- Personal account: my projects, responses, favourites, settings, avatar upload

Planned:

- AI assistant for describing a project idea, choosing the stack and defining team roles and requirements
- Promotion packages (Lite, Standard, Pro) to raise and pin a project in search results
- Partner advertising

## Tech stack

**Frontend (this repository):** React 18 + TypeScript, Vite, MobX, Axios, React Router, MUI, SASS + CSS Modules, Formik + Yup, SignalR client.

**Backend:** C# / ASP.NET Core 8 Web API, Entity Framework Core + PostgreSQL 17, Redis, MinIO, RabbitMQ, SignalR, JWT authentication, YooKassa payments.

## Project structure

| Folder | Contents |
|---|---|
| `src/pages` | Route-level pages: home, projects, project, account, chat, authorization |
| `src/components` | UI components grouped by feature (projects, filters, chat, account, auth, header, footer…) |
| `src/modals`, `src/popups` | Modal windows and popups |
| `src/stores` | MobX stores |
| `src/services` | API and real-time (SignalR) clients |
| `src/context` | React contexts (filters, roles) |
| `src/routes` | Router configuration |
| `src/config` | API URL configuration built from env variables |
| `src/types`, `src/utils`, `src/data` | Shared types, helpers and static data |

## Getting started

Requirements: Node.js 22 and a running [backend](https://github.com/DotPointt/PetPortalBack) (by default at http://localhost:5140).

```bash
npm install
```

```bash
npm run dev
```

The app opens at http://localhost:5173.

The API address is set in `.env.development` (used by `npm run dev`) and `.env.production` (used by `npm run build:prod`):

| Variable | Meaning | Development value |
|---|---|---|
| `VITE_API_BASE_URL` | API origin. Leave it empty when the API is served from the same origin. | `http://localhost:5140` |
| `VITE_API_BASE_PATH` | API path prefix | `/api` |

### Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Type-check and build |
| `npm run build:prod` | Build with production env |
| `npm run preview` | Preview the built app |
| `npm run lint` | Run ESLint |
| `npm run prettier` | Format the code |

### Docker

The `Dockerfile` builds the app and serves it with nginx. `nginx.conf` proxies `/api`, `/chat` (SignalR) and `/swagger` to the API container (`api:8080`).
