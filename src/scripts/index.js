import "../pages/index.css";
import { createCard, deleteCard, handleLike } from "./cards.js";
import { openModal, closeModal, handleImageClick} from "./modal.js";
import { validationConfig } from "./validationConfig.js";
import {enableValidation} from "./validation.js";
import * as api from './api.js';

// Валидация
enableValidation(validationConfig);


// DOM
const cardsList = document.querySelector(".places__list");
const buttonEditProfile = document.querySelector(".profile__edit-button");
const buttonAddCard = document.querySelector(".profile__add-button");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileAvatar = document.querySelector('.profile__image');

// Forms
const listForms = document.forms;
const nameInput = listForms["edit-profile"]["name"];
const jobInput = listForms["edit-profile"]["description"];
const popupEditAvatar = document.querySelector(".popup_type_avatar");
const avatarForm = listForms["edit-avatar"];
const avatarInput = avatarForm["avatar"];
const avatarSubmitButton = avatarForm.querySelector(".popup__button");

// Popups
const popupAddCard = document.querySelector(".popup_type_new-card");
const popupEditProfile = document.querySelector(".popup_type_edit");
const popupsList = document.querySelectorAll(".popup");
popupsList.forEach((elem) => {
  elem.classList.add("popup_is-animated");
  elem.addEventListener("click", function (evt) {
    const popup = evt.target.closest(".popup");
    if (
      evt.target.classList.contains("popup__close") ||
      evt.target.classList.contains("popup")
    ) {
      closeModal(popup);
    }
  });
});

// api
let userId;

// Запрашиваем id и карточки
function promiseInit() {
  Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userData, cards]) => {
      console.log(api.getUserInfo());
      userId = userData._id;
      updateProfileInfo(userData); 
      renderCards(cards); //Создаем карты
    })
    .catch(console.error);
}

function renderCards(cards) {
  cardsList.innerHTML = '';
  cards.forEach(card => {
    console.log(card);
    const dataCard = {
      id: card._id,
      name: card.name,
      link: card.link,
      likes: card.likes,
      ownerId: card.owner._id,
      userId,
    }
    cardsList.append(createCard(dataCard, handleLike, handleImageClick, deleteCard));
  });
}

// Обновление  профиля
function updateProfileInfo(userData) {
  profileName.textContent = userData.name;
  profileDescription.textContent = userData.about;
  profileAvatar.style.backgroundImage = `url(${userData.avatar})`;
}

promiseInit();




// Popups open-close handlers
buttonEditProfile.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(popupEditProfile);
});

buttonAddCard.addEventListener("click", () => {
  openModal(popupAddCard);
});

profileAvatar.addEventListener("click", () => {
  openModal(popupEditAvatar);
});

// Forms handlers
function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();
  api.updateProfile(nameInput.value, jobInput.value);
  const submitButton = evt.submitter;
  submitButton.textContent = 'Сохранение...';
  submitButton.disabled = true;
  api.updateProfile(nameInput.value, jobInput.value)
  .then((userData) => {
    // Обновляем данные в интерфейсе
    updateProfileInfo(userData);
    // Закрываем модальное окно
    closeModal(popupEditProfile);
  })
  .catch((error) => {
    console.error('Ошибка при обновлении профиля:', error);
    alert('Не удалось обновить профиль. Пожалуйста, попробуйте ещё раз.');
  })
  .finally(() => {
    // Восстанавливаем кнопку (опционально)
    submitButton.textContent = 'Сохранить';
    submitButton.disabled = false;
  });
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const submitButton = evt.submitter;
  submitButton.textContent = 'Сохранение...';
  submitButton.disabled = true;
  const name = listForms["new-place"]["place-name"].value;
  const link = listForms["new-place"]["link"].value;
  api.addNewCard(name, link)
    .then((cardData) => {
      console.log(cardData);
      const newCard = createCard(cardData, handleLike, handleImageClick, deleteCard);
      
      cardsList.prepend(newCard);
      closeModal(popupAddCard);
      listForms["new-place"].reset();
    })
    .catch((error) => {
      console.error('Ошибка при добавлении карточки:', error);
      alert('Не удалось добавить карточку. Пожалуйста, попробуйте ещё раз.');
    })
    .finally(() => {
      submitButton.textContent = 'Создать';
      submitButton.disabled = false;
    });
}

function handleEditAvatarSubmit(evt) {
  evt.preventDefault();
  const avatarUrl = avatarInput.value;
  
  avatarSubmitButton.textContent = "Сохранение...";
  avatarSubmitButton.disabled = true;

  api.updateAvatar(avatarUrl)
    .then((userData) => {
      profileAvatar.style.backgroundImage = `url(${userData.avatar})`;
      closeModal(popupEditAvatar);
      avatarForm.reset();
    })
    .catch((err) => {
      console.error("Ошибка обновления аватара:", err);
      alert("Не удалось обновить аватар. Попробуйте ещё раз.");
    })
    .finally(() => {
      avatarSubmitButton.textContent = "Сохранить";
      avatarSubmitButton.disabled = false;
    });
}

avatarForm.addEventListener("submit", handleEditAvatarSubmit);


listForms["edit-profile"].addEventListener(
  "submit",
  handleEditProfileFormSubmit
);
listForms["new-place"].addEventListener("submit", handleAddCardFormSubmit);

