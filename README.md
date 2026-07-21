# Portfolio — Vinaykumar Venkateshkumar

Personal portfolio site for a propulsion / CFD engineering graduate.
Single-page layout with anchor navigation, built with Next.js and deployed on Vercel.

**Live:** https://vinaykumar.is-a.dev

Also reachable at https://vinaykumar-venkateshkumar.vercel.app (Vercel alias).

## Stack

- **Next.js 16** (App Router), statically prerendered
- **Tailwind CSS v4** via `@tailwindcss/postcss`
- **React 19**

## Structure

```
app/
  data.js      # all site content — edit here, not in the JSX
  page.js      # section composition only
  layout.js    # metadata, fonts, global shell
  globals.css  # scheme tokens, type scale, motion
  components/  # Nav, Hero, Section, Reveal, entry + contact + footer parts
public/
  Vinaykumar_Venkateshkumar_CV.pdf
  headshot.jpg            # 640x640 square crop used in the hero
headshot.jpg              # original portrait, kept as the crop source
Documents/
  Vinaykumar_Resume.pdf   # source resume the content was parsed from
docs/
  preview.png             # site screenshot (referenced by the is-a.dev PR)
```

Content lives in `app/data.js` as plain exported objects — profile, skills,
projects, experience, education, certifications. Updating the site means
editing that one file; the components map over it.

## Design system

The visual design follows [`docs/DESIGN_SPEC.md`](docs/DESIGN_SPEC.md) —
"Instrument Grade": dark-mode-first, monochrome, typography-led, with a single
orange accent. Tokens (colour, type scale, spacing, motion) are declared once in
`app/globals.css`; components use those tokens rather than ad-hoc values. The
spec's constraints are deliberate — no cards, no pills, no shadows, no rounded
corners beyond 2px on controls, and a closed list of four allowed animations.
Read it before making visual changes.

## Contact form

The contact form posts to [Web3Forms](https://web3forms.com). It reads a single
environment variable:

```
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your-access-key
```

If the variable is unset, the form is not rendered at all — the contact section
falls back to a plain mailto link, so the site never shows a form that silently
fails. Set the key in Vercel under Settings → Environment Variables, and locally
in `.env.local`.

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Deployment

Connected to Vercel with `main` as the production branch — pushes to `main`
deploy automatically. Pull requests get preview deployments.

The `vinaykumar.is-a.dev` domain is registered through the free
[is-a.dev](https://is-a.dev) registry. Its DNS records live in
[is-a-dev/register](https://github.com/is-a-dev/register): a `CNAME` in
`domains/vinaykumar.json` pointing at Vercel, plus a `TXT` challenge in
`domains/_vercel.vinaykumar.json` for Vercel's domain verification. Changing
where the domain points means opening a pull request against that repository.
