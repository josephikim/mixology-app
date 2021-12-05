import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useInput } from '../../hooks/useInput';
import { validateFields } from '../../validation';

const RegistrationForm: React.FC = () => {
  const { value: username, bind: bindUsername, reset: resetUsername } = useInput('');
  const { value: password, bind: bindPassword, reset: resetPassword } = useInput('');
  const { value: passwordConfirm, bind: bindPasswordConfirm, reset: resetPasswordConfirm } = useInput('');

  const handleSubmit = (evt): void => {
    evt.preventDefault();
    const usernameError = validateFields.validateUsername(username);
    const passwordError = validateFields.validatePassword(password);
    const passwordConfirmError = validateFields.validatePasswordConfirm(passwordConfirm, password);
    const validationErrors: { type: string; msg: string }[] = [];

    if (usernameError) validationErrors.push({ type: 'username error', msg: usernameError });
    if (passwordError) validationErrors.push({ type: 'password error', msg: passwordError });
    if (passwordConfirmError) validationErrors.push({ type: 'password confirm error', msg: passwordConfirmError });

    if (validationErrors.length === 0) {
      // no input errors, submit the form
      alert(`Submitting username, password, pwconfirm: ${username} ${password} ${passwordConfirm}`);

      // reset fields
      resetUsername();
      resetPassword();
      resetPasswordConfirm();
    } else {
      // alert user of input errors
      let errorMsg = '';

      for (const validationError of validationErrors) {
        errorMsg += `${validationError.type}: ${validationError.msg}\n`;
      }

      alert(errorMsg);
    }
  };

  return (
    <div className="registration-form">
      <Form>
        <div className="text-primary">
          <h4>New User Registration</h4>
        </div>

        <Form.Group controlId="username">
          <Form.Label className="text-primary">Username</Form.Label>
          <Form.Control name="username" placeholder="Enter username" {...bindUsername} />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label className="text-primary">Password</Form.Label>
          <Form.Control type="password" name="password" placeholder="Enter password" {...bindPassword} />
        </Form.Group>

        <Form.Group controlId="passwordConfirm">
          <Form.Label className="text-primary">Confirm Password</Form.Label>
          <Form.Control
            type="password"
            name="passwordConfirm"
            placeholder="Confirm password"
            {...bindPasswordConfirm}
          />
        </Form.Group>

        <Button type="submit" name="register-form-btn" variant="primary" onClick={handleSubmit}>
          Register
        </Button>
      </Form>

      <span>
        Already registered? Please <a href="/login">login</a>.
      </span>
    </div>
  );
};

export default RegistrationForm;
