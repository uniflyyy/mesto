let profileName = document.querySelector('.profile__name');
let profileDesc = document.querySelector('.profile__description');
let popup = document.querySelector('.popup');
let openPopupButton = document.querySelector('.profile__button_type_edit');
let closePopupButton = popup.querySelector('.popup__close');
let formElement = popup.querySelector('.popup__form');
let popupInput = formElement.querySelectorAll('.popup__input');
let popupSaveButton = popup.querySelector('.popup__button');

const openPopup = () => {
    popupInput[0].value = profileName.textContent;
    popupInput[1].value = profileDesc.textContent;
    return togglePopup();
  }
  const togglePopup = () => {
    return popup.classList.toggle('popup_open')
  }
  const formSubmitHandler = (evt) => {
    evt.preventDefault();
    profileName.textContent = popupInput[0].value;
    profileDesc.textContent = popupInput[1].value;
    return togglePopup();
  }
  
  openPopupButton.addEventListener('click', openPopup);
  closePopupButton.addEventListener('click', togglePopup);
  formElement.addEventListener('submit',formSubmitHandler);