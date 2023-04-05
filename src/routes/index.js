// Importe de arquivos
import express from "express";
import contas from "./contasRoutes.js";

// Definindo requisição inicial
const routes = (app) => {
  app.route("/").get((req, res) => {
    res.status(200).send({ titulo: "Banco TIVIC" });
  });
  app.use(express.json(), contas);
};
// exportando objeto*
export default routes;
