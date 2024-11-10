const popups = document.querySelectorAll('.popup');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const popupImageContainer = document.querySelector('.popup_type_image');

function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  enableEscClosePopup();
}

function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
}

function enableEscClosePopup() {
  function handleClosePopup(evt) {
    const openPopup = document.querySelector('.popup_is-opened');
    if (evt.key === 'Escape' && openPopup !== null) {
      closePopup(openPopup);
      window.removeEventListener('keydown', handleClosePopup);
    }
  }
  window.addEventListener('keydown', handleClosePopup);
}

const closePopupButtons = document.querySelectorAll('.popup__close');
closePopupButtons.forEach(button => {
  button.addEventListener('click', () => {
    const popup = button.closest('.popup');
    closePopup(popup);
  });
});

window.addEventListener('click', evt => {
  if (evt.target.classList.contains('popup')) {
    popups.forEach(popup => closePopup(popup));
  }
});

export { openPopup, closePopup, enableEscClosePopup, popupImage, popupCaption, popupImageContainer };
