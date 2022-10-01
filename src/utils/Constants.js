const popupEditButton = document.querySelector('.profile-info__edit-button');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const cardAddButton = document.querySelector('.profile__add-button');
const userNameSelector = '.profile-info__name';
const userDescriptionSelector = '.profile-info__description';
const popupProfileSelector = '.popup_profile-edit';
const cardTemplateSelector = '#card-template';
const cardsContainerSelector = '.cards';
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
      link: 'http://karachaevsk.info/wp-content/uploads/2016/03/vRD8gH_DXWo.jpg'
    },
    {
      name: 'Гора Эльбрус',
      link: 'https://1000prichin.ru/images/STATI/elbrus/elbres1_2.jpg'
    },
    {
      name: 'Домбай',
      link: 'https://turvopros.com/wp-content/uploads/2018/11/kurort-dombai.jpg'
    },
    {
      name: 'Трентино-Альто-Адидже',
      link: 'https://www.farodiroma.it/wp-content/uploads/2018/03/home4911.jpg'
    },
    {
      name: 'Кампс-бей',
      link: 'https://cf.bstatic.com/xdata/images/xphoto/1920x1080/115250351.jpg?k=f92e0c7cd77c8bbb7ceba5846b5a63155276d57443c0b842cafe00c9dccb9bac&o='
    },
    {
      name: 'Пещеры Бату',
      link: 'https://vsegda-pomnim.com/uploads/posts/2022-03/1647812792_31-vsegda-pomnim-com-p-peshcheri-batu-foto-32.jpg'
    }
];

export {
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
};