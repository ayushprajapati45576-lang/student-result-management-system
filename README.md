# Student Result Management System

## Run locally

1. Start the Express API from the `server` directory with `npm run dev`. It reads `server/.env`; configure `LIVE_URL` to point to a local MongoDB database and set `JWT_SECRET`.
2. Start the React app from the `client` directory with `npm run dev`.
3. Open the local URL printed by Vite (normally `http://localhost:5173`). Vite forwards `/api` requests to the local API at `http://localhost:3000`.

Local development uses the local MongoDB database, not the production database. An admin account must exist in that local database to sign in locally; production accounts are not automatically copied over.

## Deploy to Vercel

Import this repository as a Vercel project and leave the **Root Directory** set to the repository root. The included `vercel.json` builds the React app in `client`, deploys the Express API as a serverless function, and falls back to `index.html` for client-side routes.

Set these environment variables in the Vercel project for **Production**, **Preview**, and **Development**:

- `LIVE_URL` — MongoDB connection string. Configure the database network access to allow connections from Vercel.
- `JWT_SECRET` — a newly generated, high-entropy secret.
- `CLIENT_URL` — optional extra allowed frontend origin; same-origin deployment does not require it.
- `VITE_API_URL` — optional API origin (for example, `https://your-api.vercel.app`) for a separately hosted API. Leave unset when frontend and API share this Vercel project.

After setting the variables, redeploy. Confirm `/` loads the app and `/api` responds before testing login and protected pages.

The local server also reads `server/.env` when started from the `server` directory. That file was previously tracked by Git, so rotate its MongoDB credentials and JWT secret before deploying; removing it from the latest revision does not remove it from Git history. Never commit environment files or place server secrets in `VITE_*` variables.
