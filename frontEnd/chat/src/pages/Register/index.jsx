import React from "react";
import { useState } from "react";
import { FormControl } from "@mui/material";
import { Input } from "@mui/material";
import style from "./index.scss";

function Register() {
  const [name, setName] = useState();
  const [login, setLogin] = useState();
  const [password, setPassword] = useState();

  return (
    <>
      <FormControl className="form">
        <Input type="text"></Input>
      </FormControl>
    </>
  );
}

export default Register;
