# Offload — Landing Page

The website for **Offload** — "We automate the busywork so you don't have to."

This is a plain website (no coding tools required to run it). This guide is written for someone who **does not code**. Take it one section at a time.

---

## 1. See the site on your computer

Just **double-click `index.html`**. It opens in your web browser. That's it — that's the live page.

There's nothing to "install" or "build." The whole site is three files:

| File | What it is |
|------|------------|
| `index.html` | All the **words and sections** on the page |
| `styles.css` | The **colors, fonts, and layout** |
| `script.js` | The **buttons, menu, and contact form** behavior |

---

## 2. Change the words on the page

1. Open `index.html` in any text editor (Notepad works; **VS Code** is nicer and free).
2. Find the text you want to change, type your new text, and **save**.
3. Double-click `index.html` again (or refresh your browser) to see the change.

> Tip: Use **Ctrl+F** to search the file for the exact words you see on the page.

**Be careful not to delete the bits inside `< >` brackets** — those are instructions to the browser. Only change the plain words between them.

---

## 3. Connect the contact form (do this once — about 2 minutes)

Right now the "Request my free call" form is **not connected yet**. To make it email you when someone fills it out, we use a free service called **Formspree**.

1. Go to **https://formspree.io** and sign up (free) using **ahmad@hireoffload.com**.
2. Click **+ New Form**, name it "Offload Website", and use your email.
3. Formspree gives you a form link that looks like:
   `https://formspree.io/f/abcdwxyz`
   The part after the last `/` (here, `abcdwxyz`) is your **Form ID**.
4. Open `index.html`, press **Ctrl+F**, and search for: `YOUR_FORM_ID`
5. Replace `YOUR_FORM_ID` with your real Form ID and **save**.
6. Done. The first time someone submits, Formspree emails you to confirm it's really you — click the confirmation link once.

The free plan includes 50 submissions per month, which is plenty to start.

---

## 4. Put the site on the internet (free, with GitHub Pages)

Once the code is in your GitHub repo named **Offload** (Claude set this up for you), you can turn on free hosting:

1. Go to your repo on **github.com** → **Settings** → **Pages** (left sidebar).
2. Under **Source**, choose **Deploy from a branch**.
3. Pick branch **`main`** and folder **`/ (root)`**, then **Save**.
4. Wait ~1 minute. GitHub shows a live link like:
   `https://YOUR-USERNAME.github.io/Offload/`

That link is your live website.

### Using your real domain (hireoffload.com)

When you're ready to use **hireoffload.com** instead of the github.io link:

1. In the repo: **Settings → Pages → Custom domain**, type `hireoffload.com`, Save.
2. At whoever you bought the domain from (GoDaddy, Namecheap, etc.), add the DNS records GitHub shows you.
3. Tick **Enforce HTTPS** once it's available.

(If this step feels intimidating, send the github.io link to whoever manages your domain — it's a 5-minute job for them.)

---

## 5. Things you'll likely want to edit

| You want to change... | Search `index.html` for... |
|-----------------------|----------------------------|
| Your email address | `ahmad@hireoffload.com` |
| Your phone number | `919` |
| The big headline | `We automate the busywork` |
| Prices | `2,500` |
| A case study result | `18%` or `2&ndash;3 days` |

The colors match your business cards: a deep navy background (`--navy: #0F1923`) with a mint/teal accent (`--mint: #5CE0C2`). To tweak them, open `styles.css`, find those names near the top, and replace the color codes. Save and refresh.

---

## Questions?

Ahmad Afzal · Founder, Offload
ahmad@hireoffload.com · (919) 205-8628
