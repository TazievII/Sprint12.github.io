class Popup {
    open(event) {
        if (event.target.classList.contains('user-info__editbutton')) {
            let edit = document.querySelector('#popup1');
            edit.classList.add('popup_is-opened');
            let firstname = formEdit.elements.firstname;
            let about = formEdit.elements.about;
            firstname.value = document.querySelector('.user-info__name').textContent;
            about.value = document.querySelector('.user-info__job').textContent;
        } else if (event.target.classList.contains('user-info__button')) {
            let newCard = document.querySelector('#popup2');
            newCard.classList.add('popup_is-opened');
        } else if (event.target.classList.contains('place-card__image')) {
            let imageCard = document.querySelector('#popup3');
            imageCard.classList.add('popup_is-opened');
            let url = event.target.style.backgroundImage;
            let popupImage = document.querySelector('.popup__image');
            url = url.substring(5, url.length - 2);
            popupImage.src = url;
        }

    }

    close(event) {
        if (event.target.classList.contains('popup__close')) {
            event.target.closest('.popup').classList.remove('popup_is-opened');
    }
}
}