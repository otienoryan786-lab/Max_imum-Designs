# Max_imum Designs website

A fast, free, static site (HTML, CSS, JavaScript). No build step.

## Put it online with GitHub Pages
1. Create a new public repository on GitHub, for example `maximum-designs`.
2. Upload everything inside this folder (index.html, css, js, assets, privacy.html, terms.html, robots.txt, sitemap.xml, .nojekyll).
3. Repository Settings > Pages > Source: "Deploy from a branch", Branch: `main`, folder `/ (root)`, Save.
4. After a minute your site is at `https://<your-username>.github.io/<repository-name>/`.
5. Your live address is `https://otienoryan786-lab.github.io/Max_imum-Designs/`. It is already set in `index.html`, `sitemap.xml` and `robots.txt`. If you move to a .co.ke domain later, replace it in those three files.

## Edit
- **Prices:** `js/prices.js` is the only place prices live. Change them there and the site and quote form update.
- **Text:** `index.html`. **Colours:** the `:root` variables at the top of `css/style.css`.
- **Work images:** replace files in `assets/img/` (keep similar 16:9 sizes).
- **Contact:** search for `254112816303` and `maxthompson786@gmail.com`. The Instagram handle `@shai_bwoi254` came from your old rate card: change it to your brand handle when you create one.
- **Legal pages:** `privacy.html` and `terms.html` come from the legal pack. Fill the [brackets] in them (date, registration status) before launch.

## Quote form
The form opens WhatsApp or email with the message filled in. It does not store anything. For a stored form later, use a form service and update the Privacy Policy.

## Custom domain (later)
Buy a .co.ke or .ke domain from a KENIC-accredited registrar, add it in Settings > Pages > Custom domain, and add the DNS records GitHub shows.

## Policies and business details (new)
The site now has these pages: `policies.html` (hub), `privacy.html`, `service-terms.html`, `ai-policy.html` and `terms.html`. Every page footer links to them.
**Business details live in one file: `js/business-details.js`.** Fill in your registered name, registration number, address, an ODPC sentence (only after you have checked it) and the last-updated date. The policy pages, the Policies hub and the footer update by themselves. Empty values are hidden.
You can write this file with the Update Business Details tool in the toolkit (folder `00_Update_Business_Details`), or edit it directly on GitHub (click the file, then the pencil icon, then Commit).

### Files to upload for this version (replace the ones in your repository)
`index.html`, `policies.html`, `privacy.html`, `service-terms.html`, `ai-policy.html`, `terms.html`, `sitemap.xml`, `robots.txt`, `css/style.css`, `js/business-details.js`, `js/details.js`.
