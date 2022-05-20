const profileName = document.querySelector('.profile__name');
const profileDesc = document.querySelector('.profile__description');
const popup = document.querySelector('.popup');
const openPopupButton = document.querySelector('.profile__button_type_edit');
const closePopupButton = popup.querySelector('.popup__close');
const formElement = popup.querySelector('.popup__form');
const popupInput = formElement.querySelectorAll('.popup__input');
const popupSaveButton = popup.querySelector('.popup__button');

function openPopup () {
    popup.classList.add('popup_open');
    popup.removeEventListener('click', openPopup);
    popupInput[0].value = profileName.textContent;
    popupInput[1].value = profileDesc.textContent;
  }

function closePopup () {
    popup.classList.remove('popup_open')
  }

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = popupInput[0].value;
    profileDesc.textContent = popupInput[1].value;
    closePopup();
}
  
  openPopupButton.addEventListener('click', openPopup);
  closePopupButton.addEventListener('click', closePopup);
  formElement.addEventListener('submit',formSubmitHandler);