import "./index.css";
import {
  enableValidation,
  settings,
  resetValidation,
  disableButton,
} from "../scripts/validation.js";
import Api from "../utils/Api.js";

// const initialCards = [
//   {
//     name: "Golden Gate Bridge",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
//   },
//   {
//     name: "Val Thorens",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
//   },
//   {
//     name: "Restaurant terrace",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
//   },
//   {
//     name: "An outdoor cafe",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
//   },
//   {
//     name: "A very long bridge, over the forest and through the trees",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
//   },
//   {
//     name: "Tunnel with morning light",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
//   },
//   {
//     name: "Mountain house",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
//   },
// ];

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "73edf03e-6007-4d66-a7ff-e75dbadd9f5a",
    "Content-Type": "application/json",
  },
});

// intialize cards variables
let selectedCard;
let selectedCardId;

// Destructure the secocnd in the call back of the .then()
api
  .getAppInfo()
  .then(([cards, user]) => {
    console.log(cards);
    cards.forEach(function (item) {
      const cardElement = getCardElement(item);
      cardsList.append(cardElement);
    });

    profileNameEl.textContent = user.name;
    profileDescriptionEl.textContent = user.about;
    profileAvatar.src = user.avatar;
  })
  .catch(console.error);

const profileAvatar = document.querySelector(".profile__avatar");
const editProfileBtn = document.querySelector(".profile__edit-btn");
const avatarModalBtn = document.querySelector(".profile__avatar-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const editProfileForm = editProfileModal.querySelector(".modal__form");
const editProfileNameInput = editProfileModal.querySelector(
  "#profile-name-input"
);
const editProfileDescriptionInput = editProfileModal.querySelector(
  "#profile-description-input"
);

const newPostBtn = document.querySelector(".profile__new-post-btn");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");
const newPostForm = newPostModal.querySelector(".modal__form");
const newPostSubmitBtn = newPostModal.querySelector(".modal__submit-btn");

// avatar form element
const avatarModal = document.querySelector("#avatar-modal");
const editAvatarModal = document.querySelector("#edit-avatar-modal");
const avatarForm = avatarModal.querySelector(".modal__form");

// delete form modal
const deleteCardsModal = document.querySelector("#delete-modal");
const deleteForm = deleteCardsModal.querySelector("#delete-modal");
const deleteCardBtn = deleteCardsModal.querySelector(".modal__submit-btn");
const cancelButton = deleteCardsModal.querySelector("#cancel-btn");
const deleteModalCloseBtn = deleteCardsModal.querySelector(".modal__close-btn");

const avatarModalEl = [...avatarModal.querySelectorAll(".modal__input")];
const avatarCloseBtn = avatarModal.querySelector(".modal__close-btn");
const avatarSubmitBtn = avatarModal.querySelector(".modal__submit-btn");
const avatarInput = document.querySelector("#profile-avatar-input");

const previewModal = document.querySelector("#preview-modal");
const previewModalCloseBtn = previewModal.querySelector(".modal__close-btn");
const previewImageEl = previewModal.querySelector(".modal__image");
const previewNameEl = document.querySelector("#modal-caption");

const newCaptionEl = document.querySelector("#card-caption");
const newPostImgEl = document.querySelector("#card-image-input");

const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");

const allModals = [
  editProfileModal,
  newPostModal,
  previewModal,
  deleteCardsModal,
];

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");

  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  cardTitleEl.textContent = data.name;

  const cardLikeBtnEl = cardElement.querySelector(".card__like-button");
  if (data.isLiked) {
    cardLikeBtnEl.classList.add("card__like-button_active");
  }
  cardLikeBtnEl.addEventListener("click", () => {
    const isLiked = cardLikeBtnEl.classList.contains(
      "card__like-button_active"
    );
    api
      .toggleLikeCard(data._id, isLiked)
      .then((res) => {
        cardLikeBtnEl.classList.toggle("card__like-button_active");
      })
      .catch(console.error);
  });

  const cardDeleteBtnEl = cardElement.querySelector(".card__delete-button");
  console.log(cardDeleteBtnEl);
  // cardDeleteBtnEl.addEventListener("click", () => {});

  cardDeleteBtnEl.addEventListener("click", (evt) => {
    console.log("data" + JSON.stringify(data));
    handleDeleteCard(cardElement, data);
  });

  cardImageEl.addEventListener("click", () => {
    previewImageEl.src = data.link;
    previewImageEl.alt = data.name;
    previewNameEl.textContent = data.name;
    openModal(previewModal);
  });

  return cardElement;
}

function openModal(modal) {
  modal.classList.add("modal_is-opened");
  document.addEventListener("keydown", handleEscapeClose);
  modal.addEventListener("click", handleOverlayClose);
}
function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  document.removeEventListener("keydown", handleEscapeClose);
  modal.removeEventListener("click", handleOverlayClose);
}

newPostBtn.addEventListener("click", function () {
  openModal(newPostModal);
});

avatarModalBtn.addEventListener("click", function () {
  openModal(avatarModal);
});

const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");

editProfileBtn.addEventListener("click", function () {
  editProfileNameInput.value = profileNameEl.textContent;
  editProfileDescriptionInput.value = profileDescriptionEl.textContent;
  resetValidation(editProfileForm, settings); // resets the form validation state
  openModal(editProfileModal);
});

editProfileCloseBtn.addEventListener("click", function () {
  closeModal(editProfileModal);
});

cancelButton.addEventListener("click", function () {
  closeModal(deleteCardsModal);
});

deleteModalCloseBtn.addEventListener("click", function () {
  closeModal(deleteCardsModal);
});

previewModalCloseBtn.addEventListener("click", function () {
  closeModal(previewModal);
});

newPostCloseBtn.addEventListener("click", function () {
  closeModal(newPostModal);
});

avatarCloseBtn.addEventListener("click", function () {
  closeModal(avatarModal);
});

function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  evt.submitter.textContent = "Saving...";
  api
    .editUserInfo({
      name: editProfileNameInput.value,
      about: editProfileDescriptionInput.value,
    })
    .then((data) => {
      // Todod use data argument instead of the input values
      profileNameEl.textContent = editProfileNameInput.value;
      profileDescriptionEl.textContent = editProfileDescriptionInput.value;
      closeModal(editProfileModal);
    })
    .catch(console.error)
    .finally(() => (evt.submitter.textContent = "Save"));
}

editProfileForm.addEventListener("submit", handleEditProfileSubmit);

function handleNewPostSubmit(evt) {
  evt.preventDefault();

  const inputValues = {
    name: newCaptionEl.value,
    link: newPostImgEl.value,
  };
  evt.submitter.textContent = "Saving...";

  api
    .createNewPost(inputValues)
    .then((res) => {
      const cardElement = getCardElement(res);
      cardsList.prepend(cardElement);
      closeModal(newPostModal);
      newPostForm.reset();
      disableButton(newPostSubmitBtn, settings);
    })
    .catch(console.error)
    .finally(() => (evt.submitter.textContent = "Save"));
}

function handleAvatarSubmit(evt) {
  evt.preventDefault();

  // Get the avatar URL from the input
  const avatarUrl = avatarInput.value.trim();

  // Call API to update avatar
  evt.submitter.textContent = "Saving...";
  api
    .editAvatarInfo({ avatar: avatarUrl })
    .then((response) => {
      // Update the avatar in the UI
      profileAvatar.src = response.avatar;
      avatarForm.reset();
      disableButton(evt.submitter, settings);
      // Close the modal
      closeModal(avatarModal);
    })
    .catch((error) => {
      console.error("Error updating avatar:", error);
    })
    .finally(() => (evt.submitter.textContent = "Save"));
}

function handleDeleteCard(cardElement, data) {
  selectedCard = cardElement; // Assign the card element to selectedCard
  selectedCardId = data._id; // Assign the card's ID to selectedCardId
  openModal(deleteCardsModal);
}

function handleDeleteSubmit(evt) {
  console.log("Id" + selectedCardId);
  evt.preventDefault();
  evt.submitter.textContent = "Deleting...";
  api
    .deleteCard(selectedCardId) // pass the ID the the api function
    .then(() => {
      // remove the card from the DOM
      // close the modal
      selectedCard.remove();
      closeModal(deleteCardsModal);
    })
    .catch(console.error)
    .finally(() => (evt.submitter.textContent = "Delete"));
}

// also select the avatar
// select the avatar modal btn top of the page

newPostForm.addEventListener("submit", handleNewPostSubmit);
deleteForm.addEventListener("submit", handleDeleteSubmit);
avatarForm.addEventListener("submit", handleAvatarSubmit);

// Close modal if Escape key is pressed
function handleEscapeClose(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_is-opened");
    if (openedModal) {
      closeModal(openedModal);
    }
  }
}

function handleOverlayClose(evt) {
  if (evt.target.classList.contains("modal")) {
    closeModal(evt.target);
  }
}

enableValidation(settings);
