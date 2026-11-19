# Âmago Café

A responsive café website built with React, TypeScript, and Vite. Includes English and Portuguese with remembered language preference, keyboard-accessible menu tabs, native item dialogs, mobile navigation, visitor FAQs, and Instagram and Google Maps links.

## Run locally

The home page is `/`. The gallery is a separate page at `/galeria.html`, linked from the shared navigation. Both HTML entry points are included in the production build and work on static hosting without route rewrites.

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

## GitHub Actions

The `Website checks` workflow runs on pushes, pull requests, and manual dispatch. It builds both pages for `/Amago-cafe/`, tests the production output in Chrome, and publishes successful pushes to `amago` on GitHub Pages. Reports, failure traces, screenshots, and `dist/` are available as workflow artifacts for 14 days.

GitHub Pages address: `https://raposoyuri94-star.github.io/Amago-cafe/`. Repository Settings → Pages must use **GitHub Actions** as its source. Local development continues to use `/`; set `VITE_BASE_PATH=/Amago-cafe/` when building or previewing the GitHub Pages version locally.

## Content and imagery

- Requested reference: [@amago.cafe](https://www.instagram.com/amago.cafe/). Instagram blocked direct access during implementation; the site does not claim to reproduce the account's exact logo, colours, photos, or menu.
- The connection to Maputo and address at Avenida Mártires da Machava, 826, appeared in a [publicly indexed Instagram caption](https://socialauditor.io/profile/jeckcy.official). Confirm the address with the café before making this an official public website.
- The understated gold and raw-material direction is informed by the café designer's [public description of the Maputo project](https://be.linkedin.com/in/agnieszka-michalec-aa074728).
- Photography and the three original menu images were supplied by the user from @amago.cafe. They are hosted locally in `public/images`. The five café photographs appear across the website and in an accessible gallery with enlargement and keyboard navigation.
- Coffee, matcha, toast, and pastry selections and prices are transcribed in `src/menu.ts`. Prices and the R/G columns follow the supplied images; prices are displayed in Mozambican meticais (MT), as confirmed by the user. Cup volumes have not been inferred. Banana bread muffins are listed as Thursdays only. Original menu images can be opened from the menu section.

Edit general translations and destination links in `src/content.ts`, menu data in `src/menu.ts`, and menu/gallery interactions in `src/MenuGallery.tsx`. Styles live in `src/styles.css`.

The Terms & Conditions page is `/termos.html`, with Portuguese and English text in `src/Terms.tsx`. It covers this informational website rather than online sales or reservations. The café should review this starter wording and its business details before publishing it as its terms. The content-reuse section follows the general rights-holder principles described by [WIPO](https://www.wipo.int/en/web/copyright/); it does not claim a legal review or specific regulatory compliance.

This is a standalone React and TypeScript project. The production build output is `dist/`, ready for any static hosting provider.
