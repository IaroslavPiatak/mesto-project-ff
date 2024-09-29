import './pages/index.css';
import {initialCards} from './scripts/cards.js';

// @todo: Темплейт карточки
const templateCard = document.querySelector("#card-template").content;

// @todo: DOM узлы
const listCard = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard (srcCard, titleCard, removeCardFunction) {
  const cardElement = templateCard.querySelector('.card').cloneNode(true);
  const deleteButtonCard = cardElement.querySelector('.card__delete-button');
  const cardElementimg = cardElement.querySelector('.card__image');
  deleteButtonCard.addEventListener('click', () => removeCardFunction(cardElement)); 
  cardElementimg.src = srcCard;
  cardElementimg.alt = 'photo';
  cardElement.querySelector('.card__title').textContent = titleCard;
  return cardElement;

}

// @todo: Функция удаления карточки
function removeCard(card) {
  card.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(function(item) {
  const card = createCard(item.link, item.name, removeCard);
  listCard.append(card);
});

