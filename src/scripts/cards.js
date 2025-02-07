import { templateCard } from './index.js';
import { openModal } from './modal.js';

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

function createCard(dataCard, handleLike, deleteCard) {
  const cardElement = templateCard.cloneNode(true);
  const cardImg = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  likeButton.addEventListener('click', handleLike);

  deleteButton.addEventListener('click', deleteCard);
  cardImg.src = dataCard.link;
  cardImg.alt = dataCard.name;
  cardTitle.textContent = dataCard.name;
  return cardElement;
}

function createContentImgPopup(dataCard, popupImgCard) {
  const popupImg = popupImgCard.querySelector('.popup__image');
  const popupCaption = popupImgCard.querySelector('.popup__caption');
  popupImg.src = dataCard.link;
  popupImg.alt = dataCard.name;
  popupCaption.textContent = dataCard.name;
}

function handleLike(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

function deleteCard(evt) {
  evt.target.parentElement.remove();
}

export {
  initialCards,
  createCard,
  deleteCard,
  createContentImgPopup,
  handleLike,
};
