let openedCount: number = 0;

export function initModal(): { openModal: () => void; closeModal: () => void } {
  const modal: HTMLElement | null = document.querySelector("#modal");
  const openBtns: NodeListOf<HTMLButtonElement> = document.querySelectorAll("[data-open-modal]");
  const closeBtn: HTMLButtonElement | null = document.querySelector("#modal-close");

  const openModal = (): void => {
    if (!modal) return;
    modal.classList.add("is-open");
    openedCount++;
    console.log(`Modal opened ${openedCount} times`);
  };

  const closeModal = (): void => {
    if (!modal) return;
    modal.classList.remove("is-open");
  };

  openBtns.forEach((btn) => btn.addEventListener("click", openModal));
  closeBtn?.addEventListener("click", closeModal);
  modal?.addEventListener("click", (e: MouseEvent): void => {
    if (e.target === modal) closeModal();
  });

  return { openModal, closeModal };
}
