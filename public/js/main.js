import { initModal } from "./modules/modal.js";
import { initHeaderScroll } from "./modules/headerScroll.js";
import { initAnimate } from "./modules/animate.js";
import { loadPosts } from "./modules/api.js";
function bootstrap() {
    const { openModal } = initModal();
    initHeaderScroll();
    initAnimate();
    const cardsContainer = document.querySelector("#cards");
    if (cardsContainer) {
        void loadPosts(cardsContainer, openModal);
    }
}
bootstrap();
