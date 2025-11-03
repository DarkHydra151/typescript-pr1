export function initAnimate() {
    const animateBtns = document.querySelectorAll("[data-animate]");
    animateBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            const targetSelector = btn.getAttribute("data-target") || "";
            const target = document.querySelector(targetSelector);
            if (!target)
                return;
            target.classList.remove("pulse");
            void target.offsetWidth; // перезапуск CSS-анимации
            target.classList.add("pulse");
        });
    });
}
