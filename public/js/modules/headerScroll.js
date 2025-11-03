export function initHeaderScroll() {
    const header = document.querySelector("header");
    if (!header)
        return;
    const apply = () => {
        const y = window.scrollY || document.documentElement.scrollTop || 0;
        if (y > 20)
            header.classList.add("scrolled");
        else
            header.classList.remove("scrolled");
    };
    apply();
    window.addEventListener("scroll", apply, { passive: true });
}
