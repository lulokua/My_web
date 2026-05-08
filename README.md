# Asme Landing Page

React + TypeScript + Vite + Tailwind CSS landing page with Framer Motion and Lucide icons.

## Project Structure

```text
src/
  app/                  # App-level composition and global providers/hooks
  components/
    layout/             # Global layout shells
    navigation/         # Global navigation modules
  pages/
    home/               # Home page composition, page-only data and sections
  shared/
    constants/          # Cross-page constants, media URLs, config values
    hooks/              # Cross-page React hooks
```

Global UI, such as the Explore navigation, lives under `src/components/`.
Page-only sections stay under their page folder, for example `src/pages/home/`.

## Development

```bash
npm run dev
```

Open `http://localhost:5173`.

## Build

```bash
npm run build
```
