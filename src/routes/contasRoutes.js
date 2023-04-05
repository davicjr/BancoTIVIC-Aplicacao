// Importe de arquivos
import express from "express";
import ContaController from "../controllers/contasController.js";

// Definindo métodos express
const router = express.Router();

// Realizar uma busca (GET)
router.get("/contas", ContaController.listarContas);

// Realizar uma busca por conta do cliente(GET)
router.get("/contas/buscac", ContaController.listarContaPorCC);

// Realizar uma busca por nome(GET)
router.get("/contas/buscan", ContaController.listarContaPorNome);

// Realizar uma busca por ID (GET)
router.get("/contas/:id", ContaController.listarContasPorId);

// Criar uma nova conta (POST)
router.post("/contas", ContaController.cadastrarContas);

// Atualizar um campo de uma conta (PUT)
router.put("/contas/:id", ContaController.atualizarContas);

// Excluir uma conta (DELETE)
router.delete("/contas/:id", ContaController.excluirContas);

// exportando objeto*
export default router;
