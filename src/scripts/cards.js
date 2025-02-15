import { unlikeCard, likeCard, deleteCard as deleteCrdFromServer } from "./api.js";

const templateCard = document.querySelector("#card-template").content;

function createCard(dataCard, handleLike, handleImageClick, handleDeleteCard) {
  const cardElement = templateCard.cloneNode(true);
  const cardImg = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCounter = cardElement.querySelector(".card__like-counter");

  // Заполняем данные карточки
  cardImg.src = dataCard.link;
  cardImg.alt = dataCard.name;
  cardTitle.textContent = dataCard.name;

  likeCounter.textContent = dataCard.likes || 0;

  // Проверяем, является ли текущий пользователь владельцем карточки
  if (dataCard.ownerId === dataCard.userId) {
    deleteButton.addEventListener("click", (evt) => deleteCard(evt, dataCard.id));
  } else {
    deleteButton.remove();
  }

  // Обработчик лайка
  likeButton.addEventListener("click", (evt) =>
    handleLike(evt, dataCard.id, likeCounter)
  );

  // Обработчик клика по изображению
  cardImg.addEventListener("click", () => handleImageClick(dataCard));

  return cardElement;
}

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
