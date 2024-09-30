import {escClosePopup} from './modal.js';
export {initialCards,listCard, createCard, imgPopupFunction, likeToggle, removeCard}

const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

// @todo: Темплейт карточки
const templateCard = document.querySelector("#card-template").content;

// @todo: DOM узлы
const listCard = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard (srcCard, titleCard, removeCardFunction, likeButtonFunction, imgPopupFunction) {
  const cardElement = templateCard.querySelector('.card').cloneNode(true);
  const deleteButtonCard = cardElement.querySelector('.card__delete-button');
  const likeButtonCard = cardElement.querySelector('.card__like-button');
  const cardElementimg = cardElement.querySelector('.card__image');
  deleteButtonCard.addEventListener('click', () => removeCardFunction(cardElement)); 
  likeButtonCard.addEventListener('click', () => likeButtonFunction(likeButtonCard));
  cardElementimg.src = srcCard;
  cardElementimg.alt = 'photo';
  cardElement.querySelector('.card__title').textContent = titleCard;
  cardElementimg.addEventListener('click', () => imgPopupFunction(cardElementimg, titleCard));
  return cardElement;
}

//функция открытия фото
function imgPopupFunction (imgCardElement, titleCard) {
  document.querySelector('.popup__image').src = imgCardElement.src; 
  document.querySelector('.popup__image').alt = imgCardElement.alt;
  document.querySelector('.popup__caption').textContent = titleCard;  
  document.querySelector('.popup_type_image').classList.add('popup_is-opened');
  escClosePopup();
}

//функция прожима лайка
function likeToggle (likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
}


// @todo: Функция удаления карточки
function removeCard(card) {
  card.remove();
}



