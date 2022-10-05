import React from "react";
import { useState } from "react";
import { TextField, Button, Typography, FormControl } from "@mui/material";
import api from "../../services/api";
import "./index.scss";

function Register() {
  const [name, setName] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmmit = () => {};

  const handleOnchangeInput = (event) => {
    const input = event.target.name;
    const value = event.target.value;

    switch (input) {
      case "name":
        setName(value);
        break;
      case "login":
        setLogin(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        break;
      default:
        break;
    }
  };
  return (
    <>
      <div className="container">
        <div className="container__image"></div>
        <form className="form" onSubmit={handleSubmmit}>
          <Typography fontSize={32} align="center">
            New User
          </Typography>
          <FormControl className="form">
            <TextField
              placeholder="name"
              type="text"
              label="Name"
              required={true}
              name="name"
              value={name}
              onChange={handleOnchangeInput}
            />
          </FormControl>
          <FormControl>
            <TextField
              placeholder="login"
              label="Login"
              type="text"
              required={true}
              name="login"
              value={login}
              onChange={handleOnchangeInput}
            />
          </FormControl>
          <FormControl>
            <TextField
              placeholder="password"
              label="Password"
              type="password"
              required={true}
              name="password"
              value={password}
              onChange={handleOnchangeInput}
            />
          </FormControl>
          <FormControl>
            <TextField
              placeholder="confirm password"
              type="password"
              label="Confirm Password"
              name="confirmPassword"
              required={true}
              value={confirmPassword}
              onChange={handleOnchangeInput}
            />
          </FormControl>
          <Button type="submit" variant="contained" color="success">
            Done
          </Button>
          <Button variant="outlined" color="error">
            Cancel
          </Button>
        </form>
      </div>
    </>
  );
}

export default Register;
