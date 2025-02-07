import '../pages/index.css';
import {
  initialCards,
  createCard,
  deleteCard,
  createContentImgPopup,
  handleLike,
} from './cards.js';
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
const popupsList = document.querySelectorAll('.popup');
popupsList.forEach((elem)=> {
  elem.classList.add('popup_is-animated');
});
const popupAddCard = document.querySelector('.popup_type_new-card');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupImgCard = document.querySelector('.popup_type_image');


// Popups open-close handlers
buttonEditProfile.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(popupEditProfile);  
});


buttonAddCard.addEventListener('click', () => {
  openModal(popupAddCard);
});

listCard.addEventListener('click', function (evt) {

  if(evt.target.nodeName === 'IMG')
  {
    const dataCard = {
      link: evt.target.src,
      name: evt.target.alt, 
    }
    createContentImgPopup(dataCard, popupImgCard);
    openModal(popupImgCard);
  }
})




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
  };
  listCard.prepend(createCard(dataCard, handleLike, deleteCard));
  closeModal(evt.target.closest('.popup'));
  listForms['new-place'].reset();
}

listForms['edit-profile'].addEventListener(
  'submit',
  handleEditProfileFormSubmit
);
listForms['new-place'].addEventListener('submit', handleAddCardFormSubmit);

initialCards.forEach((dataCard) => {
  listCard.append(createCard(dataCard, handleLike, deleteCard));
});

export { templateCard, listForms };
