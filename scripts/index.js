// @todo: Темплейт карточки
const templateCard = document.querySelector("#card-template").content;

// @todo: DOM узлы
const listCard = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard (dataCard, deleteCardCallback) {

  const cardElement = templateCard.cloneNode(true);
  const cardImg = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  
  deleteButton.addEventListener('click', deleteCardCallBack);
  cardImg.src = dataCard.link;
  cardImg.alt = dataCard.name;
  cardTitle.textContent = dataCard.name;
  return cardElement;
}

// @todo: Функция удаления карточки
function deleteCardCallBack(evt) {

  evt.target.parentElement.remove();

}

// @todo: Вывести карточки на страницу
initialCards.forEach((dataCard) => {
  listCard.append(createCard(dataCard));
});
