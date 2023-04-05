// Importe de arquivos
import mongoose from "mongoose";

// Definindo Schema
const contaSchema = new mongoose.Schema({
  id: { type: String },
  banco: { type: String, required: true },
  cc: { type: String, required: true },
  titular: { type: String, required: true },
  saldo: { type: Number, required: true },
});

// Definindo model
const contas = mongoose.model("contas", contaSchema);


// exportando objeto*
export default contas;

