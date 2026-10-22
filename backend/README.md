# Backend

## Run locally

From this directory, create a `.env` file based on `env.example` and configure
`DATABASE_URL`, `TEST_DATABASE_URL`, and `JWT_SECRET_KEY`. Install dependencies,
apply migrations, and start the development server:

```powershell
uv sync --dev
uv run alembic upgrade head
uv run uvicorn app.main:app --reload
```

## Deploy to Vercel

Create a Vercel project for the backend and set its **Root Directory** to
`backend`. Vercel detects the FastAPI application in `app/main.py` and uses
`vercel.json` to configure its function execution time.

Add the backend settings as Vercel environment variables for each deployment
environment. At minimum, configure `DATABASE_URL`, `TEST_DATABASE_URL`,
`JWT_SECRET_KEY`, `FRONTEND_URL`, `CLOUDINARY_CLOUD_NAME`,
`CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET`. Do not commit `.env` or put
secret values in `vercel.json`.

## Public portfolio endpoint

`GET /api/v1/portfolio/` returns the display content managed by the backend in a
single response: `hero`, `about`, `projects`, `experiences`, `education`,
`skills`, and visible `social_links`. `hero` and `about` are `null` when no
record exists; collection fields are empty arrays when they have no records.

For example, with the server running locally:

```powershell
Invoke-RestMethod http://127.0.0.1:8000/api/v1/portfolio/
```

The frontend's Vite development server proxies `/api` requests to
`http://127.0.0.1:8000`. For deployments where the API is hosted separately,
set `VITE_API_BASE_URL` to the backend origin when building the frontend.

## Admin file uploads

Authenticated administrators can upload JPEG, PNG, and WebP images or PDF, DOC,
and DOCX documents using `POST /api/v1/uploads/` with a multipart `file` field.
Uploads are limited to 5 MB and stored in Cloudinary. The response includes the
secure URL that can be saved in portfolio image or resume fields. Configure
`CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET` in
the backend environment.

Certifications, testimonials, and service cards currently live in the frontend
constants and do not have backend models, so they are not included in this
response.