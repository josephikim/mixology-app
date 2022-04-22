import React from 'react';
import { Form, Button } from 'react-bootstrap';

import { useAppSelector, useAppDispatch } from '../../hooks';
import { register } from '../../store/authSlice';
import { useInput } from '../../hooks/useInput';
import { validateFields } from '../../validation';

import './RegistrationForm.css';

const RegistrationForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector((state) => state.auth.status);

  const { value: username, bind: bindUsername } = useInput('');
  const { value: password, bind: bindPassword } = useInput('');
  const { value: passwordConfirm, bind: bindPasswordConfirm } = useInput('');

  const handleSubmit = (event: React.MouseEvent): void => {
    event.preventDefault();
    const usernameError = validateFields.validateUsername(username);
    const passwordError = validateFields.validatePassword(password);
    const passwordConfirmError = validateFields.validatePasswordConfirm(passwordConfirm, password);
    const validationErrors: { type: string; msg: string }[] = [];

    if (usernameError) validationErrors.push({ type: 'username error', msg: usernameError });
    if (passwordError) validationErrors.push({ type: 'password error', msg: passwordError });
    if (passwordConfirmError) validationErrors.push({ type: 'password confirm error', msg: passwordConfirmError });

    if (validationErrors.length < 1) {
      // no input errors, submit the form
      if (authStatus === 'idle') {
        dispatch(register({ username, password }));
      }
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
    <Form className="RegistrationForm">
      <div className="text-primary">
        <h4>User Registration</h4>
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
        <Form.Control type="password" name="passwordConfirm" placeholder="Confirm password" {...bindPasswordConfirm} />
      </Form.Group>

      <Button type="submit" name="registration-form-btn" variant="primary" onClick={(e): void => handleSubmit(e)}>
        Register
      </Button>
      <div>
        Already registered? Please <a href="/login">login</a>.
      </div>
    </Form>
  );
};

export default RegistrationForm;
