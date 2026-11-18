/* ============================================================
   YOUR SETTINGS — the only file you need to edit.
   Change the text between the quotes, save, and re-upload.
   Lines marked "PLACEHOLDER" are guesses — check them before going live.
   ============================================================ */

window.SITE = {
  // 1. Business name (shows in the header, title and footer)
  businessName: "Toonbox Stories",          // PLACEHOLDER — pick your name

  // 2. Prices (USD). Write them exactly as you want them shown.
  personalPrice: "$29",                      // PLACEHOLDER — confirm
  personalLength: "30–60 seconds",
  brandPrice: "$129",                        // PLACEHOLDER — confirm ($99–199)
  brandLength: "30–60 seconds",
  deliveryDays: "3–5",                       // PLACEHOLDER — days after you approve the script

  // 3. Order form link from Tally (looks like https://tally.so/r/abc123)
  //    Leave "" until you have it — the site shows a placeholder box.
  formUrl: "",

  // 4. Payment link (PayPal.me, Stripe Payment Link or Ko-fi). Leave "" until ready.
  paymentUrl: "",

  // 5. Contact
  tiktokHandle: "yourhandle",                // PLACEHOLDER — without the @
  instagramHandle: "",                       // optional, without the @
  email: "",                                 // optional, e.g. hello@yourname.com
};

/* ============================================================
   SAMPLE VIDEOS — to add one, copy a line and change it.
   Put the .mp4 (and an optional .jpg cover) in the "videos" folder.
   The FIRST video also plays at the top of the page.
   ============================================================ */

window.VIDEOS = [
  { file: "the-ring-proposal.mp4", cover: "the-ring-proposal.jpg", title: "The Ring, part 1", tag: "Proposal" },
  { file: "the-ring-twist.mp4",    cover: "the-ring-twist.jpg",    title: "The Ring, the twist", tag: "Drama" },
];
