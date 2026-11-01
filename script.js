import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import {
  getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import {
  getFirestore, collection, addDoc, query, orderBy, onSnapshot, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";
import { firebaseConfig } from "./firebase-config.js";

const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(open));
  });
}
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

const commentArea = document.querySelector("[data-comments]");
if (!commentArea) { /* No discussion component on this page. */ }
else if (!firebaseConfig.apiKey || firebaseConfig.apiKey === "YOUR_API_KEY" ||
         !firebaseConfig.projectId || firebaseConfig.projectId === "YOUR_PROJECT_ID") {
  const list = commentArea.querySelector("[data-comments-list]");
  if (list) list.innerHTML = '<p class="setup-warning">Comments are not connected yet. The site owner must complete the one-time Firebase setup described in README-SETUP.txt.</p>';
  const feedback = commentArea.querySelector("[data-comment-feedback]");
  if (feedback) feedback.textContent = "Google sign-in becomes available after Firebase is configured.";
} else {
  try {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);
    const provider = new GoogleAuthProvider();
    const researchId = commentArea.dataset.researchId;
    const signInButton = commentArea.querySelector("[data-google-signin]");
    const signOutButton = commentArea.querySelector("[data-signout]");
    const status = commentArea.querySelector("[data-user-status]");
    const form = commentArea.querySelector("[data-comment-form]");
    const textarea = form.querySelector("textarea");
    const submit = form.querySelector('button[type="submit"]');
    const feedback = commentArea.querySelector("[data-comment-feedback]");
    const list = commentArea.querySelector("[data-comments-list]");

    signInButton.addEventListener("click", async () => {
      feedback.textContent = "";
      try { await signInWithPopup(auth, provider); }
      catch (error) { feedback.textContent = error.message || "Google sign-in failed."; }
    });
    signOutButton.addEventListener("click", () => signOut(auth));

    onAuthStateChanged(auth, user => {
      status.textContent = user ? `Signed in as ${user.displayName || user.email}` : "You're browsing as a guest.";
      signInButton.hidden = !!user;
      signOutButton.hidden = !user;
      textarea.disabled = !user;
      submit.disabled = !user;
    });

    form.addEventListener("submit", async event => {
      event.preventDefault();
      const user = auth.currentUser;
      const body = textarea.value.trim();
      if (!user) { feedback.textContent = "Please sign in with Google first."; return; }
      if (!body) return;
      submit.disabled = true;
      feedback.textContent = "Posting…";
      try {
        await addDoc(collection(db, "research", researchId, "comments"), {
          text: body,
          uid: user.uid,
          displayName: user.displayName || "Reader",
          photoURL: user.photoURL || "",
          createdAt: serverTimestamp()
        });
        textarea.value = "";
        feedback.textContent = "Your comment has been posted.";
      } catch (error) {
        feedback.textContent = error.message || "Could not post comment. Check Firestore rules.";
      } finally { submit.disabled = !auth.currentUser; }
    });

    const commentsQuery = query(collection(db, "research", researchId, "comments"), orderBy("createdAt", "desc"));
    onSnapshot(commentsQuery, snapshot => {
      list.replaceChildren();
      if (snapshot.empty) {
        const empty = document.createElement("p");
        empty.className = "muted";
        empty.textContent = "No comments yet. Be the first to start the discussion.";
        list.append(empty);
        return;
      }
      snapshot.forEach(docSnap => {
        const data = docSnap.data();
        const card = document.createElement("article");
        card.className = "comment-card";
        const top = document.createElement("div");
        top.className = "comment-byline";
        const name = document.createElement("strong");
        name.textContent = data.displayName || "Reader";
        const date = document.createElement("time");
        date.textContent = data.createdAt?.toDate ? data.createdAt.toDate().toLocaleString() : "Just now";
        top.append(name, date);
        const text = document.createElement("p");
        text.textContent = data.text || "";
        card.append(top, text);
        list.append(card);
      });
    }, error => {
      list.textContent = "Unable to load comments. Check your Firestore setup and security rules.";
      console.error(error);
    });
  } catch (error) {
    console.error("Firebase initialization error:", error);
    const list = commentArea.querySelector("[data-comments-list]");
    if (list) list.textContent = "Comments could not start. Check firebase-config.js.";
  }
}
