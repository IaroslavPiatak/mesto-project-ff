import './pages/index.css';
import {initialCards,listCard, createCard, imgPopupFunction, likeToggle, removeCard} from './scripts/cards.js';

document.querySelector('.popup_type_new-card').classList.add('popup_is-animated');
document.querySelector('.popup_type_edit').classList.add('popup_is-animated');
document.querySelector('.popup_type_image').classList.add('popup_is-animated');


// @todo: Вывести карточки на страницу
initialCards.forEach(function(item) {
  const card = createCard(item.link, item.name, removeCard, likeToggle, imgPopupFunction);
  listCard.append(card);
});





