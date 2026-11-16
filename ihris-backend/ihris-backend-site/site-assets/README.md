# site-assets

Static files that belong to this site and must survive frontend rebuilds.

The backend serves this folder **before** `public/`, so a file here replaces the
file with the same path in `public/` (the copied `ihris-frontend/dist`).

Examples:

| File here                | Overrides                       |
|--------------------------|---------------------------------|
| `flag_en.svg`            | `/flag_en.svg` (language menu)  |
| `images/MOHLogo.png`     | `/images/MOHLogo.png` (header)  |
| `favicon.ico`            | `/favicon.ico`                  |

Only put files you have customised here; everything else keeps coming from `public/`.
After deploying a changed file, browsers may need a hard refresh to drop the cached copy.
