class Card {
    constructor () {
        this.listeners();
    }

    createCard(name, link) {
        let bgUrl = `url(${link})`;
        const card = document.createElement('div');
        const cardImage = document.createElement('div');
        const cardButton = document.createElement('button');
        const cardDescription = document.createElement('div');
        const cardName = document.createElement('h3');
        const cardLike = document.createElement('button');

        cardContainer.appendChild(card);
        card.classList.add('place-card');
        card.appendChild(cardImage);
        cardImage.classList.add('place-card__image');
        cardImage.style.backgroundImage = bgUrl;
        card.appendChild(cardDescription);
        cardDescription.classList.add('place-card__description');
        cardImage.appendChild(cardButton);
        cardButton.classList.add('place-card__delete-icon');
        cardDescription.appendChild(cardName);
        cardName.classList.add('place-card__name');
        cardName.textContent = name;
        cardDescription.appendChild(cardLike);
        cardLike.classList.add('place-card__like-icon');
        return card;
    }

    like(event) {
        if (event.target.classList.contains('place-card__like-icon')) {
            event.target.classList.toggle('place-card__like-icon_liked');
        }
    }

    removeCard(event) {
        if (event.target.classList.contains('place-card__delete-icon')) {
            event.target.closest('.places-list').removeChild(event.target.closest('.place-card'));
        }
    }

    listeners() {
        document.querySelector('.places-list').addEventListener('click', this.like);
        document.querySelector('.places-list').addEventListener('click', this.removeCard);
    }

    
}