class UserInfo {
    constructor(firstname, about) {
        this.firstname = firstname;
        this.about = about;
    }

    setUserInfo() {
        this.firstname = formEdit.elements.firstname.value;
        this.about = formEdit.elements.about.value;
    }

    updateUserInfo() {
        document.querySelector('.user-info__name').textContent = this.firstname;
        document.querySelector('.user-info__job').textContent = this.about;
    }
    
}