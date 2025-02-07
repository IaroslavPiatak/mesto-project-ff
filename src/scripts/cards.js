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

function createCard(dataCard, handleLike, openImgPopup, deleteCard) {
  const cardElement = templateCard.cloneNode(true);
  const cardImg = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  likeButton.addEventListener('click', handleLike);

  deleteButton.addEventListener('click', deleteCard);
  cardImg.addEventListener('click', () => openImgPopup(cardImg, cardTitle));
  cardImg.src = dataCard.link;
  cardImg.alt = dataCard.name;
  cardTitle.textContent = dataCard.name;
  return cardElement;
}

function openImgPopup(cardImg, cardTitle) {
  const popupImg = document.querySelector('.popup__image');
  const popupCaption = document.querySelector('.popup__caption');
  popupImg.src = cardImg.src;
  popupImg.alt = cardTitle.textContent;
  popupCaption.textContent = cardTitle.textContent;
  console.log(popupImg);
  openModal(document.querySelector('.popup_type_image'));

}

// listCard.addEventListener('click', function (evt) {
//   if (evt.target.nodeName === 'IMG') {
//     const cardImg = evt.target;
//     popupImg.src = cardImg.src;
//     popupImg.alt = cardImg.alt;
//     popupCaption.textContent = cardImg.alt;
//     openModal(popupImgCard);
//   }
// });

function handleLike(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

function deleteCard(evt) {
  evt.target.parentElement.remove();
}

export { initialCards, createCard, deleteCard, openImgPopup, handleLike };
