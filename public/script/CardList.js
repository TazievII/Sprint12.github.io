class CardList {
  constructor(cardContainer, api) {
    this.container = cardContainer;
    this.api = api;
  }
    render() {
      this.api.getInitialCards()
        .then((cardList) => {
          for (const element of cardList) {
            this.container.insertAdjacentHTML('beforeend', this.getTemplate(element));
        }});
    }

    getTemplate(element) {
      const template = 
      `<div class="place-card">
        <div class="place-card__image" style="background: url(${element.link})">
          <button class="place-card__delete-icon"></button>
        </div>
        <div class="place-card__description">
          <h3 class="place-card__name">${element.name}</h3>
          <div class="place-card__button-counter">
          <button class="place-card__like-icon"></button>
          <p class="place-card__like-counter">${element.likes.length}</p>
          </div>
        </div>
        </div>`;
      return template;
    }
}