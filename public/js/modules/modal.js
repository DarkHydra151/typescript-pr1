let openedCount = 0;
export function initModal() {
    const modal = document.querySelector("#modal");
    const openBtns = document.querySelectorAll("[data-open-modal]");
    const closeBtn = document.querySelector("#modal-close");
    const openModal = () => {
        if (!modal)
            return;
        modal.classList.add("is-open");
        openedCount++;
        console.log(`Modal opened ${openedCount} times`);
    };
    const closeModal = () => {
        if (!modal)
            return;
        modal.classList.remove("is-open");
    };
    openBtns.forEach((btn) => btn.addEventListener("click", openModal));
    closeBtn?.addEventListener("click", closeModal);
    modal?.addEventListener("click", (e) => {
        if (e.target === modal)
            closeModal();
    });
    return { openModal, closeModal };
}
