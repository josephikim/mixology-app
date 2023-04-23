import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { login } from 'store/authSlice';
import { useAppDispatch } from 'hooks';
import { useInput } from 'hooks/useInput';
import { validateFields } from 'validation';
import { ApiError } from 'types';

import './LoginForm.css';

const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const { value: username, bind: bindUsername } = useInput('');
  const { value: password, bind: bindPassword } = useInput('');

  const handleSubmit = async (event: React.MouseEvent): Promise<void> => {
    event.preventDefault();
    const usernameError = validateFields.validateUsername(username);
    const passwordError = validateFields.validatePassword(password);
    const validationErrors: { type: string; msg: string }[] = [];

    if (usernameError) validationErrors.push({ type: 'username error', msg: usernameError });
    if (passwordError) validationErrors.push({ type: 'password error', msg: passwordError });

    if (validationErrors.length === 0) {
      // no input errors, submit the form
      const resultAction = await dispatch(login({ username, password }));

      if (resultAction.type === 'auth/login/rejected') {
        const error = resultAction.payload as ApiError;

        alert(`Error logging in: ${error.message}`);
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
    <Form className="LoginForm">
      <div className="text-primary">
        <h4>User Login</h4>
      </div>

      <Form.Group controlId="username">
        <Form.Label className="text-primary">Username</Form.Label>
        <Form.Control name="username" placeholder="Enter username" {...bindUsername} />
      </Form.Group>

      <Form.Group controlId="password">
        <Form.Label className="text-primary">Password</Form.Label>
        <Form.Control type="password" name="password" placeholder="Enter password" {...bindPassword} />
      </Form.Group>

      <Button type="submit" name="login-form-btn" variant="primary" onClick={(e): Promise<void> => handleSubmit(e)}>
        Login
      </Button>

      <div>
        First time user? Please <Link to="/register">register</Link>.
      </div>
    </Form>
  );
};

export default LoginForm;
