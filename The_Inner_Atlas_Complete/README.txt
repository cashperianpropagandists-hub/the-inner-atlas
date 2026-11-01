THE INNER ATLAS — COMPLETE WEBSITE FILES

Included files:
- index.html        Updated homepage with the About Me section and corrected Recent Writings image
- style.css         Updated stylesheet for the About Me layout and responsive image sizing
- about.html        Original About page (unchanged)
- article.html      Original sample Article page (unchanged)
- contact.html      Original Contact page (unchanged)
- sleeping-man.png  Your supplied sleeping-man painting

HOMEPAGE ABOUT ME SECTION
The About Me section appears between the introductory strip and Recent Writings. It places a photo area beside your introduction on desktop and stacks them on mobile.

ADDING YOUR PHOTO LATER
1. Put your portrait in this folder and name it sehjan-photo.jpg.
2. In index.html, find the home-about-photo block:

   <div class="home-about-photo">
     <!-- Replace this placeholder with your own photo when ready. -->
     <span>YOUR PHOTO</span>
   </div>

3. Replace that block with:

   <div class="home-about-photo">
     <img src="sehjan-photo.jpg" alt="Portrait of Sehjan Niyaz">
   </div>

The CSS for the photo is already included. The image will be cropped to fit the existing photo area.

SLEEP HYGIENE IMAGE BEHAVIOUR
The Sleep Hygiene card is marked COMING SOON. Its image is non-clickable, so it will not open article.html or the unrelated sample article titled “The quiet value of asking better questions.”

INSTALLATION
1. Extract the ZIP.
2. Copy the included files into your website folder, replacing index.html and style.css.
3. Keep about.html, article.html, contact.html and sleeping-man.png in the same folder.

NOTE
The supplied HTML pages reference script.js, but a script.js file was not included in the uploads. Keep your existing script.js in the website folder; it has not been changed or recreated.
