import validator from 'validator';

class ValidateFields {
  validateTitle(title): string | false {
    if (validator.isEmpty(title)) {
      return 'Title is required';
    }
    return false;
  }

  validateUsername(username): string | false {
    if (!validator.isAlphanumeric(username)) {
      return 'Username should only contain letters and numbers';
    }
    if (!validator.isLength(username, { min: 4 })) {
      return 'Username should be at least four characters';
    }
    return false;
  }

  validatePassword(password): string | false {
    if (!validator.isAlphanumeric(password)) {
      return 'Password should only contain letters and numbers';
    }
    if (!validator.isLength(password, { min: 4 })) {
      return 'Password should be at least four characters';
    }
    return false;
  }

  validatePasswordConfirm(confirm, password): string | false {
    if (confirm !== password) {
      return "Passwords don't match";
    }
    return false;
  }

  validateCalendarName(calendarName): string | false {
    if (!validator.matches(calendarName, /^[\w\-\s]*$/)) {
      return 'Calendar name should include letters, numbers and spaces only';
    }
    if (!validator.isLength(calendarName, { min: 4 })) {
      return 'Calendar name should be at least four characters';
    }
    return false;
  }
}

const validateFields = new ValidateFields();

export { validateFields };
