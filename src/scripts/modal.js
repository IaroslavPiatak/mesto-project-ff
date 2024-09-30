import { listCard, createCard, removeCard, likeToggle, imgPopupFunction } from "./cards";
export {escClosePopup}
// закрытие через esc
function escClosePopup() {
  function closePopup(evt) {
    const openPopup = document.querySelector('.popup_is-opened');
    if(evt.key === 'Escape' && openPopup !== null)
    {
      openPopup.classList.remove('popup_is-opened');
      window.removeEventListener('keydown', closePopup)
    }
  }
  window.addEventListener('keydown', closePopup)
  

}

// попап - профиль
const buttonProfileEdit = document.querySelector('.profile__edit-button');
const profileForm = document.forms['edit-profile'].elements;
profileForm.name.value = document.querySelector('.profile__title').textContent;
profileForm.description.value = document.querySelector('.profile__description').textContent;
function handleFormSubmit(evt) {
  evt.preventDefault();
  document.querySelector('.profile__title').textContent = profileForm.name.value;
  document.querySelector('.profile__description').textContent = profileForm.description.value;
  document.querySelector('.popup_type_edit').classList.remove('popup_is-opened');
}
document.forms['edit-profile'].addEventListener('submit', handleFormSubmit); 
buttonProfileEdit.addEventListener('click', () => {
  document.querySelector('.popup_type_edit').classList.add('popup_is-opened');
  escClosePopup()
});

// попап - карточка
const addCard = document.querySelector('.profile__add-button');
const addCardForm = document.forms['new-place'];
function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const placeName = addCardForm.elements['place-name'].value;
  const imgLink  = addCardForm.elements.link.value;
  listCard.prepend(createCard(imgLink, placeName, removeCard, likeToggle, imgPopupFunction));
  document.querySelector('.popup_type_new-card').classList.remove('popup_is-opened');
}
addCardForm.addEventListener('submit', handleAddCardFormSubmit);
addCard.addEventListener('click', () => {
  document.querySelector('.popup_type_new-card').classList.add('popup_is-opened');
  escClosePopup();
})

// закрытие через крестик
const closePopupButtons = document.querySelectorAll('.popup__close');
closePopupButtons.forEach(function(button) {
  button.addEventListener('click', () => {
    button.closest('.popup').classList.remove('popup_is-opened');
    
  })
})

// закрытие через оверлей
window.addEventListener('click', function(evt) {
  if(evt.target.classList.contains('popup')) {
   const popups = this.document.querySelectorAll('.popup');
   popups.forEach(function(popup) {
    popup.classList.remove('popup_is-opened');
   })
  }
})

