(()=>{"use strict";var e=document.querySelector(".profile__avatar-edit-button"),t=document.querySelector(".profile__edit-button"),n=document.querySelector(".profile__add-button"),r=document.querySelector(".popup_type_avatar"),o=document.querySelector(".popup_type_profile"),i=o.querySelector(".popup__form"),u=o.querySelector(".popup__input_type_name"),a=o.querySelector(".popup__input_type_work"),c=document.querySelector(".popup_type_card").querySelector(".popup__form"),s={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__submit",inactiveSubmitButtonClass:"popup__submit_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__input-error_active",hoverClass:"link"},l={templateSelector:"#card-template",cardSelector:".cards__card",imageSelector:".cards__img",basketButtonSelector:".cards__basket",titleSelector:".cards__title",likeButtonSelector:".cards__like-icon",likeCounterSelector:".cards__like-counter",activeLikeButtonClass:"cards__like-icon_active"};function f(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var p=function(){function e(t,n,r,o,i,u,a){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._title=n.name,this._image=n.link,this._likes=n.likes,this._cardId=n._id,this._cardOwnerId=n.owner._id,this._userId=r,this._templateSelector=t.templateSelector,this._cardSelector=t.cardSelector,this._imageSelector=t.imageSelector,this._basketButtonSelector=t.basketButtonSelector,this._titleSelector=t.titleSelector,this._likeButtonSelector=t.likeButtonSelector,this._likeCounterSelector=t.likeCounterSelector,this._activeLikeButtonClass=t.activeLikeButtonClass,this._openImagePopup=o,this._handleDeleteCard=i,this._handleSetLike=u,this._handleRemoveLike=a}var t,n;return t=e,(n=[{key:"_getTemplate",value:function(){return this._cardElement=document.querySelector(this._templateSelector).content.querySelector(this._cardSelector).cloneNode(!0),this._cardElement}},{key:"_deleteNotUserBasket",value:function(){this._userId!==this._cardOwnerId&&this._basketButtonElement.remove()}},{key:"_checkLikeStatus",value:function(){var e=this;this._likes.forEach((function(t){e._userId===t._id&&e._likeButtonElement.classList.add(e._activeLikeButtonClass)}))}},{key:"updateLikes",value:function(e){this._likes=e.likes,this._likeCounterElement.textContent=e.likes.length,this._likeButtonElement.classList.toggle(this._activeLikeButtonClass)}},{key:"deleteCard",value:function(){this._view.remove(),this._view=null}},{key:"_handleLikeClick",value:function(){this._likeButtonElement.classList.contains(this._activeLikeButtonClass)?this._handleRemoveLike(this._cardId):this._handleSetLike(this._cardId)}},{key:"_handleBasketClick",value:function(){this._handleDeleteCard(this._cardId)}},{key:"_handleImageClick",value:function(){this._openImagePopup(this._title,this._image)}},{key:"_setEventListeners",value:function(){this._likeButtonElement.addEventListener("click",this._handleLikeClick.bind(this)),this._basketButtonElement.addEventListener("click",this._handleBasketClick.bind(this)),this._imageElement.addEventListener("click",this._handleImageClick.bind(this))}},{key:"generateCard",value:function(){return this._view=this._getTemplate(),this._titleElement=this._view.querySelector(this._titleSelector),this._imageElement=this._view.querySelector(this._imageSelector),this._likeButtonElement=this._view.querySelector(this._likeButtonSelector),this._basketButtonElement=this._view.querySelector(this._basketButtonSelector),this._likeCounterElement=this._view.querySelector(this._likeCounterSelector),this._titleElement.textContent=this._title,this._imageElement.setAttribute("src",this._image),this._imageElement.setAttribute("alt",this._title),this._likeCounterElement.textContent=this._likes.length,this._deleteNotUserBasket(),this._checkLikeStatus(),this._setEventListeners(),this._view}}])&&f(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function h(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var _=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._inputSelector=t.inputSelector,this._submitButtonSelector=t.submitButtonSelector,this._inactiveSubmitButtonClass=t.inactiveSubmitButtonClass,this._inputErrorClass=t.inputErrorClass,this._errorClass=t.errorClass,this._hoverClass=t.hoverClass,this._formElement=n}var t,n;return t=e,(n=[{key:"_showInputError",value:function(e,t,n){e.classList.add(this._inputErrorClass),t.textContent=n,t.classList.add(this._errorClass)}},{key:"_hideInputError",value:function(e,t){e.classList.remove(this._inputErrorClass),t.textContent="",t.classList.remove(this._errorClass)}},{key:"_checkInputValidity",value:function(e,t){e.validity.valid?this._hideInputError(e,t):this._showInputError(e,t,e.validationMessage)}},{key:"_setEventListeners",value:function(){var e=this;this._inputList=Array.from(this._formElement.querySelectorAll(this._inputSelector)),this._inputList.forEach((function(t){var n=e._formElement.querySelector(".".concat(t.id,"-error"));e._makeButtonInactive(),t.addEventListener("input",(function(){e._checkInputValidity(t,n),e._toggleButtonState()}))}))}},{key:"_hasInvalidInput",value:function(){return this._inputList.some((function(e){return!e.validity.valid}))}},{key:"_makeButtonActive",value:function(){this._submitButtonElement.classList.remove(this._inactiveSubmitButtonClass),this._submitButtonElement.classList.add(this._hoverClass),this._submitButtonElement.removeAttribute("disabled")}},{key:"_makeButtonInactive",value:function(){this._submitButtonElement.classList.add(this._inactiveSubmitButtonClass),this._submitButtonElement.classList.remove(this._hoverClass),this._submitButtonElement.setAttribute("disabled",!0)}},{key:"_toggleButtonState",value:function(){this._hasInvalidInput()?this._makeButtonInactive():this._makeButtonActive()}},{key:"resetPopup",value:function(){var e=this;this._makeButtonInactive(),this._inputList.forEach((function(t){var n=e._formElement.querySelector(".".concat(t.id,"-error"));e._hideInputError(t,n)}))}},{key:"enableValidation",value:function(){this._submitButtonElement=this._formElement.querySelector(this._submitButtonSelector),this._setEventListeners()}}])&&h(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function d(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var y=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._renderer=t,this._containerElement=document.querySelector(n)}var t,n;return t=e,(n=[{key:"renderItems",value:function(e){var t=this;e.forEach((function(e){t._renderer(e)}))}},{key:"addItemToTheEnd",value:function(e){this._containerElement.prepend(e)}},{key:"addItemToTheBeginning",value:function(e){this._containerElement.append(e)}}])&&d(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function m(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var v=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._popupElement=document.querySelector(t),this._handleEscClose=this._handleEscClose.bind(this)}var t,n;return t=e,(n=[{key:"_handleEscClose",value:function(e){"Escape"===e.key&&this.close()}},{key:"open",value:function(){this._popupElement.classList.add("popup_opened"),document.addEventListener("keydown",this._handleEscClose)}},{key:"close",value:function(){this._popupElement.classList.remove("popup_opened"),document.removeEventListener("keydown",this._handleEscClose)}},{key:"_handlePopupMouseDown",value:function(e){(e.target===e.currentTarget||e.target.classList.contains("popup__close"))&&this.close()}},{key:"setEventListeners",value:function(){this._popupElement.addEventListener("mousedown",this._handlePopupMouseDown.bind(this))}}])&&m(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function b(e){return b="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},b(e)}function k(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function E(){return E="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var r=S(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},E.apply(this,arguments)}function S(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=C(e)););return e}function g(e,t){return g=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},g(e,t)}function w(e,t){if(t&&("object"===b(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function C(e){return C=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},C(e)}var L=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&g(e,t)}(u,e);var t,n,r,o,i=(r=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=C(r);if(o){var n=C(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return w(this,e)});function u(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,u),(t=i.call(this,e))._formElement=t._popupElement.querySelector(".popup__form"),t._submitButtonElement=t._formElement.querySelector(".popup__submit"),t._submitButtonText=t._submitButtonElement.textContent,t}return t=u,(n=[{key:"setHandleSubmit",value:function(e){this._handleSubmit=e}},{key:"_handleFormSubmit",value:function(e){e.preventDefault(),this._handleSubmit()}},{key:"setEventListeners",value:function(){E(C(u.prototype),"setEventListeners",this).call(this),this._formElement.addEventListener("submit",this._handleFormSubmit.bind(this))}},{key:"renderLoading",value:function(e){this._submitButtonElement.textContent=e?"Удаление...":this._submitButtonText}}])&&k(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),u}(v);function O(e){return O="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},O(e)}function B(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function P(){return P="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var r=j(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},P.apply(this,arguments)}function j(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=R(e)););return e}function I(e,t){return I=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},I(e,t)}function T(e,t){if(t&&("object"===O(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function R(e){return R=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},R(e)}var q=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&I(e,t)}(u,e);var t,n,r,o,i=(r=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=R(r);if(o){var n=R(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return T(this,e)});function u(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,u),(t=i.call(this,e))._titleElement=t._popupElement.querySelector(".popup__title-img"),t._imageElement=t._popupElement.querySelector(".popup__img"),t}return t=u,(n=[{key:"open",value:function(e,t){this._titleElement.textContent=e,this._imageElement.setAttribute("src",t),this._imageElement.setAttribute("alt",e),P(R(u.prototype),"open",this).call(this)}}])&&B(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),u}(v);function x(e){return x="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},x(e)}function A(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function D(){return D="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var r=U(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},D.apply(this,arguments)}function U(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=F(e)););return e}function V(e,t){return V=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},V(e,t)}function N(e,t){if(t&&("object"===x(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function F(e){return F=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},F(e)}var H=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&V(e,t)}(u,e);var t,n,r,o,i=(r=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=F(r);if(o){var n=F(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return N(this,e)});function u(e,t){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,u),(n=i.call(this,e))._handleSubmit=t,n._formElement=n._popupElement.querySelector(".popup__form"),n._inputList=Array.from(n._formElement.querySelectorAll(".popup__input")),n._submitButtonElement=n._formElement.querySelector(".popup__submit"),n._submitButtonText=n._submitButtonElement.textContent,n._inputValues={},n}return t=u,(n=[{key:"_getInputValues",value:function(){var e=this;return this._inputList.forEach((function(t){e._inputValues[t.name]=t.value})),this._inputValues}},{key:"_handleFormSubmit",value:function(e){e.preventDefault(),this._handleSubmit(this._getInputValues())}},{key:"setEventListeners",value:function(){D(F(u.prototype),"setEventListeners",this).call(this),this._formElement.addEventListener("submit",this._handleFormSubmit.bind(this))}},{key:"close",value:function(){D(F(u.prototype),"close",this).call(this),this._formElement.reset()}},{key:"renderLoading",value:function(e){this._submitButtonElement.textContent=e?"Сохранение...":this._submitButtonText}}])&&A(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),u}(v);function M(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var J=function(){function e(t){var n=t.nameSelector,r=t.workSelector,o=t.avatarSelector;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._nameElement=document.querySelector(n),this._workElement=document.querySelector(r),this._avatarElement=document.querySelector(o)}var t,n;return t=e,(n=[{key:"getUserInfo",value:function(){return{name:this._nameElement.textContent,about:this._workElement.textContent,avatar:this._avatarElement.src}}},{key:"setUserInfo",value:function(e){this._nameElement.textContent=e.name,this._workElement.textContent=e.about,this._avatarElement.src=e.avatar}}])&&M(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function G(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var z,$=function(){function e(t){var n=t.url,r=t.headers;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._url=n,this._headers=r}var t,n;return t=e,(n=[{key:"_checkResponse",value:function(e){return e.ok?e.json():Promise.reject("Ошибка 1: ".concat(e.status))}},{key:"getUserInfo",value:function(){var e=this;return fetch("".concat(this._url,"/users/me"),{method:"GET",headers:this._headers}).then((function(t){return e._checkResponse(t)}))}},{key:"getInitialCards",value:function(){var e=this;return fetch("".concat(this._url,"/cards"),{method:"GET",headers:this._headers}).then((function(t){return e._checkResponse(t)}))}},{key:"saveUserInfo",value:function(e){var t=this;return fetch("".concat(this._url,"/users/me"),{method:"PATCH",headers:this._headers,body:JSON.stringify({name:"".concat(e.name),about:"".concat(e.about)})}).then((function(e){return t._checkResponse(e)}))}},{key:"saveAvatar",value:function(e){var t=this;return fetch("".concat(this._url,"/users/me/avatar"),{method:"PATCH",headers:this._headers,body:JSON.stringify({avatar:"".concat(e.avatar)})}).then((function(e){return t._checkResponse(e)}))}},{key:"addNewCard",value:function(e){var t=this;return fetch("".concat(this._url,"/cards"),{method:"POST",headers:this._headers,body:JSON.stringify({name:"".concat(e.title),link:"".concat(e.link)})}).then((function(e){return t._checkResponse(e)}))}},{key:"deleteCard",value:function(e){var t=this;return fetch("".concat(this._url,"/cards/").concat(e),{method:"DELETE",headers:this._headers}).then((function(e){return t._checkResponse(e)}))}},{key:"setLike",value:function(e){var t=this;return fetch("".concat(this._url,"/cards/").concat(e,"/likes"),{method:"PUT",headers:this._headers}).then((function(e){return t._checkResponse(e)}))}},{key:"removeLike",value:function(e){var t=this;return fetch("".concat(this._url,"/cards/").concat(e,"/likes"),{method:"DELETE",headers:this._headers}).then((function(e){return t._checkResponse(e)}))}}])&&G(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function K(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var Q=new _(s,r),W=new _(s,i),X=new _(s,c),Y=new $({url:"https://mesto.nomoreparties.co/v1/cohort-52",headers:{authorization:"cf560b3a-e8cb-4e2c-b5b7-7256e7398135","Content-Type":"application/json"}}),Z=new J({nameSelector:".profile__name",workSelector:".profile__work",avatarSelector:".profile__avatar"}),ee=new y((function(e){ee.addItemToTheBeginning(ue(e))}),".cards"),te=new L(".popup_type_card-delete"),ne=new q(".popup_type_image"),re=new H(".popup_type_card",(function(e){re.renderLoading(!0),Y.addNewCard(e).then((function(e){ee.addItemToTheEnd(ue(e)),re.close(),X.resetPopup()})).catch((function(e){console.log("Ошибка: ".concat(e))})).finally((function(){re.renderLoading(!1)}))})),oe=new H(".popup_type_avatar",(function(e){oe.renderLoading(!0),Y.saveAvatar(e).then((function(e){Z.setUserInfo(e),oe.close(),Q.resetPopup()})).catch((function(e){console.log("Ошибка: ".concat(e))})).finally((function(){oe.renderLoading(!1)}))})),ie=new H(".popup_type_profile",(function(e){ie.renderLoading(!0),Y.saveUserInfo(e).then((function(e){Z.setUserInfo(e),ie.close(),W.resetPopup()})).catch((function(e){console.log("Ошибка: ".concat(e))})).finally((function(){ie.renderLoading(!1)}))})),ue=function(e){var t=new p(l,e,z,ne.open.bind(ne),(function(e){te.open(),te.setHandleSubmit((function(){te.renderLoading(!0),Y.deleteCard(e).then((function(){t.deleteCard(),te.close()})).catch((function(e){console.log("Ошибка: ".concat(e))})).finally((function(){te.renderLoading(!1)}))}))}),(function(e){Y.setLike(e).then((function(e){t.updateLikes(e)})).catch((function(e){console.log("Ошибка: ".concat(e.status))}))}),(function(e){Y.removeLike(e).then((function(e){t.updateLikes(e)})).catch((function(e){console.log("Ошибка: ".concat(e.status))}))}));return t.generateCard()};Promise.all([Y.getUserInfo(),Y.getInitialCards()]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,i=[],u=!0,a=!1;try{for(n=n.call(e);!(u=(r=n.next()).done)&&(i.push(r.value),!t||i.length!==t);u=!0);}catch(e){a=!0,o=e}finally{try{u||null==n.return||n.return()}finally{if(a)throw o}}return i}}(t,n)||function(e,t){if(e){if("string"==typeof e)return K(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?K(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],i=r[1];Z.setUserInfo(o),z=o._id,ee.renderItems(i)})).catch((function(e){console.log("Ошибка: ".concat(e))})),te.setEventListeners(),ne.setEventListeners(),oe.setEventListeners(),ie.setEventListeners(),re.setEventListeners(),e.addEventListener("click",(function(){Q.resetPopup(),oe.open()})),t.addEventListener("click",(function(){var e=Z.getUserInfo(),t=e.name,n=e.about;W.resetPopup(),u.value=t,a.value=n,ie.open()})),n.addEventListener("click",(function(){X.resetPopup(),re.open()})),Q.enableValidation(),W.enableValidation(),X.enableValidation()})();