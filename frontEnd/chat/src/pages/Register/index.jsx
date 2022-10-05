import React from "react";
import { useState } from "react";
import { TextField, Button, Typography, FormControl } from "@mui/material";
import api from "../../services/api";
import "./index.scss";
import { useNavigate, Link } from "react-router-dom";
import Loader from "../../Components/Loader";

function Register() {
  const [name, setName] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorLogin, setErrorLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const isPasswordValid = () => {
    return password === confirmPassword && password.length > 5;
  };
  const handleSubmmit = (event) => {
    event.preventDefault();
    if (isPasswordValid) {
      setIsLoading(true);
      api
        .post("/user", { name, login, password })
        .then((response) => {
          navigate("/login", { state: { name, login, password } });
          setIsLoading(false);
        })
        .catch((e) => {
          console.log(e.response);
          setErrorLogin(true);
          setIsLoading(false);
        });
    } else {
      setErrorPassword(true);
    }
  };
  const handleOnchangeInput = (event) => {
    const input = event.target.name;
    const value = event.target.value;

    switch (input) {
      case "name":
        setName(value);
        break;
      case "login":
        setLogin(value);
        setErrorLogin(false);
        break;
      case "password":
        setPassword(value);
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        setErrorPassword(false);
        break;
      default:
        break;
    }
  };
  return (
    <>
      <div className="container__register">
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
              error={errorLogin}
              helperText={errorLogin ? "Login alredy exists" : ""}
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
              error={errorPassword}
              helperText={errorPassword ? "Passwords don't macht" : ""}
              label="Confirm Password"
              name="confirmPassword"
              required={true}
              value={confirmPassword}
              onChange={handleOnchangeInput}
            />
          </FormControl>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <Button type="submit" variant="contained" color="success">
                Done
              </Button>
              <Link to={"/login"}>
                <Button variant="outlined" color="error">
                  Cancel
                </Button>
              </Link>
            </>
          )}
        </form>
      </div>
    </>
  );
}

export default Register;
