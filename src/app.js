// Import de arquivos
import express from "express";
import db from "./config/dbConnect.js";
import routes from "./routes/index.js";
import manipuladorDeErros from "./middlewares/manipuladorDeErros.js";
import cors from 'cors';

// Iniciando o banco de dados
db.on("error", console.log.bind(console, "Erro de conexao"));
db.once("open", () => {
  console.log("Conexão com o banco feita com sucesso");
});

// Criando a instancia express e definindo extensão JSON
const app = express();
app.use(express.json());

// Habilitando o cors
app.use(cors());

// Chamando a middleware em caso de erros
app.use(manipuladorDeErros);

// Direcionando as Rotas
routes(app);


// exportando objeto*
export default app;
