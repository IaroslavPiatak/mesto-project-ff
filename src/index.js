import './pages/index.css';
import { listCard, createCard, toggleLike, deleteCard } from './scripts/cards.js';
import { initialCards } from './scripts/initialCards.js';
import { openPopup, closePopup, popupImage, popupCaption, popupImageContainer } from './scripts/modal.js';

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const buttonProfileEdit = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const profileForm = document.forms['edit-profile'].elements;
const addCardForm = document.forms['new-place'];

popupNewCard.classList.add('popup_is-animated');
popupEditProfile.classList.add('popup_is-animated');
popupImageContainer.classList.add('popup_is-animated');

initialCards.forEach(item => {
  const card = createCard(item.link, item.name, deleteCard, toggleLike, imgPopupFunction);
  listCard.append(card);
});

function imgPopupFunction(imgCardElement, titleCard) {
  popupImage.src = imgCardElement.src;
  popupImage.alt = imgCardElement.alt;
  popupCaption.textContent = titleCard;
  openPopup(popupImageContainer);
}

profileForm.name.value = profileTitle.textContent;
profileForm.description.value = profileDescription.textContent;

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileForm.name.value;
  profileDescription.textContent = profileForm.description.value;
  closePopup(popupEditProfile);
  profileForm.name.value = '';
  profileForm.description.value = '';
}

document.forms['edit-profile'].addEventListener('submit', handleProfileFormSubmit);
buttonProfileEdit.addEventListener('click', () => openPopup(popupEditProfile));

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const placeName = addCardForm.elements['place-name'].value;
  const imgLink = addCardForm.elements.link.value;
  listCard.prepend(createCard(imgLink, placeName, deleteCard, toggleLike, imgPopupFunction));
  closePopup(popupNewCard);

  addCardForm.elements['place-name'].value = '';
  addCardForm.elements.link.value = '';
}

addCardForm.addEventListener('submit', handleAddCardFormSubmit);
addCardButton.addEventListener('click', () => openPopup(popupNewCard));

export { imgPopupFunction };
