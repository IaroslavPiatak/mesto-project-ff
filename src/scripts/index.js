import '../pages/index.css';
import {initialCards, createCard} from './cards.js';
import {openModal, closeModal} from './modal.js';


const templateCard = document.querySelector("#card-template").content;
const listCard = document.querySelector('.places__list');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');

const popupEditProfile = document.querySelector('.popup_type_edit');
const popupAddCard = document.querySelector('.popup_type_new-card');
const popupImgCard = document.querySelector('.popup_type_image');
const popupImg = popupImgCard.querySelector('.popup__image');
const popupCaption = popupImgCard.querySelector('.popup__caption');





buttonEditProfile.addEventListener('click', ()=> {
  openModal(popupEditProfile);
})

buttonAddCard.addEventListener('click', ()=> {
  openModal(popupAddCard);
})

listCard.addEventListener('click', function (evt) {
  if(evt.target.nodeName === 'IMG')
  {
    const cardImg = evt.target;
    popupImg.src = cardImg.src;
    popupImg.alt = cardImg.alt;
    popupCaption.textContent = cardImg.alt;
    openModal(popupImgCard);
  }
})

document.addEventListener('click', function(evt) {
  const popup = evt.target.closest('.popup');
  if (evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup')) {
    closeModal(popup);
  }  
});

document.addEventListener('keydown', function(evt) {
  const popup = document.querySelector('.popup_is-opened');
  if(evt.key === 'Escape' && popup) {
    closeModal(popup);
  }
})





initialCards.forEach((dataCard) => {
  listCard.append(createCard(dataCard));
});



export {templateCard}


