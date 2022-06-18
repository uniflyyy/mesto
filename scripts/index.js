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

const page = document.querySelector('.page');
const elementsList = document.querySelector('.elements__list'); // Находим блок списка карточек
const cardTemplate = document.querySelector('#template-card').content;
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
const popupZoom = document.querySelector('.popup_type_zoom');
const zoomingImage = popupZoom.querySelector('.popup__image');
const zoomingFigcaption = popupZoom.querySelector('.popup__figcaption');
const buttonCloseZoom = popupZoom.querySelector('.popup__close');

const formEditProfile = popupEdit.querySelector('.popup__form'); // Находим форму в DOM
const formAddPhoto = popupAdd.querySelector('.popup__form');

// Напишем функцию открытия
const openPopup = (popup) => {
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
  const openedPopup = document.querySelector('.popup_open');
  if(evt.key === 'Escape') {
      closePopup(openedPopup, evt);
    }
}
const closeByClick = (evt) => {
  const openedPopup = document.querySelector('.popup_open');
  if(evt.currentTarget === evt.target) {
      closePopup(openedPopup, evt);
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
//Добавление данных новой карточки
const handleFormSubmitAdd = (evt) => {
  evt.preventDefault();
  const cardName = popupInputCardName.value;
  const cardImage = popupInputCardSrc.value;
  addCard(elementsList, createCard(cardName, cardImage));
  closePopup(popupAdd);
}
function createCard(cardName, cardImage) {
  const cardElement = cardTemplate.cloneNode(true);

  const cardElementImage = cardElement.querySelector('.elements__image');
  const cardElementLike = cardElement.querySelector('.elements__item');

  cardElement.querySelector('.elements__header').textContent = cardName;
  cardElementImage.setAttribute('src', cardImage);
  cardElementImage.addEventListener('click', () => {
    page.classList.add('page_overflowed')
    zoomingImage.setAttribute('src', cardImage);
    zoomingImage.setAttribute('alt', cardName);
    zoomingFigcaption.textContent = cardName;
    openPopup(popupZoom);
  });

  cardElementLike.addEventListener('click', (evt) => {
    evt.target.classList.toggle('elements__like_active');
  });

  cardElement.querySelector('.elements__delete').addEventListener('click', evt => {
    const card = evt.target.closest('.elements__item');
    card.remove();
  });

  return cardElement;
}

function addCard(elementsList, cardElement) {
  elementsList.prepend(cardElement);
}

const renderAll = () => {
  initialCards.forEach((el) => {
    addCard(elementsList, createCard(el.name, el.link))
  })
}

//Окно добавления фотографий
popupOpenAdd.addEventListener('click', () => {
  popupInputCardName.value = '';
  popupInputCardSrc.value = '';
  openPopup(popupAdd);
});
formEditProfile.addEventListener('submit', handleFormSubmitEdit);
buttonCloseAdd.addEventListener('click', () => {
  closePopup(popupAdd)
});

//Окно редактирования личных данных
popupOpenEdit.addEventListener('click', () => {
  loadData();
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

renderAll();