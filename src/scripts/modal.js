const popupImgCard = document.querySelector(".popup_type_image");
const popupImg = popupImgCard.querySelector(".popup__image");
const popupCaption = popupImgCard.querySelector(".popup__caption");

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

function handleImageClick(dataCard) {
  popupImg.src = dataCard.link;
  popupImg.alt = dataCard.name;
  popupCaption.textContent = dataCard.name;
  openModal(popupImgCard);
}



export { openModal, closeModal, handleImageClick};
