export default class FormValidator {
    constructor (params, formSelector) {
      this._formSelector = formSelector;
      this._formElement = document.querySelector(formSelector);
      this._inputSelector = params.inputSelector;
      this._submitButtonSelector = params.submitButtonSelector;
      this._inactiveButtonClass = params.inactiveButtonClass;
      this._errorClass = params.errorClass;
    }
    _showInputError(inputElement, errorMessage) {
      const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
      errorElement.textContent = errorMessage;
      errorElement.classList.add(this._errorClass);
    }
    _hideInputError(inputElement){
      const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
      errorElement.classList.remove(this._errorClass);
      errorElement.textContent = "";
    }
    _hasInvalidInput(inputList){
      return inputList.some(inputElement => {
        return !inputElement.validity.valid;
      })
    }
    _toggleButtonState(inputList, buttonElement){
      if(this._hasInvalidInput(inputList)) {
        buttonElement.setAttribute("disabled", true);
        buttonElement.classList.add(this._inactiveButtonClass);
      } else {
        buttonElement.removeAttribute("disabled", true);
        buttonElement.classList.remove(this._inactiveButtonClass);
      }
    }
    _checkInputValidity(inputElement){
      if(!inputElement.validity.valid) {
        this._showInputError(inputElement, inputElement.validationMessage);
      } else {
        this._hideInputError(inputElement);
      }
    }
    _setEventListeners(){
      const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
      const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
      this._toggleButtonState(inputList, buttonElement);
      inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
          this._checkInputValidity(inputElement);
          this._toggleButtonState(inputList, buttonElement);
        })
      })
    }
    enableValidation(){
      this._formElement.addEventListener('submit', evt => {
        evt.preventDefault();
      });
      this._setEventListeners();
    }
  }