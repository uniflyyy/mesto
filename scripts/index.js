// Импорт классов
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage.js';
import Section from './Section.js';
import UserInfo from './UserInfo.js';

// Переменные

const profileInfo = document.querySelector('.profile-info');
const popupEditButton = profileInfo.querySelector('.profile-info__edit-button');
const userNameSelector = '.profile-info__name';
const userDescriptionSelector = '.profile-info__description';
const popupProfileSelector = '.popup_profile-edit';
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const cardTemplateSelector = '#card-template';
const cardsContainerSelector = '.cards';
const cardAddButton = document.querySelector('.profile__add-button');
const popupAddCardSelector = '.popup_add-card';
const popupPictureSelector = '.popup_picture';

// Объекты

const validatorSelectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error_active',
};

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

// Создание экземпляров валидаторов для форм

const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute('name');
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

// Экземпляр для создания карточки

const createCard = (item) => {
  return new Card(
    {
      item: item,
      handleCardClick: () => {
        popupPicture.open(item);
      },
    },
    cardTemplateSelector
  );
};

const popupPicture = new PopupWithImage(popupPictureSelector);
popupPicture.setEventListeners();

const cardArr = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = createCard(item);
      const cardElement = card.generateCard();
      cardArr.addItem(cardElement);
    },
  },
  cardsContainerSelector
);

cardArr.renderItems();

const userInfo = new UserInfo({
  name: userNameSelector,
  description: userDescriptionSelector,
});

const popupProfileEdit = new PopupWithForm(popupProfileSelector, () => {
  userInfo.setUserInfo(jobInput, nameInput);
});

popupProfileEdit.setEventListeners();

popupEditButton.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.description;
  formValidators['popup-profile'].resetValidation();
  popupProfileEdit.open();
});

const popupCardAdd = new PopupWithForm(popupAddCardSelector, (items) => {
  const card = createCard(items);
  console.log(card);
  const cardElement = card.generateCard();
  console.log(cardElement);
  cardArr.addItem(cardElement);
  console.log(popupCardAdd);
});

popupCardAdd.setEventListeners();

cardAddButton.addEventListener('click', () => {
  formValidators['popup-add-card'].resetValidation();
  popupCardAdd.open();
});

enableValidation(validatorSelectors);