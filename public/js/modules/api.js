import { escapeHtml } from "../utils/escapeHtml.js";
const apiUrl = "https://jsonplaceholder.typicode.com/posts?_limit=6";
export async function loadPosts(cardsContainer, onOpenModal) {
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
        // навешиваем обработчики открытия модалки на новые кнопки
        document.querySelectorAll("[data-open-modal]")
            .forEach((b) => b.addEventListener("click", onOpenModal));
    }
    catch (err) {
        console.error(err);
        cardsContainer.innerHTML = "<p>Ошибка загрузки данных.</p>";
    }
}
