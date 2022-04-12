import React from 'react';
import { Form, Button } from 'react-bootstrap';

import { useAppSelector, useAppDispatch } from '../../hooks';
import { register } from '../../store/authSlice';
import { useInput } from '../../hooks/useInput';
import { validateFields } from '../../validation';
import ContentWrapper from '../../layout/ContentWrapper';

const RegistrationForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const userStatus = useAppSelector((state) => state.auth.status);

  const { value: username, bind: bindUsername, reset: resetUsername } = useInput('');
  const { value: password, bind: bindPassword, reset: resetPassword } = useInput('');
  const { value: passwordConfirm, bind: bindPasswordConfirm, reset: resetPasswordConfirm } = useInput('');

  const handleSubmit = (evt: React.MouseEvent): void => {
    evt.preventDefault();
    const usernameError = validateFields.validateUsername(username);
    const passwordError = validateFields.validatePassword(password);
    const passwordConfirmError = validateFields.validatePasswordConfirm(passwordConfirm, password);
    const validationErrors: { type: string; msg: string }[] = [];

    if (usernameError) validationErrors.push({ type: 'username error', msg: usernameError });
    if (passwordError) validationErrors.push({ type: 'password error', msg: passwordError });
    if (passwordConfirmError) validationErrors.push({ type: 'password confirm error', msg: passwordConfirmError });

    if (validationErrors.length < 1) {
      // no input errors, submit the form
      if (userStatus === 'idle') {
        dispatch(register({ username, password }));
      }

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
    <ContentWrapper>
      <Form className="registration-form">
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

        <Button type="submit" name="register-form-btn" variant="primary" onClick={(evt) => handleSubmit(evt)}>
          Register
        </Button>
      </Form>

      <span>
        Already registered? Please <a href="/login">login</a>.
      </span>
    </ContentWrapper>
  );
};

export default RegistrationForm;
