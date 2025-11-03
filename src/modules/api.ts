import { Post } from "../types/post.js";
import { escapeHtml } from "../utils/escapeHtml.js";

const apiUrl: string = "https://jsonplaceholder.typicode.com/posts?_limit=6";

export async function loadPosts(cardsContainer: HTMLElement, onOpenModal: () => void): Promise<void> {
  cardsContainer.innerHTML = "<p>Loading...</p>";
  try {
    const res: Response = await fetch(apiUrl);
    const posts: Post[] = await res.json();

    const html: string = posts.map((p) => `
      <article class="card">
        <h3>${escapeHtml(p.title)}</h3>
        <p>${escapeHtml(p.body)}</p>
        <button class="btn" data-open-modal>Подробнее</button>
      </article>
    `).join("");

    cardsContainer.innerHTML = html;

    // навешиваем обработчики открытия модалки на новые кнопки
    document.querySelectorAll<HTMLButtonElement>("[data-open-modal]")
      .forEach((b) => b.addEventListener("click", onOpenModal));

  } catch (err) {
    console.error(err);
    cardsContainer.innerHTML = "<p>Ошибка загрузки данных.</p>";
  }
}
