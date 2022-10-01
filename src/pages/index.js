// Импорт CSS-файла

import './index.css';

// Импорт классов
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';

// Импорт переменных

import {
  popupEditButton,
  nameInput,
  jobInput,
  cardAddButton,
  userNameSelector,
  userDescriptionSelector,
  popupProfileSelector,
  cardTemplateSelector,
  cardsContainerSelector,
  popupAddCardSelector,
  popupPictureSelector,
  validatorSelectors,
  initialCards,
} from '../utils/Constants.js';

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

// Экземпляр popup с картинкой

const popupPicture = new PopupWithImage(popupPictureSelector);
popupPicture.setEventListeners();


// Рендер карточек из массива

const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = createCard(item);
      const cardElement = card.generateCard();
      cardList.addItem(cardElement);
    },
  },
  cardsContainerSelector
);

cardList.renderItems();

// Экземпляр с данными пользователя

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
  cardList.addItem(cardElement);
  console.log(popupCardAdd);
});

popupCardAdd.setEventListeners();

cardAddButton.addEventListener('click', () => {
  formValidators['popup-add-card'].resetValidation();
  popupCardAdd.open();
});

enableValidation(validatorSelectors);