# Cartoon studio website

A one-page site (plain HTML/CSS/JS, no backend) that shows your cartoons and collects orders.
**Every setting lives in `config.js`.** You never need to touch the other files.

| File | What it is |
|---|---|
| `config.js` | Your name, prices, links, contact, and the list of sample videos |
| `videos/` | Web-sized sample videos + cover images |
| `add-video.sh` | Shrinks a new reel for the web and prints the line to paste into `config.js` |
| `index.html`, `style.css`, `app.js` | The page itself |

## Placeholders to fill in (all in `config.js`)

| Setting | Now | What to do |
|---|---|---|
| `businessName` | "Toonbox Stories" (working name) | Pick your name |
| `personalPrice` | $29 | Confirm |
| `brandPrice` | $129 | Pick $99–199 |
| `deliveryDays` | 3–5 | Confirm how many days after script approval |
| `formUrl` | empty → shows a "message us on TikTok" box | Paste your Tally form link |
| `paymentUrl` | empty → pay button hidden | Paste your PayPal.me / Stripe link |
| `tiktokHandle` | "yourhandle" | Your TikTok handle, no @ |
| `instagramHandle`, `email` | empty | Optional |

Also check the FAQ answers in `index.html` (one round of small fixes after delivery; brand ads cover own social, website and in-store use).

## Order form: Tally (free)

Why Tally: the free plan has unlimited forms and submissions, **file uploads** (customers can attach photos), emails you on every order, and embeds cleanly on phones. Google Forms needs customers to sign in to upload photos; Formspree's free tier is 50 submissions/month and no uploads.

Make the form at tally.so with these questions:
1. Your name
2. Email or TikTok/Instagram handle
3. Package: Personal story / Brand cartoon ad (multiple choice)
4. Tell us the story (long text)
5. Photos of the people (file upload, optional) and/or describe them (long text)
6. Deadline (date, optional)

Optional: add a **hidden field** called `package`. When a visitor taps "Order a brand ad", the site fills it in for you.
Publish, copy the link (looks like `https://tally.so/r/abc123`), paste into `formUrl`.

## Payment: PayPal (free to set up)

You chat with every customer and send the payment link *after* they approve the script, so the simplest free option is **PayPal.me** (paypal.me/yourname) or a PayPal invoice. Fee is taken per sale; no monthly cost. **Stripe Payment Links** look more professional and take cards/Apple Pay, but Stripe asks for business and ID verification. Ko-fi also works but adds a fee on its free plan. Paste whichever link you choose into `paymentUrl`.

## Hosting: Cloudflare Pages (free)

Why: free with unlimited bandwidth (videos use a lot), a free `yourname.pages.dev` address, and you can deploy by drag-and-drop. No coding tools needed. (Netlify Drop also works, but its free plan has a monthly bandwidth limit that video can use up.)

1. Create a free account at dash.cloudflare.com.
2. Go to **Workers & Pages → Create → Pages → Upload assets** (drag-and-drop).
3. Name the project (this becomes `name.pages.dev`), drag the whole `cartoon-studio` folder in, and click **Deploy**.
4. To update the site later: same project → **Create deployment** → drag the folder in again.

Each file must be under 25 MB, which is why new reels go through `add-video.sh` first.

## Adding a video

```bash
cd ~/cartoon-studio && ./add-video.sh ~/Downloads/my-reel.mp4 my-reel
```

Paste the line it prints into the `VIDEOS` list in `config.js`. The first video in the list is the one at the top of the page.

## Go-live checklist

- [ ] Pick the business name → `businessName`
- [ ] Confirm prices and delivery days
- [ ] Create the Tally form → `formUrl`
- [ ] Choose PayPal.me or Stripe → `paymentUrl`
- [ ] Set `tiktokHandle` (and Instagram/email if you like)
- [ ] Re-read the FAQ answers
- [ ] Deploy to Cloudflare Pages
- [ ] Open the live link on your phone, send yourself a test order
- [ ] Put the link in your TikTok bio: "Want YOUR story as a cartoon? Link in bio"

## Preview on your computer

```bash
cd ~/cartoon-studio && python3 -m http.server 8411
```

Then open http://localhost:8411. The yellow "setup note" only shows on your computer, not on the live site.
