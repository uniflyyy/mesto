// Импорт стилей
import './index.css';

// Импорт данных
import {
  validatorSelectors,
  cardSelectors,
  avatarPopupForm,
  profilePopupForm,
  cardPopupForm,
  profileAvatarEditButton,
  profileEditButton,
  profileAddButton,
  profilePopupNameInput,
  profilePopupWorkInput
} from '../utils/constants.js';

// Импорт классов
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithConfirmation from '../components/PopupWithConfirm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

// Переменные
let userId;

// Экземпляры класса для валидации форм
const avatarFormValidator = new FormValidator(validatorSelectors, avatarPopupForm);
const profileFormValidator = new FormValidator(validatorSelectors, profilePopupForm);
const cardFormValidator = new FormValidator(validatorSelectors, cardPopupForm);

// API
const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-52',
  headers: {
    authorization: 'cf560b3a-e8cb-4e2c-b5b7-7256e7398135',
    'Content-Type': 'application/json',
  },
});

// Экземпляр класса для взаимодействия с профилем
const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  workSelector: '.profile__work',
  avatarSelector: '.profile__avatar'
});

// Экземпляр класса для вставки карточек
const cardSection = new Section(
  (item) => {
    cardSection.addItemToTheBeginning(createCard(item));
  },
  '.cards'
);

// Экземпляры классов для взаимодействия с попапами
const popupWithConfirmation = new PopupWithConfirmation(
  '.popup_type_card-delete'
);

const popupWithImage = new PopupWithImage('.popup_type_image');

const cardPopupWithForm = new PopupWithForm(
  '.popup_type_card',
  (data) => {
    cardPopupWithForm.renderLoading(true);

    api.addNewCard(data)
      .then((data) => {
        cardSection.addItemToTheEnd(createCard(data));
        cardPopupWithForm.close();
        cardFormValidator.resetPopup();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        cardPopupWithForm.renderLoading(false);
      });
  }
);

const avatarPopupWithForm = new PopupWithForm(
  '.popup_type_avatar',
  (data) => {
    avatarPopupWithForm.renderLoading(true);

    api.saveAvatar(data)
      .then((data) => {
        userInfo.setUserInfo(data);
        avatarPopupWithForm.close();
        avatarFormValidator.resetPopup();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        avatarPopupWithForm.renderLoading(false);
      })
  }
);

const profilePopupWithForm = new PopupWithForm(
  '.popup_type_profile',
  (data) => {
    profilePopupWithForm.renderLoading(true);

    api.saveUserInfo(data)
      .then((data) => {
        userInfo.setUserInfo(data);
        profilePopupWithForm.close();
        profileFormValidator.resetPopup();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        profilePopupWithForm.renderLoading(false);
      });
  }
);

// Функция для создания карточки
const createCard = (data) => {
  const card = new Card(
    cardSelectors,
    data,
    userId,
    popupWithImage.open.bind(popupWithImage),
    (cardId) => {
      popupWithConfirmation.open();
      popupWithConfirmation.setHandleSubmit(() => {
        popupWithConfirmation.renderLoading(true);
        api.deleteCard(cardId)
          .then(() => {
            card.deleteCard();
            popupWithConfirmation.close();
          })
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
          })
          .finally(() => {
            popupWithConfirmation.renderLoading(false);
          });
      });
    },
    (cardId) => {
      api.setLike(cardId)
        .then((data) => {
          card.updateLikes(data);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err.status}`);
        });
    },
    (cardId) => {
      api.removeLike(cardId)
        .then((data) => {
          card.updateLikes(data);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err.status}`);
        });
    }
  );

  const cardElement = card.generateCard();

  return cardElement;
};

// Функция-обработчик клика по кнопке редактирования аватара
const handleAvatarButtonClick = () => {
  avatarFormValidator.resetPopup();
  avatarPopupWithForm.open();
};

// Функция-обработчик клика по кнопке редактирования профиля
const handleEditButtonClick = () => {
  const { name, about } = userInfo.getUserInfo();
  profileFormValidator.resetPopup();
  profilePopupNameInput.value = name;
  profilePopupWorkInput.value = about;
  profilePopupWithForm.open();
};

// Функция-обработчик клика по кнопке создания карточки
const handleAddButtonClick = () => {
  cardFormValidator.resetPopup();
  cardPopupWithForm.open();
};

// Загрузка профиля и начальных карточек с сервера
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, initialCards]) => {
    userInfo.setUserInfo(userData);
    userId = userData._id;
    cardSection.renderItems(initialCards);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  });

// Установка слушателей событий попапам
popupWithConfirmation.setEventListeners();
popupWithImage.setEventListeners();
avatarPopupWithForm.setEventListeners();
profilePopupWithForm.setEventListeners();
cardPopupWithForm.setEventListeners();

// Установка слушателей кнопкам открытия попапов
profileAvatarEditButton.addEventListener('click', handleAvatarButtonClick);
profileEditButton.addEventListener('click', handleEditButtonClick);
profileAddButton.addEventListener('click', handleAddButtonClick);

// Включение валидации
avatarFormValidator.enableValidation();
profileFormValidator.enableValidation();
cardFormValidator.enableValidation();