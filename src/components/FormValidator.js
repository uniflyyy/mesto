export default class FormValidator {
  constructor(config, formElement) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveSubmitButtonClass = config.inactiveSubmitButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._hoverClass = config.hoverClass;
    this._formElement = formElement;
  }

  // Отображает ошибку у конкретного поля ввода
  _showInputError(inputElement, errorElement, errorMessage) {
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  // Скрывает ошибку у конкретного поля ввода
  _hideInputError(inputElement, errorElement) {
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._errorClass);
  }

  // Скрывает или отображает ошибку у поля ввода в зависимости от валидации
  _checkInputValidity(inputElement, errorElement) {
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement, errorElement);
    } else {
      this._showInputError(inputElement, errorElement, inputElement.validationMessage);
    }
  }

  // Устанавливает слушатели событий у всех полей ввода формы
  _setEventListeners() {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));

    this._inputList.forEach((inputElement) => {
      const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);

      this._makeButtonInactive();

      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement, errorElement);
        this._toggleButtonState();
      });
    });
  }

  // Проверяет, есть ли невалидное поле ввода в форме
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  // Делает кнопку активной
  _makeButtonActive() {
    this._submitButtonElement.classList.remove(this._inactiveSubmitButtonClass);
    this._submitButtonElement.classList.add(this._hoverClass);
    this._submitButtonElement.removeAttribute('disabled');
  }

  // Делает кнопку неактивной
  _makeButtonInactive() {
    this._submitButtonElement.classList.add(this._inactiveSubmitButtonClass);
    this._submitButtonElement.classList.remove(this._hoverClass);
    this._submitButtonElement.setAttribute('disabled', true);
  }

  // В зависимости от валидации делает кнопку отправки формы активной или неактивной
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._makeButtonInactive();
    } else {
      this._makeButtonActive();
    }
  }

  // Функция для сброса ошибок и кнопки отправки формы попапа
  resetPopup() {
    this._makeButtonInactive();
    this._inputList.forEach((inputElement) => {
      const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);

      this._hideInputError(inputElement, errorElement);
    });
  }

  // Включает валидацию форме
  enableValidation() {
    this._submitButtonElement = this._formElement.querySelector(this._submitButtonSelector);

    this._setEventListeners();
  }
}
