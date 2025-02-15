// Навешиваем слушатели на форму и вызваем функцию по навешиванию на инпуты
function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, config);
  });
}

// Установка слушателей на инпуты и кнопку
function setEventListeners(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, config);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
}

// Отключение или включение кнопки в зависимости от валидности всех полей
function toggleButtonState(inputList, buttonElement, config) {
  const isFormInvalid = inputList.some((inputElement) => {
    return !inputElement.validity.valid || (inputElement.dataset.pattern && !/^[a-zA-Zа-яА-ЯёЁ\s-]+$/.test(inputElement.value));
  });

  if (isFormInvalid) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}
// Функции показывающие-отключающие span - ошибку
function showInputError(formElement, inputElement, errorMessage, config) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
}

function hideInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = "";
}

//  Валидация инпута
function checkInputValidity(formElement, inputElement, config) {
  const errorMessage = inputElement.dataset.error || "Недопустимые символы";

  if (inputElement.dataset.pattern === "true" && inputElement.type === "text") {
    // Если поле должно проверяться по паттерну (и оно текстовое)
    const regex = /^[a-zA-Zа-яА-ЯёЁ\s-]+$/;
    if (!regex.test(inputElement.value)) {
      showInputError(formElement, inputElement, errorMessage, config);
      return;
    }
  }

  // Проверка стандартной валидации браузера (например, для URL)
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
}

// Очистка ошибок, при закрытиее попапа
function clearValidation(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  inputList.forEach(inputElement => {
    hideInputError(formElement, inputElement, config); // Скрываем ошибки
    inputElement.value = inputElement.defaultValue || ''; // Сбрасываем значение, если нужно
  });

  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  if (buttonElement) {
    toggleButtonState(inputList, buttonElement, config); // Проверяем кнопку
  }
}


export { showInputError, hideInputError, checkInputValidity, enableValidation, clearValidation};
