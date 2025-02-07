import '../pages/index.css';
import { initialCards, createCard } from './cards.js';
import { openModal, closeModal } from './modal.js';

// DOM
const templateCard = document.querySelector('#card-template').content;
const listCard = document.querySelector('.places__list');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// Forms
const listForms = document.forms;
const nameInput = listForms['edit-profile']['name'];
nameInput.value = profileName.textContent;
const jobInput = listForms['edit-profile']['description'];
jobInput.value = profileDescription.textContent;

// Popups
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupAddCard = document.querySelector('.popup_type_new-card');
const popupImgCard = document.querySelector('.popup_type_image');
const popupImg = popupImgCard.querySelector('.popup__image');
const popupCaption = popupImgCard.querySelector('.popup__caption');

// Popups 
buttonEditProfile.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(popupEditProfile);

});

// Popups open-close handlers
buttonAddCard.addEventListener('click', () => {
  openModal(popupAddCard);
});

listCard.addEventListener('click', function (evt) {
  if (evt.target.nodeName === 'IMG') {
    const cardImg = evt.target;
    popupImg.src = cardImg.src;
    popupImg.alt = cardImg.alt;
    popupCaption.textContent = cardImg.alt;
    openModal(popupImgCard);
  }
});

document.addEventListener('click', function (evt) {
  const popup = evt.target.closest('.popup');
  if (
    evt.target.classList.contains('popup__close') ||
    evt.target.classList.contains('popup')
  ) {
    closeModal(popup);
  }
});

document.addEventListener('keydown', function (evt) {
  const popup = document.querySelector('.popup_is-opened');
  if (evt.key === 'Escape' && popup) {
    closeModal(popup);
  }
});


// Forms handlers
function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;  
  profileDescription.textContent = jobInput.value; 
  closeModal(evt.target.closest('.popup'));
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const dataCard = {
    name: listForms['new-place']['place-name'].value,
    link: listForms['new-place']['link'].value, 
  }
  listCard.prepend(createCard(dataCard));
  closeModal(evt.target.closest('.popup'));
  listForms['new-place'].reset();
}

listForms['edit-profile'].addEventListener('submit', handleEditProfileFormSubmit);
listForms['new-place'].addEventListener('submit', handleAddCardFormSubmit);

initialCards.forEach((dataCard) => {
  listCard.append(createCard(dataCard));
});

export { templateCard };
