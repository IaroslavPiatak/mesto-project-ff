function openModal (popupElement) {
  popupElement.classList.add('popup_is-opened');
}

function closeModal (popup) {
  popup.classList.remove('popup_is-opened');
}



export {openModal, closeModal}