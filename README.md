# Student Result Management System

## Deploy to Vercel

Import this repository as a Vercel project and leave the **Root Directory** set to the repository root. The included `vercel.json` builds the React app in `client`, deploys the Express API as a serverless function, and falls back to `index.html` for client-side routes.

Set these environment variables in the Vercel project for **Production**, **Preview**, and **Development**:

- `LIVE_URL` — MongoDB connection string. Configure the database network access to allow connections from Vercel.
- `JWT_SECRET` — a newly generated, high-entropy secret.
- `CLIENT_URL` — optional extra allowed frontend origin; same-origin deployment does not require it.
- `VITE_API_URL` — optional API origin (for example, `https://your-api.vercel.app`) for a separately hosted API. Leave unset when frontend and API share this Vercel project.

After setting the variables, redeploy. Confirm `/` loads the app and `/api` responds before testing login and protected pages.

The local server also reads `server/.env` when started from the `server` directory. That file was previously tracked by Git, so rotate its MongoDB credentials and JWT secret before deploying; removing it from the latest revision does not remove it from Git history. Never commit environment files or place server secrets in `VITE_*` variables.
