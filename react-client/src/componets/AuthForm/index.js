import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const AuthForm = ({ nameRequired, onFormSubmit }) => {
  const [validated, setValidated] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    name === "name"
      ? setName(value)
      : name === "email"
      ? setEmail(value)
      : setPassword(value);
  };
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    console.log("form.checkValidity()", form.checkValidity());
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity()) {
      onFormSubmit({ name, email, password });
    }
    setValidated(true);
  };
  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      {nameRequired && (
        <Form.Group controlId="name">
          <Form.Label>User Name:</Form.Label>
          <Form.Control
            placeholder="Enter Name"
            required
            value={name}
            name="name"
            onChange={handleChange}
          />
        </Form.Group>
      )}
      <Form.Group controlId="email">
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          required
          value={email}
          name="email"
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="password">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          required
          minLength={5}
          value={password}
          name="password"
          onChange={handleChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default AuthForm;
