"use strict";
let openedCount = 0;
const apiUrl = "https://jsonplaceholder.typicode.com/posts?_limit=6";
const modal = document.querySelector("#modal");
const modalOpenBtns = document.querySelectorAll("[data-open-modal]");
const modalCloseBtn = document.querySelector("#modal-close");
function openModal() {
    if (!modal)
        return;
    modal.classList.add("is-open");
    openedCount++;
    console.log(`Modal opened ${openedCount} times`);
}
function closeModal() {
    if (!modal)
        return;
    modal.classList.remove("is-open");
}
modalOpenBtns.forEach((btn) => {
    btn.addEventListener("click", openModal);
});
modalCloseBtn?.addEventListener("click", closeModal);
modal?.addEventListener("click", (e) => {
    if (e.target === modal)
        closeModal();
});
const header = document.querySelector("header");
window.addEventListener("scroll", () => {
    const y = window.scrollY;
    if (!header)
        return;
    if (y > 10) {
        header.classList.add("scrolled");
    }
    else {
        header.classList.remove("scrolled");
    }
});
const animateBtns = document.querySelectorAll("[data-animate]");
animateBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        const targetSelector = btn.getAttribute("data-target") || "";
        const target = document.querySelector(targetSelector);
        if (!target)
            return;
        target.classList.remove("pulse");
        void target.offsetWidth;
        target.classList.add("pulse");
    });
});
const cardsContainer = document.querySelector("#cards");
async function loadPosts() {
    if (!cardsContainer)
        return;
    cardsContainer.innerHTML = "<p>Loading...</p>";
    try {
        const res = await fetch(apiUrl);
        const posts = await res.json();
        const html = posts.map((p) => `
      <article class="card">
        <h3>${escapeHtml(p.title)}</h3>
        <p>${escapeHtml(p.body)}</p>
        <button class="btn" data-open-modal>Подробнее</button>
      </article>
    `).join("");
        cardsContainer.innerHTML = html;
        document.querySelectorAll("[data-open-modal]")
            .forEach((b) => b.addEventListener("click", openModal));
    }
    catch (err) {
        console.error(err);
        cardsContainer.innerHTML = "<p>Ошибка загрузки данных.</p>";
    }
}
function escapeHtml(s) {
    return s
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}
loadPosts();
