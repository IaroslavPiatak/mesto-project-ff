import {listForms} from './index.js';

function openModal (popupElement) {
  popupElement.classList.add('popup_is-opened');
}

function closeModal (popup) {
  popup.classList.remove('popup_is-opened');
}

document.addEventListener("click", function (evt) {
  const popup = evt.target.closest(".popup");
  if (
    evt.target.classList.contains("popup__close") ||
    evt.target.classList.contains("popup")
  ) {
    closeModal(popup);
    listForms['new-place'].reset();
  }
});

document.addEventListener("keydown", function (evt) {
  const popup = document.querySelector(".popup_is-opened");
  if (evt.key === "Escape" && popup) {
    closeModal(popup);
    listForms['new-place'].reset();
  }
});

export {openModal, closeModal}