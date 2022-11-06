import './index.css';

import {Section} from '../components/Section.js';
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {PopupWithConfirm} from '../components/PopupWithConfirm.js';
import {UserInfo} from '../components/UserInfo.js';
import {Api} from '../components/Api.js';
import {photoCardSettings} from '../utils/constants.js';
import {validationSettings} from '../utils/constants.js';

// selectors

const photoTemplateSelector = '#photos-element';
const userNameSelector = '.profile__name';
const userCaptionSelector = '.profile__caption';
const userAvatarSelector = '.profile__avatar'
const openFormButtonSelector = '.button-open-form';

const photoListSelector = '.photos__list';
const popupPhotosSelector = '.popup-photos';
const popupAddSelector = '.popup-add';
const popupEditProfileSelector = '.popup-edit';
const popupConfirmSelector = '.popup-confirm';
const popupUpdateAvatarSelector = '.popup-update-avatar';

// elements

const profileSectionElement = document.querySelector('.profile');
const openFormButtonsList = Array.from(profileSectionElement.querySelectorAll(openFormButtonSelector));
const addButtonElement = profileSectionElement.querySelector('.profile__add-button');
const editButtonElement = profileSectionElement.querySelector('.profile__edit-button');
const updateAvatarButtonElement = profileSectionElement.querySelector('.profile__avatar-edit-button');

const popupEditProfileElement = document.querySelector('.popup-edit');

const formsList = Array.from(document.forms);
const inputProfileNameElement = popupEditProfileElement.querySelector('#profile-name');
const inputProfileCaptionElement = popupEditProfileElement.querySelector('#profile-caption');

let tempCard = null;
let ownerId = null;

const userInfo = new UserInfo({ userNameSelector, userCaptionSelector, userAvatarSelector });
const cardsList = new Section({
  renderer: (data) => {
    const card = createNewCard(data);
    const cardElement = card.generateCard();
    card.setLikeCount(data);
    cardsList.addItem(cardElement, 'append');
  }
}, photoListSelector);
const photoPopup = new PopupWithImage(popupPhotosSelector);

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-52',
  headers: {
    authorization: 'cf560b3a-e8cb-4e2c-b5b7-7256e7398135',
    'Content-Type': 'application/json'
  }
});

api.getInitialData()
  .then((data) => {
    const [userData, cardsData] = data;
    ownerId = userData._id;
    userInfo.setUserInfo(userData);
    cardsList.renderCards(cardsData);
  })
  .catch((err) => {
    console.log(err);
  })

const popupWithConfirm = new PopupWithConfirm(popupConfirmSelector, {
  submit: (data) => {
    api.deleteCard(data)
      .then(() => {
        tempCard.deleteCard();
      })
      .then(() => {
        tempCard = null;
        popupWithConfirm.close();
      })
      .catch((err) => {
        console.log(err);
      })
  }
})

const createNewCard = (data) => {
  const card = new Card(data, photoTemplateSelector, photoCardSettings, ownerId, {
    handleCardClick: (data) => {
      photoPopup.open(data);
    },
    handleDeleteCardClick: () => {
      tempCard = card;
      popupWithConfirm.open(data);
    },
    setLike: (data) => {
      api.setLike(data)
        .then((data) => {
          card.setLikeCount(data);
        })
        .catch((err) => {
          console.log(err);
        })
    },
    deleteLike: (data) => {
      api.deleteLike(data)
        .then((data) => {
          card.setLikeCount(data);
        })
        .catch((err) => {
          console.log(err);
        })
    },
  });
  return card;
}

const popupWithAddForm = new PopupWithForm(popupAddSelector, {
  submit: (data) => {
    popupWithAddForm.renderLoading(true);
    api.postCard(data)
      .then((res) => {
        const card = createNewCard(res);
        const cardElement = card.generateCard();
        cardsList.addItem(cardElement, 'prepend');
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupWithAddForm.renderLoading(false);
        popupWithAddForm.close()
      })
  }
})

const popupWithInfoForm = new PopupWithForm(popupEditProfileSelector, {
  submit: (data) => {
    popupWithInfoForm.renderLoading(true, 'Загрузка...');
    api.setUserInfo(data)
      .then((res) => {
        userInfo.setUserInfo(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupWithInfoForm.renderLoading(false);
        popupWithInfoForm.close();
      })
  }
})

const popupWithUpdateAvatarForm = new PopupWithForm(popupUpdateAvatarSelector, {
  submit: (data) => {
    popupWithUpdateAvatarForm.renderLoading(true);
    api.setUserAvatar(data)
      .then((res) => {
        userInfo.setUserAvatar(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupWithUpdateAvatarForm.renderLoading(false);
        popupWithUpdateAvatarForm.close();
      })
  }
})

addButtonElement.addEventListener('click', () => {
  popupWithAddForm.open();
})

editButtonElement.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  inputProfileNameElement.value = userData.name;
  inputProfileCaptionElement.value = userData.about;
  popupWithInfoForm.open();
})

updateAvatarButtonElement.addEventListener('click', () => {
  popupWithUpdateAvatarForm.open();
})

const setFormValidation = (formElement) => {
  const formValidator = new FormValidator(formElement, openFormButtonsList, validationSettings);
  formValidator.enableValidation();
}

formsList.forEach(form => {
  setFormValidation(form);
})
