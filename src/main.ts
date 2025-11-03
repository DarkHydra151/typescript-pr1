import { initModal } from "./modules/modal.js";
import { initHeaderScroll } from "./modules/headerScroll.js";
import { initAnimate } from "./modules/animate.js";
import { loadPosts } from "./modules/api.js";

function bootstrap(): void {
  const { openModal } = initModal();

  initHeaderScroll();

  initAnimate();

  const cardsContainer: HTMLElement | null = document.querySelector("#cards");
  if (cardsContainer) {
    void loadPosts(cardsContainer, openModal);
  }
}

bootstrap();
