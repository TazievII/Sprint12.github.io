/* Переменные */
const profile = document.querySelector('.profile');
const openClose = document.querySelector('.root');
const cardContainer = document.querySelector('.places-list');
const form = document.forms.new;
const formEdit = document.forms.edit;
const cardElement = new Card();
const config = {
  baseUrl: 'https://praktikum.tk/cohort9',
  headers: {
    authorization: '2ca8c5d8-d8f7-4c26-befb-2dabe82c5f13',
    'Content-Type': 'application/json'
  }};
const api = new Api(config, cardContainer);
const cardList = new CardList(cardContainer, api);
const profileInfo = new Profile(profile, api);
const popup = new Popup(document.querySelectorAll('.popup'));
const userInfo = new UserInfo(formEdit.elements.firstname.value, formEdit.elements.about.value);
const formValidator = new FormValidator(formEdit.elements.firstname.value, formEdit.elements.about.value);


api.getInitialCards();
api.getProfileInfo();
cardList.render();
profileInfo.renderProfile();




/* Валидация на добавление карточки */
function setSubmitButtonStateCard() {
  const name = event.currentTarget.elements.name;
  const link = event.currentTarget.elements.link;
  const saveButton = document.querySelector('.popup__button');

  if (name.value.length === 0 || link.value.length === 0) {
    saveButton.setAttribute('disabled', true);
    saveButton.classList.add('popup__button_disabled');
  } else {
    saveButton.removeAttribute('disabled');
    saveButton.classList.remove('popup__button_disabled');
  }
}




/* Слушатели событий */
openClose.addEventListener('click', (event) => {
  popup.open(event);
  popup.close(event);
});
form.addEventListener('submit', () => {
  event.preventDefault();
  let name = document.querySelector('.popup__input_type_name').value;
  let link = document.querySelector('.popup__input_type_link-url').value;
  const saveButton = document.querySelector('.popup__button');
  api.addCardToServer();
  cardList.addCard(name, link);
  form.reset();
  let close = document.querySelector('#popup2');
  close.classList.remove('popup_is-opened');
  saveButton.setAttribute('disabled', true);
  saveButton.classList.add('popup__button_disabled');
});
form.addEventListener('input', setSubmitButtonStateCard);
formEdit.addEventListener('submit', (event) => {
  event.preventDefault();
  api.updateProfile();
  userInfo.setUserInfo();
  userInfo.updateUserInfo();
  event.target.closest('.popup').classList.remove('popup_is-opened');
formEdit.addEventListener('input', () => {
  formValidator.checkInputValidity(event);
  formValidator.setSubmitButtonState(event);
});
});