import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useInput } from '../../hooks/useInput';

const LoginForm: React.FC = () => {
  const { value: username, bind: bindUsername, reset: resetUsername } = useInput('');
  const { value: password, bind: bindPassword, reset: resetPassword } = useInput('');

  const handleSubmit = (evt): void => {
    evt.preventDefault();
    //submit the form
    alert(`Logging in with username, password: ${username} ${password}`);

    // reset fields
    resetUsername();
    resetPassword();
  };

  return (
    <div className="login-form">
      <Form>
        <div className="text-primary">
          <h4>Returning User Login</h4>
        </div>

        <Form.Group controlId="username">
          <Form.Label className="text-primary">Username</Form.Label>
          <Form.Control name="username" placeholder="Enter username" {...bindUsername} />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label className="text-primary">Password</Form.Label>
          <Form.Control type="password" name="password" placeholder="Enter password" {...bindPassword} />
        </Form.Group>

        <Button type="submit" name="login-form-btn" variant="primary" onClick={handleSubmit}>
          Login
        </Button>
      </Form>
    </div>
  );
};

export default LoginForm;
