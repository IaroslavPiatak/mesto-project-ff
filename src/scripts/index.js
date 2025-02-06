import '../pages/index.css';
import {initialCards, createCard} from './cards.js';

// DOM-------------------------------------------------------------------------------------------------------------------------
const templateCard = document.querySelector("#card-template").content;
const listCard = document.querySelector('.places__list');



// Render cards----------------------------------------------------------------------------------------------------------------
initialCards.forEach((dataCard) => {
  listCard.append(createCard(dataCard));
});

// Export----------------------------------------------------------------------------------------------------------------------

export {templateCard}


