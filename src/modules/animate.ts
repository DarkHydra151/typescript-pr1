export function initAnimate(): void {
  const animateBtns = document.querySelectorAll<HTMLButtonElement>("[data-animate]");
  animateBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetSelector: string = btn.getAttribute("data-target") || "";
      const target: HTMLElement | null = document.querySelector(targetSelector);
      if (!target) return;
      target.classList.remove("pulse");
      void target.offsetWidth;      // перезапуск CSS-анимации
      target.classList.add("pulse");
    });
  });
}
