function openModal(popupElement) {
  popupElement.classList.add("popup_is-opened"); 
  document.addEventListener("keydown", handleEscape);
}

function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscape);
}

function handleEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {    
      closeModal(openedPopup);
    }
  }
}





export { openModal, closeModal};
