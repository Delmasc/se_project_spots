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
    disableButton(buttonEl);
  } else {
    buttonEl.disabled = false;
    // remove the disabled class
  }
};

const disableButton = (buttonEl) => {
  // Add a modifier class to the buttonEl to make it grey
  // dont forget the CSS
};

setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".modal__input"));
  const buttonElement = formElement.querySelector(".modal__submit-btn");

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".modal__form"));
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
};

enableValidation();
