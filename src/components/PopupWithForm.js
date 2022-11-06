import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._formElement = this._popupElement.querySelector('.popup__form');
    this._inputList = Array.from(this._formElement.querySelectorAll('.popup__input'));
    this._submitButtonElement = this._formElement.querySelector('.popup__submit');
    this._submitButtonText = this._submitButtonElement.textContent;
    this._inputValues = {};
  }

  _getInputValues() {
    this._inputList.forEach((input) => {
      this._inputValues[input.name] = input.value;
    })

    return this._inputValues;
  }

  _handleFormSubmit(event) {
    event.preventDefault();
    this._handleSubmit(this._getInputValues());
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', this._handleFormSubmit.bind(this));
  }

  close() {
    super.close();
    this._formElement.reset();
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButtonElement.textContent = 'Сохранение...';
    }
    else {
      this._submitButtonElement.textContent = this._submitButtonText;
    }
  }
}
