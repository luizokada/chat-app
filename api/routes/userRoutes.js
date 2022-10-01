const express = require("express");
const {} = require("../controllers/userCtrl");

const userRoute = express.Router();

/*useerRoute
  .get("/produtos", produtoController.listarProdutos)
  .get("/produtos/busca", produtoController.listarProdutoPorNome)
  .post("/produtos", produtoController.cadastrarProduto)
  .put("/produtos/:id", produtoController.atualizarProduto)
  .delete("/produtos/:id", produtoController.excluirProduto);*/

module.exports = userRoute;
