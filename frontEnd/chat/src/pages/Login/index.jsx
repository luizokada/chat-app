import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { TextField, Button, Typography, FormControl } from "@mui/material";
import api from "../../services/api";
import "./styles.scss";
import { useNavigate, Link } from "react-router-dom";

function Login(props) {
  const location = useLocation();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (location.state) {
      const { login, password } = location.state;
      setLogin(login);
      setPassword(password);
    }
  }, [location]);

  const isValid = () => {
    return password.length > 5 && login !== "";
  };
  const handleSubmmit = (event) => {
    event.preventDefault();
    if (isValid()) {
      api
        .post("/login", { login, password })
        .then((response) => {
          api.defaults.headers.common["x-access-token"] =
            response.data.tokens.token;
          navigate("/");
        })
        .catch((e) => {
          setError(true);
          console.log(e.response);
        });
    } else {
      setError(true);
    }
  };

  const handleOnchangeInput = (event) => {
    const input = event.target.name;
    const value = event.target.value;
    setError(false);
    switch (input) {
      case "login":
        setLogin(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className="container">
        <Typography fontSize={32} align="center">
          Login
        </Typography>
        <form className="login__container" onSubmit={handleSubmmit}>
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
          {error ? (
            <>
              <Typography
                sx={{ textDecoration: "underline" }}
                fontSize={12}
                align="center"
                color={"red"}
              >
                Login or password is worng
              </Typography>
            </>
          ) : (
            <></>
          )}
          <div className="login__lontainer--button">
            <Button type="submit" variant="contained" color="success">
              Login
            </Button>
            <Link to={"/register"}>Don't have an account?</Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
