import React from 'react';
import { Form, Button } from 'react-bootstrap';

const initialState = {
  username: {
    value: '',
    validateOnChange: false,
    error: ''
  },
  password: {
    value: '',
    validateOnChange: false,
    error: ''
  },
  passwordConfirm: {
    value: '',
    validateOnChange: false,
    error: ''
  }
};

const RegistrationForm: React.FC = () => {
  return (
    <div className="registration-form">
      <Form>
        <div className="text-primary">
          <h4>New User Registration</h4>
        </div>

        <Form.Group controlId="username">
          <Form.Label className="text-primary">Username</Form.Label>
          <Form.Control name="username" placeholder="Enter username" />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label className="text-primary">Password</Form.Label>
          <Form.Control type="password" name="password" placeholder="Enter password" />
        </Form.Group>

        <Form.Group controlId="passwordConfirm">
          <Form.Label className="text-primary">Confirm Password</Form.Label>
          <Form.Control type="password" name="passwordConfirm" placeholder="Confirm password" />
        </Form.Group>

        <Button type="submit" name="register-form-btn" variant="primary">
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
