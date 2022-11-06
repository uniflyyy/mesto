export default class Card {
  constructor(config, data, userId, openImagePopup, deleteCard, setLikeCard, removeLikeCard) {
    this._title = data.name;
    this._image = data.link;
    this._likes = data.likes;
    this._cardId = data._id;
    this._cardOwnerId = data.owner._id;
    this._userId = userId;
    this._templateSelector = config.templateSelector;
    this._cardSelector = config.cardSelector;
    this._imageSelector = config.imageSelector;
    this._basketButtonSelector = config.basketButtonSelector;
    this._titleSelector = config.titleSelector;
    this._likeButtonSelector = config.likeButtonSelector;
    this._likeCounterSelector = config.likeCounterSelector;
    this._activeLikeButtonClass = config.activeLikeButtonClass;
    this._openImagePopup = openImagePopup;
    this._handleDeleteCard = deleteCard;
    this._handleSetLike = setLikeCard;
    this._handleRemoveLike = removeLikeCard;
  }

  // Возвращает шаблон карточки
  _getTemplate() {
    this._cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(this._cardSelector)
      .cloneNode(true);

    return this._cardElement;
  }

  // Удаляет корзину, если карточка не принадлежит пользователю
  _deleteNotUserBasket() {
    if (this._userId !== this._cardOwnerId) {
      this._basketButtonElement.remove();
    }
  }

  // Добавляет лайк, если пользователь его поставил
  _checkLikeStatus() {
    this._likes.forEach((user) => {
      if (this._userId === user._id) {
        this._likeButtonElement.classList.add(this._activeLikeButtonClass);
      }
    });
  }

  // Меняет состояние лайка
  updateLikes(data) {
    this._likes = data.likes;
    this._likeCounterElement.textContent = data.likes.length;
    this._likeButtonElement.classList.toggle(this._activeLikeButtonClass);
  }

  // Удаляет карточку
  deleteCard() {
    this._view.remove();
    this._view = null;
  }

  // Убирает или устанавливает лайк в зависимости от состояния лайка
  _handleLikeClick() {
    if (this._likeButtonElement.classList.contains(this._activeLikeButtonClass)) {
      this._handleRemoveLike(this._cardId);
    }
    else {
      this._handleSetLike(this._cardId);
    }
  }

  // Открывает попап и перекидывает ID карточки в попап с подтверждением
  _handleBasketClick() {
    this._handleDeleteCard(this._cardId);
  }

  // Открывает попап для просмотра карточки
  _handleImageClick() {
    this._openImagePopup(this._title, this._image);
  }

  // Устанавливает слушатели событий
  _setEventListeners() {
    this._likeButtonElement.addEventListener('click', this._handleLikeClick.bind(this));

    this._basketButtonElement.addEventListener('click', this._handleBasketClick.bind(this));

    this._imageElement.addEventListener('click', this._handleImageClick.bind(this));
  }

  // Возвращает разметку заполненной карточки с установленными слушателями событий
  generateCard() {
    this._view = this._getTemplate();

    this._titleElement = this._view.querySelector(this._titleSelector);
    this._imageElement = this._view.querySelector(this._imageSelector);
    this._likeButtonElement = this._view.querySelector(this._likeButtonSelector);
    this._basketButtonElement = this._view.querySelector(this._basketButtonSelector);
    this._likeCounterElement = this._view.querySelector(this._likeCounterSelector);

    this._titleElement.textContent = this._title;
    this._imageElement.setAttribute('src', this._image);
    this._imageElement.setAttribute('alt', this._title);
    this._likeCounterElement.textContent = this._likes.length;
    this._deleteNotUserBasket();
    this._checkLikeStatus();

    this._setEventListeners();

    return this._view;
  }
}
