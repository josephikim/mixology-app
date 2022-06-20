import React from 'react';
import { Form, Button } from 'react-bootstrap';

import { useAppDispatch } from 'hooks';
import { useInput } from 'hooks/useInput';
import { register } from 'store/authSlice';
import { validateFields } from 'validation';
import { ApiError } from 'types';

import './RegistrationForm.css';

const RegistrationForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const { value: username, bind: bindUsername } = useInput('');
  const { value: password, bind: bindPassword } = useInput('');
  const { value: passwordConfirm, bind: bindPasswordConfirm } = useInput('');

  const handleSubmit = async (event: React.MouseEvent): Promise<void> => {
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
      const resultAction = await dispatch(register({ username, password }));

      if (resultAction.type === 'auth/register/rejected') {
        const error = resultAction.payload as ApiError;

        if (error.type) {
          alert(error.message);
        } else {
          // error is from global handler
          alert(`Error registering user: ${error.message}`);
        }
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

      <Button
        type="submit"
        name="registration-form-btn"
        variant="primary"
        onClick={(e): Promise<void> => handleSubmit(e)}
      >
        Register
      </Button>
      <div>
        Already registered? Please <a href="/login">login</a>.
      </div>
    </Form>
  );
};

export default RegistrationForm;
