import validator from 'validator';

class ValidateFields {
  validateTitle(title: string): string | false {
    if (validator.isEmpty(title)) {
      return 'Title is required';
    }
    return false;
  }

  validateUsername(username: string): string | false {
    if (!validator.isAlphanumeric(username)) {
      return 'Username should only contain letters and numbers';
    }
    if (!validator.isLength(username, { min: 4 })) {
      return 'Username should be at least four characters';
    }
    return false;
  }

  validatePassword(password: string): string | false {
    if (!validator.isAlphanumeric(password)) {
      return 'Password should only contain letters and numbers';
    }
    if (!validator.isLength(password, { min: 4 })) {
      return 'Password should be at least four characters';
    }
    return false;
  }

  validatePasswordConfirm(confirm: string, password: string): string | false {
    if (confirm !== password) {
      return "Passwords don't match";
    }
    return false;
  }
}

const validateFields = new ValidateFields();

export { validateFields };
