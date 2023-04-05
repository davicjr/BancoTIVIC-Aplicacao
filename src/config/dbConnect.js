// Importe de arquivos
import mongoose from "mongoose";

// Fazendo a conexão com o atlas do MongoBD utilizando uma variável de ambiente
mongoose.connect(process.env.STRING_CONEXAO_DB);

let db = mongoose.connection;

// exportando objeto*
export default db;
