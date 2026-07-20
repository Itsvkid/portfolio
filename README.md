# Portfolio — Vinaykumar Venkateshkumar

Personal portfolio site for a propulsion / CFD engineering graduate.
Single-page layout with anchor navigation, built with Next.js and deployed on Vercel.

**Live:** https://portfolio-psi-two-5o5rihl2zd.vercel.app

## Stack

- **Next.js 16** (App Router), statically prerendered
- **Tailwind CSS v4** via `@tailwindcss/postcss`
- **React 19**

## Structure

```
app/
  data.js      # all site content — edit here, not in the JSX
  page.js      # single-page layout, all sections
  layout.js    # metadata, fonts, global shell
  globals.css  # theme tokens + Tailwind import
public/
  Vinaykumar_Venkateshkumar_CV.pdf
Documents/
  Vinaykumar_Resume.pdf   # source resume the content was parsed from
```

Content lives in `app/data.js` as plain exported objects — profile, skills,
projects, experience, education, certifications. Updating the site means
editing that one file; `page.js` maps over it.

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Deployment

Connected to Vercel with `main` as the production branch — pushes to `main`
deploy automatically. Pull requests get preview deployments.
