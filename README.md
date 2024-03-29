# Simple Invoice

<https://rendall.github.io/simple-invoice/>

A simple, secure, editable web-based invoice that

- Requires absolutely nothing from you
- Calculates itemization subtotal, taxes and total
- Saves your edit for when you return
- Customizable fields
- Localizable / internationalizable
- Minimal, seek design

[![simple-invoice](https://user-images.githubusercontent.com/293263/123436029-e06eaf80-d5d6-11eb-887b-86d50644633f.png)](https://rendall.github.io/simple-invoice/)

## Instructions

- View the web-page <https://rendall.github.io/simple-invoice/> in a browser
- Edit each field. Press tab to go to the next editable field
  - Your edits are saved automatically via cookies
  - Note that _subtotal_, _VAT_ and _total_ are recalculated when the line-item changes
- When ready, press the print command from your browser
  - For printer (or _destination_) select **Save as PDF**

### Simple Invoice Newsletter

[Sign up to receive information and updates](https://forms.gle/Z2emMmFxmV52pDzu8). Your information will be used for no other purpose, nor shared with anyone else.

### Run locally?

- [Clone it!](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository)
- [Install node](https://nodejs.dev/learn/how-to-install-nodejs)
- In the terminal, navigate to project directory and type `npm run start` or `npx http-server -a localhost`
- Follow instructions in the terminal, likely it is to open <http://localhost:8080>

## Limitations

- Euro-centric: uses Euros, calculates VAT
  - But you can change € to any other symbol
  - And you can delete or change the tax line
- Finn-centric: uses Finnish date locale
  - Always editable
- Local save: saves cookies only to your local storage
- One itemization row only
- Minimal style is fixed

## Technical Support / Suggestions / Feedback

- Go to <https://github.com/rendall/simple-invoice/issues/new>
- Give the issue a descriptive title
- Describe the situation

## Roadmap

- Add / remove itemization rows
- Change / remove tax label and rate
- Choose localization (e.g. "US", "FI", etc.) for currency and date formats

## Development

The `script.ts` file compiles into `script.js`, which is loaded by `index.html` when displayed by a web server

 - `npm install`
 - `npm run build`
 - `npm run start`
   - <http://localhost:8080>

## Privacy Policy

Data is collected and stored only in your local browser and so is entirely and only under your control. Simple Invoice has no interest in collecting this data nor ever will until the end of time.
