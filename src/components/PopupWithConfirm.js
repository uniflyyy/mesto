import Popup from './Popup.js';

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._formElement = this._popupElement.querySelector('.popup__form');
    this._submitButtonElement = this._formElement.querySelector('.popup__submit');
    this._submitButtonText = this._submitButtonElement.textContent;
  }

  setHandleSubmit(handleSubmit) {
    this._handleSubmit = handleSubmit;
  }

  _handleFormSubmit(event) {
    event.preventDefault();
    this._handleSubmit();
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', this._handleFormSubmit.bind(this))
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButtonElement.textContent = 'Удаление...';
    }
    else {
      this._submitButtonElement.textContent = this._submitButtonText;
    }
  }
}
