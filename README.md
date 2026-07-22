# ATELIER OBJECTS

A fully interactive demonstration e-commerce storefront recreated from the supplied reference screens.

## Stack

- Next.js App Router
- React and TypeScript
- local image assets only
- localStorage cart, favorites, product variants, and language preference
- no backend, payment provider, authentication, analytics, or data collection

## Routes

- `/` — home
- `/shop` — catalog, filtering, sorting, favorites
- `/product/[slug]` — gallery, color selection, details, bag and favorites
- `/cart` — persistent shopping bag and demo promo code `ATELIER10`
- `/checkout` — non-commercial checkout demonstration
- `/contact` — English I+G contact page
- `/ua/contact` — Ukrainian I+G contact page

## Contact

All contact actions use `mailto:igorcorp.tech@gmail.com`. No phone number is displayed or collected.

## Run locally

```bash
npm install
npm run dev
```

The project does not process real payments. The checkout completion is an on-device demonstration state.

## Publish with GitHub Pages

1. Create an empty GitHub repository.
2. Upload the contents of this project to the repository root and commit them to `main` or `master`.
3. Open **Settings → Pages** and set **Source** to **GitHub Actions**.
4. Open the **Actions** tab and wait for **Deploy to GitHub Pages** to finish.
5. The published URL appears in the completed workflow and in **Settings → Pages**.

The included workflow automatically detects the repository name and configures the correct base path. The same repository can also be imported directly into Vercel with no additional settings.
