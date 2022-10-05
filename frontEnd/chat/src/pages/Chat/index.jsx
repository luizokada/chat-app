import React, { useEffect } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
function Chat() {
  const navigate = useNavigate();
  useEffect(() => {
    api
      .get("/check")
      .then((response) => {})
      .catch((e) => {
        navigate("/login");
      });
  }, [navigate]);
  return (
    <>
      <p>TELA DE CHAT</p>
    </>
  );
}

export default Chat;
