module.exports = {
  verifMail(mail) {
    // eslint-ignore-next-line
    var regex = /^.+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;
    if (!regex.test(mail)) {
      return false;
    } else {
      return true;
    }
  },
  verifDate(date) {
    var regex = /^[0-9]{4}\-[0-9]{2}\-[0-9]{2}T[0-9]{2}\:[0-9]{2}$/;
    if (!regex.test(date)) {
      return false;
    } else {
      return true;
    }
  },
  verifImage(image) {
    var gif = /\.gif$/;
    var png = /\.png$/;
    if (!gif.test(image) && !png.test(image)) {
      console.log('test');
      return false;
    } else {
      return true;
    }
  },
  verifMoment(moment) {
    var regex = /^[LMJVSD]T[0-9]{2}\:[0-9]{2}$/;
    if (!regex.test(moment)) {
      return false;
    } else {
      return true;
    }
  },

  size16(string) {
    if (string.length > 16) {
      return false;
    } else {
      return true;
    }
  },

  verifPhone(number) {
    var regex = /^\+?[0-9]{10,11}$/;
    if (!regex.test(number)) {
      return false;
    } else {
      return true;
    }
  },

  verifGender(gender) {
    if (gender != 'M' && gender != 'F') {
      return false;
    } else {
      return true;
    }
  },

  verifPassword(password) {
    if (password.length < 16 && password.length >= 8) {
      return false;
    } else {
      return true;
    }
  }
};
