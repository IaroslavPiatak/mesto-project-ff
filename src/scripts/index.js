import "../pages/index.css";
import { createCard, deleteCard, handleLike } from "./cards.js";
import { initialCards } from "./initialCards.js";
import { openModal, closeModal } from "./modal.js";

// DOM
const templateCard = document.querySelector("#card-template").content;
const cardsList = document.querySelector(".places__list");
const buttonEditProfile = document.querySelector(".profile__edit-button");
const buttonAddCard = document.querySelector(".profile__add-button");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

// Forms
const listForms = document.forms;
const nameInput = listForms["edit-profile"]["name"];
const jobInput = listForms["edit-profile"]["description"];

// Popups
const popupsList = document.querySelectorAll(".popup");
popupsList.forEach((elem) => {
  elem.classList.add("popup_is-animated");
});
const popupAddCard = document.querySelector(".popup_type_new-card");
const popupEditProfile = document.querySelector(".popup_type_edit");
const popupImgCard = document.querySelector(".popup_type_image");
const popupImg = popupImgCard.querySelector(".popup__image");
const popupCaption = popupImgCard.querySelector(".popup__caption");

// Popups open-close handlers
buttonEditProfile.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(popupEditProfile);
});

buttonAddCard.addEventListener("click", () => {
  openModal(popupAddCard);
});

document.addEventListener("click", function (evt) {
  const popup = evt.target.closest(".popup");
  if (
    evt.target.classList.contains("popup__close") ||
    evt.target.classList.contains("popup")
  ) {
    closeModal(popup);
  }
});

function handleImageClick(dataCard) {
  popupImg.src = dataCard.link;
  popupImg.alt = dataCard.name;
  popupCaption.textContent = dataCard.name;
  openModal(popupImgCard);
}

function handleEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
}

// Forms handlers
function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(popupEditProfile);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const dataCard = {
    name: listForms["new-place"]["place-name"].value,
    link: listForms["new-place"]["link"].value,
  };
  cardsList.prepend(
    createCard(dataCard, handleLike, handleImageClick, deleteCard)
  );
  closeModal(popupAddCard);
  listForms["new-place"].reset();
}

listForms["edit-profile"].addEventListener(
  "submit",
  handleEditProfileFormSubmit
);
listForms["new-place"].addEventListener("submit", handleAddCardFormSubmit);

initialCards.forEach((dataCard) => {
  cardsList.append(
    createCard(dataCard, handleLike, handleImageClick, deleteCard)
  );
});

export { templateCard, listForms, handleImageClick, handleEscape };
