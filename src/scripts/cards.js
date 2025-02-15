import {
  unlikeCard,
  likeCard,
  deleteCard as deleteCrdFromServer,
} from "./api.js";

const templateCard = document.querySelector("#card-template").content;

function createCard(cardData, userId, handleLike, handleImageClick) {

  // Формируем карточку
  const cardElement = templateCard.cloneNode(true);
  const cardImg = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCounter = cardElement.querySelector(".card__like-counter");

  // Заполняем данные карточки
  cardImg.src = cardData.link;
  cardImg.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  likeCounter.textContent = cardData.likes.length;

  // Проверяем, является ли текущий пользователь владельцем карточки и вешаем обработчик удаления
  if (cardData.owner._id === userId) {
    deleteButton.addEventListener("click", (evt) =>
      deleteCard(evt, cardData._id)
    );
  } else {
    deleteButton.remove();
  }

  // Ищем всех, кто лайкнул карточку, если среди них мы сами - добавить стиль лайку
  cardData.likes.forEach((likesArr) => {
    if (likesArr._id === userId)
      likeButton.classList.toggle("card__like-button_is-active");
  });

  // Обработчик лайка 
  likeButton.addEventListener("click", (evt) =>
    handleLike(evt, cardData._id, likeCounter)
  );

  // Обработчик клика по изображению (колбэк)
  cardImg.addEventListener("click", () => handleImageClick(cardData));

  return cardElement;
}

// колбэк-обработчик лайка
function handleLike(evt, cardId, likeCounter) {
  const likeButton = evt.target;
  const isLiked = likeButton.classList.contains("card__like-button_is-active");

  // Выбираем нужный метод (PUT или DELETE) в зависимости от состояния лайка
  const request = isLiked ? unlikeCard(cardId) : likeCard(cardId);
  request
    .then((updatedCard) => {
      likeCounter.textContent = updatedCard.likes.length; // Обновляем счетчик
      likeButton.classList.toggle("card__like-button_is-active");
    })
    .catch((err) => {
      console.error("Ошибка при изменении лайка:", err);
    });
}

function deleteCard(evt, cardId) {
  deleteCrdFromServer(cardId)
    .then(() => {
      evt.target.closest(".card").remove();
    })
    .catch((err) => {
      console.error("Ошибка удаления карточки:", err);
    });
}

export { createCard, deleteCard, handleLike };
