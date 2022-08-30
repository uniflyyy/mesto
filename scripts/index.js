import Card from './Card.js';
import FormValidator from './FormValidator.js';

const initialCards = [
  {
    name: 'Карачаевск',
    link: './images/image_1.jpg'
  },
  {
    name: 'Гора Эльбрус',
    link: './images/image_2.png'
  },
  {
    name: 'Домбай',
    link: './images/image_3.png'
  },
  {
    name: 'Трентино-Альто-Адидже',
    link: './images/image_4.jpg'
  },
  {
    name: 'Кампс-бей',
    link: './images/image_5.jpg'
  },
  {
    name: 'Пещеры Бату',
    link: './images/image_6.jpg'
  }
];

const params =  {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: '.popup__input_type_error',
  errorClass: 'popup__input-error_active',
  formEditProfile: '.popup_type_edit',
  formAddPhoto: '.popup_type_photo'
}

export const page = document.querySelector('.page');
const elementsList = document.querySelector('.elements__list'); // Находим блок списка карточек
//Окно редактирования профиля
const popupEdit = document.querySelector('.popup_type_edit');
const popupOpenEdit = document.querySelector('.profile__button_type_edit'); // Находим кнопку для открытия popup
const profileName = document.querySelector('.profile__name'); // Находим блок с именем
const profileDesc = document.querySelector('.profile__description'); // Находим блок с описанием
const inputUserName = popupEdit.querySelector('.popup__input_type_username');
const inputUserDescription = popupEdit.querySelector('.popup__input_type_description');
const buttonCloseEdit = popupEdit.querySelector('.popup__close'); // Находим кнопку для закрытия popup
//Окно добавления фотографии
const popupAdd = document.querySelector('.popup_type_photo');
const popupOpenAdd = document.querySelector('.profile__button_type_add');
const buttonCloseAdd = popupAdd.querySelector('.popup__close');
//Инпуты окна добавления фотографии
const popupInputCardName = document.querySelector('.popup__input_type_name');
const popupInputCardSrc = document.querySelector('.popup__input_type_src');
//Окно просмотра фотографии
export const popupZoom = document.querySelector('.popup_type_zoom');
export const zoomingImage = popupZoom.querySelector('.popup__image');
export const zoomingFigcaption = popupZoom.querySelector('.popup__figcaption');
const buttonCloseZoom = popupZoom.querySelector('.popup__close');

const formEditProfile = popupEdit.querySelector('.popup__form'); // Находим форму в DOM
const formAddPhoto = popupAdd.querySelector('.popup__form');

// Функция добавления карточки в конец списка
const prepend = (element) => {
  return elementsList.prepend(element);
}

// Перебераем массив где каждому item присваиваем name, link, cardSelector
initialCards.forEach((item) => {
  const card = new Card(item.name, item.link,'#template-card');
  const cardItem = card.generateCard();
  prepend(cardItem);
})
//Добавление данных новой карточки
const handleFormSubmitAdd = (evt) => {
  evt.preventDefault();
  const card = new Card(popupInputCardName.value, popupInputCardSrc.value,'#template-card')
  const cardItem = card.generateCard();
  prepend(cardItem);
  closePopup(popupAdd);
}

// Напишем функцию открытия
export const openPopup = (popup) => {
  popup.classList.add('popup_open');
  document.addEventListener('keydown', closeByEsc);
  popup.addEventListener('mousedown', closeByClick);
}
// Наишем функцию закрытия окна
const closePopup = (popup) => {
  popup.classList.remove('popup_open');
  document.removeEventListener('keydown', closeByEsc);
  popup.removeEventListener('mousedown', closeByClick);
}
const closeByEsc = (evt) => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_open');
    closePopup(openedPopup, evt);
    }
}
const closeByClick = (evt) => {
  if (evt.currentTarget === evt.target) {
    closePopup(evt.target, evt);
    }
}
// Напишем функцию загрузки данных
const loadData = () => {
  inputUserName.value = profileName.textContent;
  inputUserDescription.value = profileDesc.textContent;
}

const handleFormSubmitEdit = (evt) => {
  evt.preventDefault();
  profileName.textContent = inputUserName.value;
  profileDesc.textContent = inputUserDescription.value;
  closePopup(popupEdit);
}

//Окно добавления фотографий
popupOpenAdd.addEventListener('click', () => {
  const buttonElement = formAddPhoto.querySelector('.popup__button');
  const inputErrors = popupAdd.querySelectorAll('.popup__input_type_error');
  popupInputCardName.value = '';
  popupInputCardSrc.value = '';
  inputErrors.forEach((elementError) => {
    elementError.textContent = '';
    elementError.classList.remove('popup__input_type_error-active');
  })
  buttonElement.setAttribute('disabled', '');
  openPopup(popupAdd);
});  

formEditProfile.addEventListener('submit', handleFormSubmitEdit);
buttonCloseAdd.addEventListener('click', () => {
  closePopup(popupAdd)
});

//Окно редактирования личных данных
popupOpenEdit.addEventListener('click', () => {
  loadData();
  const inputErrors = popupEdit.querySelectorAll('.popup__input_type_error');
  inputErrors.forEach((elementError) => {
    elementError.textContent = '';
    elementError.classList.remove('popup__input_type_error-active');
  })
  openPopup(popupEdit);
});
formAddPhoto.addEventListener('submit', handleFormSubmitAdd);
buttonCloseEdit.addEventListener('click', () => {
  closePopup(popupEdit);
});

//Зум фотографии
buttonCloseZoom.addEventListener('click', () => {
  page.classList.remove('page_overflowed');
  closePopup(popupZoom);
  zoomingImage.removeAttribute('src');
  zoomingImage.removeAttribute('alt');
  zoomingFigcaption.textContent = '';
});

const formEditProfileValidator = new FormValidator(params, params.formEditProfile);
formEditProfileValidator.enableValidation();
const formAddPhotoValidator = new FormValidator(params, params.formAddPhoto);
formAddPhotoValidator.enableValidation();