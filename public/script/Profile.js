class Profile {
    constructor(profileInfo, api) {
      this.profileInfo = profileInfo;
      this.api = api;
    }
  
    renderProfile() {
      this.api.getProfileInfo()
        .then((profileInfo) => {
          const element = profileInfo;
          document.querySelector('.user-info__name').textContent = element.name;
          document.querySelector('.user-info__job').textContent = element.about;
        })
    }
  }