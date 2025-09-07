const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-btn",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const showInputError = (formElement, inputEl, errorMsg) => {
  const errorMsgID = inputEl.id + "-error";
  const errorMsgEl = formElement.querySelector("#" + errorMsgID);
  errorMsgEl.textContent = errorMsg;
  console.log(errorMsgID);
  inputEl.classList.add("modal__input_type_error");
};

const hideInputError = (formElement, inputEl) => {
  const errorMsgID = inputEl.id + "-error";
  const errorMsgEl = formElement.querySelector("#" + errorMsgID);
  errorMsgEl.textContent = "";
  inputEl.classList.remove("modal__input_type_error");
  console.log(errorMsgID);
};

const checkInputValidity = (formElement, inputEl) => {
  if (!inputEl.validity.valid) {
    showInputError(formElement, inputEl, inputEl.validationMessage);
  } else {
    hideInputError(formElement, inputEl);
  }
};

const hasInvaildInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonEl) => {
  if (hasInvaildInput(inputList)) {
    buttonEl.disabled = true;
    disableButton(buttonEl, config);
  } else {
    buttonEl.disabled = false;
    // remove the disabled class
  }
};

const disableButton = (buttonEl, config) => {
  // Add a modifier class to the buttonEl to make it grey
  // dont forget the CSS
};

setEventListeners = (formElement, config) => {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, config);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
};

enableValidation(settings);
