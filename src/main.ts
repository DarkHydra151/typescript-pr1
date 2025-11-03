let openedCount: number = 0;
const apiUrl: string = "https://jsonplaceholder.typicode.com/posts?_limit=6";

const modal: HTMLElement | null = document.querySelector("#modal");
const modalOpenBtns: NodeListOf<HTMLButtonElement> = document.querySelectorAll("[data-open-modal]");
const modalCloseBtn: HTMLButtonElement | null = document.querySelector("#modal-close");

function openModal(): void {
  if (!modal) return;
  modal.classList.add("is-open");
  openedCount++;
  console.log(`Modal opened ${openedCount} times`);
}

function closeModal(): void {
  if (!modal) return;
  modal.classList.remove("is-open");
}

modalOpenBtns.forEach((btn: HTMLButtonElement): void => {
  btn.addEventListener("click", openModal);
});

modalCloseBtn?.addEventListener("click", closeModal);

modal?.addEventListener("click", (e: MouseEvent): void => {
  if (e.target === modal) closeModal(); 
});

const header: HTMLElement | null = document.querySelector("header");
window.addEventListener("scroll", (): void => {
  const y: number = window.scrollY;
  if (!header) return;
  if (y > 10) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

const animateBtns: NodeListOf<HTMLButtonElement> = document.querySelectorAll("[data-animate]");
animateBtns.forEach((btn: HTMLButtonElement | HTMLButtonElement): void => {
  btn.addEventListener("click", (): void => {
    const targetSelector: string = btn.getAttribute("data-target") || "";
    const target: HTMLElement | null = document.querySelector(targetSelector);
    if (!target) return;
    target.classList.remove("pulse");
    void target.offsetWidth;
    target.classList.add("pulse");
  });
});

const cardsContainer: HTMLElement | null = document.querySelector("#cards");
async function loadPosts(): Promise<void> {
  if (!cardsContainer) return;
  cardsContainer.innerHTML = "<p>Loading...</p>";
  try {
    const res: Response = await fetch(apiUrl);
    const posts: Array<{ id: number; title: string; body: string }> = await res.json();

    const html: string = posts.map((p) => `
      <article class="card">
        <h3>${escapeHtml(p.title)}</h3>
        <p>${escapeHtml(p.body)}</p>
        <button class="btn" data-open-modal>Подробнее</button>
      </article>
    `).join("");

    cardsContainer.innerHTML = html;

    document.querySelectorAll<HTMLButtonElement>("[data-open-modal]")
      .forEach((b) => b.addEventListener("click", openModal));

  } catch (err) {
    console.error(err);
    cardsContainer.innerHTML = "<p>Ошибка загрузки данных.</p>";
  }
}

function escapeHtml(s: string): string {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

loadPosts();
