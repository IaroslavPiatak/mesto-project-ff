import { handleEscape } from "./index.js";

function openModal(popupElement) {
  popupElement.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscape);
}

function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscape);
}

export { openModal, closeModal };
