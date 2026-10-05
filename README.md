![Easy Calc — Less effort. More clarity.](public/banner.png)

<p align="center"><strong>English</strong> · <a href="README.tr.md">Türkçe</a></p>
<p align="center"><a href="https://talkdedsec.github.io/easy-calc/">Open the calculator</a> · <a href="#getting-started">Get started</a> · <a href="#calculation-rules">Calculation rules</a></p>

# Easy Calc

**Everyday calculations, made simple.** Percentages, discounts, increases and VAT in a focused interface, with instant answers.

## Features

- **Dark & light themes** — switch at any time; your preference is remembered on your device.
- **English and Turkish** — opens in your browser's language; controls, results, errors and number formatting follow the language you pick, and your choice is remembered.
- **Seven quick tools** — percentage, discount, increase, percentage ratio, percentage change, add VAT and remove VAT.
- **Classic calculator** — operator precedence, parentheses, negative values and decimals, without `eval`.
- **Less typing** — preset rates, live results, copy to clipboard and reusable session history.
- **Responsive & accessible** — large touch targets, visible keyboard focus and labeled controls.
- **Private by design** — calculations run in your browser. No account or analytics; only theme and language preferences use local storage.

Changing theme or language preserves your current inputs and calculation history. History is held in memory and clears on refresh.

## Getting started

Use Node.js 24.

```sh
git clone https://github.com/Talkdedsec/easy-calc.git
cd easy-calc
npm ci
npm run dev
```

Open the local URL printed in the terminal. On Windows, use `npm.cmd` if PowerShell blocks `npm.ps1`.

## Checks & builds

```sh
npm run typecheck
npm run lint
npm test
npm run build
```

`npm run build` writes the static site to `dist/`; `npm run preview` serves it locally. GitHub Actions runs every check above and publishes each push to `main`; pull requests only run checks. For a fork, set **Settings → Pages → Source → GitHub Actions** and update the repository / social-preview URLs.

## Calculation rules

| Tool | Formula |
| --- | --- |
| Percentage | amount × rate / 100 |
| Discount | amount × (1 − rate / 100) |
| Increase / add VAT | amount × (1 + rate / 100) |
| Remove VAT | inclusive amount / (1 + rate / 100) |
| Percentage ratio | part / whole × 100 |
| Percentage change | (new − old) / old × 100 |

- The old value for percentage change must be positive; the whole for a ratio cannot be zero.
- In the classic calculator, `%` divides the preceding value by 100: `1000 × 20% = 200`. `1000 + 20% = 1000.2`. Use **Increase** to add a percentage to an amount.
- Decimal input accepts a dot or comma. Do not enter thousands separators: use `1234.56` or `1234,56`.
- Output follows your language: `1,234.56` in English, `1.234,56` in Turkish.
- Rates are examples, not automatically selected tax rates.
- Results display up to eight decimal places. Standard JavaScript number precision applies.

## Keyboard

Focus the classic expression field to type a calculation. **Enter** calculates; **Esc** clears. All buttons are reachable with **Tab**.

## Project map

| Path | Purpose |
| --- | --- |
| `src/App.tsx` | Calculator interface and saved preferences |
| `src/design.css` | Responsive light and dark themes |
| `src/lib/i18n.ts` | English / Turkish text and locale formatting |
| `src/lib/math.ts` | Arithmetic parser and calculation formulas |
| `public/preferences.js` | Applies the saved theme and language before first paint |
| `public/banner.png` | README banner and social preview |
| `tests/` | Math and localization checks |
| `.github/workflows/pages.yml` | Checks and GitHub Pages publishing |
