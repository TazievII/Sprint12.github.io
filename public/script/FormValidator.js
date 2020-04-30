class FormValidator {
    constructor(firstname, about) {
        this.firstname = firstname;
        this.about = about;
    }
    checkInputValidity(firstname, about) {
        firstname = event.currentTarget.elements.firstname;
        about = event.currentTarget.elements.about;
        const error = {
            validationLenght: 'Должно быть от 2 до 30 символов',
            validationEmpty: 'Это обязательное поле'
        };
        const firstNameError = document.querySelector('#firstnamevalidation');
        const aboutError = document.querySelector('#aboutvalidation');
        if (firstname.value.length === 0) {
            firstNameError.textContent = error['validationEmpty'];
        } else if (firstname.value.length < 2 || firstname.value.length > 30) {
            firstNameError.textContent = error['validationLenght'];
        } else if (about.value.length === 0) {
            aboutError.textContent = error['validationEmpty'];
        } else if (about.value.length < 2 || about.value.length > 30) {
            aboutError.textContent = error['validationLenght'];
        }
        else return firstNameError.textContent = '', aboutError.textContent = '';
    }

    setSubmitButtonState(event) {
        let firstName;
        let about;
        const saveButtonEdit = document.querySelector('.popup__edit-profile-button');
        FormValidator.checkInputValidity;
        firstName = event.currentTarget.elements.firstname;
        about = event.currentTarget.elements.about;
        if (firstName.value.length < 2 || firstName.value.length > 30 || about.value.length < 2 || about.value.length > 30) {
            saveButtonEdit.setAttribute('disabled', true);
            saveButtonEdit.classList.add('popup__edit-profile-button_disabled');
        } else {
            saveButtonEdit.removeAttribute('disabled');
            saveButtonEdit.classList.remove('popup__edit-profile-button_disabled');
        }
    }


    setEventListeners() {
        this.element
            .addEventListener('input', this.checkInputValidity);
    }
}