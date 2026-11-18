# Âmago Café

A responsive café website built with React, TypeScript, and Vite. Includes English and Portuguese with remembered language preference, keyboard-accessible menu tabs, native item dialogs, mobile navigation, visitor FAQs, and Instagram and Google Maps links.

## Run locally

```sh
npm install
npm run dev
```

## Build and verify

```sh
npm run build
npm run test:e2e
```

Browser checks use an installed Google Chrome. They cover desktop and mobile layouts, asset loading, runtime errors, menu filters, dialog focus, language persistence, navigation, and FAQs. Screenshots are saved to the ignored `artifacts/` directory.

## Content and imagery

- Requested reference: [@amago.cafe](https://www.instagram.com/amago.cafe/). Instagram blocked direct access during implementation; the site does not claim to reproduce the account's exact logo, colours, photos, or menu.
- The connection to Maputo and address at Avenida Mártires da Machava, 826, appeared in a [publicly indexed Instagram caption](https://socialauditor.io/profile/jeckcy.official). Confirm the address with the café before making this an official public website.
- The understated gold and raw-material direction is informed by the café designer's [public description of the Maputo project](https://be.linkedin.com/in/agnieszka-michalec-aa074728).
- Photography is illustrative Unsplash imagery, hosted locally in `public/images`. It does not depict Âmago. Disclosures appear alongside the imagery and menu. Source image IDs and a re-download script are in `scripts/download-assets.mjs`.
- Menu selections are clearly marked as illustrative. No prices, unverified hours, phone numbers, booking promises, or testimonials are fabricated. The Instagram account is the destination for up-to-date information.

Edit translations, menu inspiration, and destination links in `src/content.ts`. Replace photos in `public/images` with approved brand photography when available. Styles live in `src/styles.css`.

This is a standalone React and TypeScript project. The production build output is `dist/`, ready for any static hosting provider.
