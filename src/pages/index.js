// Импорт CSS-файла

import './index.css';

// Импорт классов
import Api from '../components/Api.js'
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';
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
  userAvatarSelector,
  popupAvatarEditSelector,
  avatarEditButton,
  popupDeleteConfirmSelector,
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

// API

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-52',
  headers: {
    authorization: 'cf560b3a-e8cb-4e2c-b5b7-7256e7398135',
    'Content-Type': 'application/json',
  },
});

// Экземпляр для создания карточки

const createCard = (item) => {
  const card = new Card(
    {
      item: item,
      handleCardClick: () => {
        popupPicture.open(item);
      },
      handleLikeClick: () => {
        card.handleLikeCard();
      },
      handleDeleteConfirm: () => {
        popupDeleteConfirm.setSubmitAction(() => {
          popupDeleteConfirm.renderLoadingDelete(true);
          api
            .delete(item._id)
            .then(() => {
              card.handleDeleteCard();
              popupDeleteConfirm.close();
            })
            .catch((err) => console.log(err))
            .finally(() => popupDeleteConfirm.renderLoadingDelete(false));
        });
        popupDeleteConfirm.open();
      },
    },
    cardTemplateSelector,
    userId,
    api
  );
  return card;
};

// Экземпляр popup с картинкой

const popupPicture = new PopupWithImage(popupPictureSelector);
popupPicture.setEventListeners();


// Рендер карточек из массива

const cardList = new Section(
  {
    renderer: (item) => {
      const card = createCard(item);
      const cardElement = card.generateCard();
      cardList.addItem(cardElement);
    },
  },
  cardsContainerSelector
);

// Экземпляр с данными пользователя

const userInfo = new UserInfo({
  name: userNameSelector,
  description: userDescriptionSelector,
  avatar: userAvatarSelector,
});

const popupProfileEdit = new PopupWithForm(popupProfileSelector, (items) => {
  popupProfileEdit.renderLoading(true);
  api
    .setUserProfile(items)
    .then((item) => {
      userInfo.setUserInfo(item);
      popupProfileEdit.close();
    })
    .catch((err) => console.log(err))
    .finally(() => popupProfileEdit.renderLoading(false));
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
  popupCardAdd.renderLoading(true);
  api
    .addUserCard(items)
    .then((item) => {
      const card = createCard(item);
      const cardElement = card.generateCard();
      cardList.addItem(cardElement);
      formValidators['popup-add-card'].resetValidation();
      popupCardAdd.close();
    })
    .catch((err) => console.log(err))
    .finally(() => popupCardAdd.renderLoading(false));
});

popupCardAdd.setEventListeners();

cardAddButton.addEventListener('click', () => {
  formValidators['popup-add-card'].resetValidation();
  popupCardAdd.open();
});

const popupAvatarEdit = new PopupWithForm(popupAvatarEditSelector, (items) => {
  popupAvatarEdit.renderLoading(true);
  api
    .editUserAvatar(items)
    .then((item) => {
      userInfo.setUserAvatar(item);
      popupAvatarEdit.close();
    })
    .catch((err) => console.log(err))
    .finally(() => popupAvatarEdit.renderLoading(false));
});

popupAvatarEdit.setEventListeners();
avatarEditButton.addEventListener('click', () => {
  formValidators['popup-avatar-edit'].resetValidation();
  popupAvatarEdit.open();
});

const popupDeleteConfirm = new PopupWithConfirm(popupDeleteConfirmSelector);
popupDeleteConfirm.setEventListeners();

// Вызовы функций
enableValidation(validatorSelectors);

let userId;

api
  .getData()
  .then(([cards, userData]) => {
    userInfo.setUserInfo(userData);
    userId = userData._id;

    cardList.renderItems(cards);
  })
  .catch((err) => console.log(err));