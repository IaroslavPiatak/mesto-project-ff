// @todo: Темплейт карточки
const templateCard = document.querySelector("#card-template").content;
// @todo: DOM узлы
const listCard = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(srcCard, titleCard, handleDeleteCard, handleLikeButton, imgPopupFunction) {
  const cardElement = templateCard.querySelector('.card').cloneNode(true);
  const deleteButtonCard = cardElement.querySelector('.card__delete-button');
  const likeButtonCard = cardElement.querySelector('.card__like-button');
  const cardElementImg = cardElement.querySelector('.card__image');
  deleteButtonCard.addEventListener('click', () => handleDeleteCard(cardElement)); 
  likeButtonCard.addEventListener('click', () => handleLikeButton(likeButtonCard));
  cardElementImg.src = srcCard;
  cardElementImg.alt = 'photo';
  cardElement.querySelector('.card__title').textContent = titleCard;
  cardElementImg.addEventListener('click', () => imgPopupFunction(cardElementImg, titleCard));
  return cardElement;
}

function toggleLike(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
}

// @todo: Функция удаления карточки
function deleteCard(card) {
  card.remove();
}

export { listCard, createCard, toggleLike, deleteCard };
