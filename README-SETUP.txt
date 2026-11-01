THE INNER ATLAS — GOOGLE SIGN-IN & RESEARCH COMMENTS
=====================================================

WHAT'S INCLUDED
- Your existing website pages and images, retained.
- Google sign-in using Firebase Authentication.
- Public, live-updating comments stored in Cloud Firestore.
- A dedicated sleep-hygiene.html research page.
- Comments are separated by research ID, so comments on one research item
  do not appear under another.
- firestore.rules contains starter security rules.

IMPORTANT: ONE-TIME OWNER SETUP REQUIRED
I have prepared the website code, but Google sign-in cannot be activated
until it is connected to a Firebase project owned by you. This requires
your own project credentials and enabling Google as a provider. Firebase
has a no-cost Spark plan; usage limits and current terms are controlled
by Google. You do not need to give me your Google password or private keys.

1. Create a Firebase project
   - Open https://console.firebase.google.com/
   - Create a project (for example: the-inner-atlas).
   - Add a Web app to the project and copy its Firebase configuration.

2. Configure the website
   - Open firebase-config.js.
   - Replace each YOUR_... placeholder with the matching value from your
     Firebase Web app config.
   - These web config values are designed to be used in browser code.
     Never put a Firebase service-account JSON/private key in this folder.

3. Enable Google login
   - In Firebase Console, open Authentication > Get started > Sign-in method.
   - Enable Google and choose the support email.
   - In Authentication > Settings > Authorized domains, add your website
     domain. For local testing, use a local web server (not file://).

4. Enable the database
   - Open Firestore Database > Create database.
   - Choose a location suitable for your audience.
   - Open the Rules tab and publish the contents of firestore.rules.
   - These rules let anyone read comments, signed-in users post comments,
     and users edit/delete only their own comments.

5. Publish / test
   - Upload the complete contents of this folder to your web host.
   - Use HTTPS. Firebase Auth popups require a supported web origin.
   - Open sleep-hygiene.html, sign in with Google, and post a test comment.

ADDING FUTURE RESEARCH PAGES
----------------------------
For each new research page:
1. Copy the comments-section block from sleep-hygiene.html.
2. Keep the data-comments attribute.
3. Give it a unique data-research-id, e.g. "neuroscience-notes".
4. Include <script type="module" src="script.js"></script> on the page.
5. Add the page to the homepage/article navigation as desired.

The unique research ID is the comment thread key. Do not reuse an ID for
different research articles unless you intentionally want them to share
one discussion.

ADDING CONTENT TO SLEEP HYGIENE
-------------------------------
Edit the article content inside <article class="prose"> in
sleep-hygiene.html. Keep the comments section below it. You can add your
own headings, paragraphs, links and images.

LOCAL PREVIEW
-------------
Because the site uses JavaScript modules, don't open the HTML file directly
with file://. From this folder, run a local server, for example:
  python -m http.server 8000
Then visit http://localhost:8000

PRIVACY / MODERATION NOTES
--------------------------
- Comments are public to visitors.
- Google profile display name and profile photo URL are stored with a
  comment; email addresses are not stored in the comment document.
- The current version supports sign-in, posting, live reading and
  author-only edit/delete permissions at the database-rule level.
  The visible UI intentionally does not yet include edit/delete controls
  or an admin moderation dashboard.
- Add moderation/reporting and anti-spam controls before a high-traffic
  public launch. Consider Firebase App Check and tighter rate limits.
- Firebase configuration in the browser is not a secret; security comes
  from Authentication and Firestore Security Rules.

Existing article.html remains the supplied sample article. The dedicated
Sleep Hygiene research page is sleep-hygiene.html.
