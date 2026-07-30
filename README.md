# Job Portal

A full-stack job portal web application built with React, Clerk, and Supabase. The platform provides separate experiences for candidates and recruiters, allowing users to search and apply for jobs or create and manage job postings.

## Features

### Candidate
- Sign up and log in using Clerk authentication
- Candidate onboarding and role selection
- Browse available jobs
- Search jobs by title
- Filter jobs by location and company
- View detailed job information
- Save and unsave jobs
- Apply for jobs with:
  - Years of experience
  - Skills
  - Education
  - Resume upload
- View submitted applications
- Track application status

### Recruiter
- Recruiter authentication and onboarding
- Create new job postings
- Add and manage companies
- View jobs posted by the recruiter
- Delete job postings
- Change hiring status between Open and Closed
- View candidate applications
- Download candidate resumes
- Update application status:
  - Applied
  - Interviewing
  - Hired
  - Rejected

## Tech Stack

### Frontend
- React
- Vite
- React Router
- Tailwind CSS
- shadcn/ui
- Lucide React
- React Hook Form
- Zod
- React Spinners
- `@uiw/react-md-editor`

### Authentication
- Clerk

### Backend / Database
- Supabase
- PostgreSQL
- Supabase Storage

### Deployment
- Netlify

## Project Structure

```text
src/
├── api/
│   ├── apiApplications.js
│   ├── apiCompanies.js
│   └── apiJobs.js
│
├── components/
│   ├── ui/
│   ├── application-card.jsx
│   ├── apply-job.jsx
│   ├── created-applications.jsx
│   ├── created-jobs.jsx
│   ├── job-card.jsx
│   └── ...
│
├── hooks/
│   └── use-fetch.jsx
│
├── layout/
│   └── app-layout.jsx
│
├── pages/
│   ├── landing.jsx
│   ├── onboarding.jsx
│   ├── job-listing.jsx
│   ├── job.jsx
│   ├── post-job.jsx
│   ├── saved-job.jsx
│   └── my-jobs.jsx
│
├── utils/
│   └── supabase.js
│
├── App.jsx
└── main.jsx
