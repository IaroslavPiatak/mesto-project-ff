// Блок импортов
import "../pages/index.css";
import { createCard, handleLike } from "./cards.js";
import { openModal, closeModal, handleImageClick } from "./modal.js";
import { validationConfig } from "./validationConfig.js";
import { enableValidation } from "./validation.js";
import * as api from "./api.js";

// "Включаем" валидацию
enableValidation(validationConfig);

//  Ищем DOM элементы
const cardsList = document.querySelector(".places__list");
const buttonEditProfile = document.querySelector(".profile__edit-button");
const buttonAddCard = document.querySelector(".profile__add-button");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__image");

// Ищем элементы, связанные с Forms
const listForms = document.forms;
const nameInput = listForms["edit-profile"]["name"];
const jobInput = listForms["edit-profile"]["description"];
const popupEditAvatar = document.querySelector(".popup_type_avatar");
const avatarForm = listForms["edit-avatar"];
const avatarInput = avatarForm["avatar"];
const avatarSubmitButton = avatarForm.querySelector(".popup__button");

// Ищем элементы, связанные с Popups
const popupAddCard = document.querySelector(".popup_type_new-card");
const popupEditProfile = document.querySelector(".popup_type_edit");
const popupsList = document.querySelectorAll(".popup");
popupsList.forEach((elem) => {
  elem.classList.add("popup_is-animated");
  elem.addEventListener("click", function (evt) {
    const popup = evt.target.closest(".popup");
    if (evt.target.classList.contains("popup__close") || evt.target === elem) {
      closeModal(popup);
    }
  });
});

// Работаем с API

// Запрашиваем id юзера и карточки
function promiseInit() {
  Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userData, cards]) => {
      updateProfileInfo(userData); // сверяем профиль с сервером (имя, описание)
      renderCards(cards, userData._id); // отрисовываем
    })
    .catch(console.error); // вывод ошибки
}

function renderCards(cards, userId) {
  while (cardsList.firstChild) {
    cardsList.removeChild(cardsList.firstChild);
  } // чистим старые карточки, чтобы не мешать с новыми
  cards.forEach((cardData) => {
    cardsList.append(
      createCard(cardData, userId, handleLike, handleImageClick)
    );
  });
}

// Обновление  профиля
function updateProfileInfo(userData) {
  profileName.textContent = userData.name;
  profileDescription.textContent = userData.about;
  profileAvatar.style.backgroundImage = `url('${userData.avatar}')`;
}

promiseInit(); // запускаем адскую машину

// Обработчики открытия-закрытия попапа
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

// Обработчики форм
function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();
  const submitButton = evt.submitter;
  submitButton.textContent = "Сохранение...";
  submitButton.disabled = true;
  api
    .updateProfile(nameInput.value, jobInput.value)
    .then((userData) => {
      // Обновляем данные в интерфейсе
      updateProfileInfo(userData);
      // Закрываем модальное окно
      closeModal(popupEditProfile);
    })
    .catch((error) => {
      console.error("Ошибка при обновлении профиля:", error);
    })
    .finally(() => {
      // Восстанавливаем кнопку
      submitButton.textContent = "Сохранить";
      submitButton.disabled = false;
    });
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const submitButton = evt.submitter;
  submitButton.textContent = "Сохранение...";
  submitButton.disabled = true;

  const name = listForms["new-place"]["place-name"].value;
  const link = listForms["new-place"]["link"].value;

  
  api
    .getUserInfo()
    .then((userData) => {
      addCard(userData, name, link); // Передаем в addCard
    })
    .catch((error) => {
      console.error("Ошибка при получении данных пользователя:", error);
    });

  // Выносим логику добавления карточки в отдельную функцию
  function addCard(userData, name, link) {
    api
      .addNewCard(name, link)
      .then((cardData) => {
        cardsList.prepend(
          createCard(cardData, userData._id, handleLike, handleImageClick) // Передаем currentUserId
        );
        closeModal(popupAddCard);
        listForms["new-place"].reset();
      })
      .catch((error) => {
        console.error("Ошибка при добавлении карточки:", error);
      })
      .finally(() => {
        submitButton.textContent = "Создать";
        submitButton.disabled = false;
      });
  }
}

function handleEditAvatarSubmit(evt) {
  evt.preventDefault();
  const avatarUrl = avatarInput.value;
  avatarSubmitButton.textContent = "Сохранение...";
  avatarSubmitButton.disabled = true;

  api
    .updateAvatar(avatarUrl)
    .then((userData) => {
      profileAvatar.style.backgroundImage = `url(${userData.avatar})`;
      closeModal(popupEditAvatar);
      avatarForm.reset();
    })
    .catch((err) => {
      console.error("Ошибка обновления аватара:", err);
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
