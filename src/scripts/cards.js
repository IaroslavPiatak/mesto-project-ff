const templateCard = document.querySelector("#card-template").content;

function createCard(dataCard, handleLike, handleImageClick, deleteCard) {
  const cardElement = templateCard.cloneNode(true);
  const cardImg = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  likeButton.addEventListener("click", handleLike);
  deleteButton.addEventListener("click", deleteCard);
  cardImg.addEventListener("click", () => handleImageClick(dataCard));
  cardImg.src = dataCard.link;
  cardImg.alt = dataCard.name;
  cardTitle.textContent = dataCard.name;

  return cardElement;
}

function handleLike(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

function deleteCard(evt) {
  evt.target.closest(".card").remove();
}

export { createCard, deleteCard, handleLike };
