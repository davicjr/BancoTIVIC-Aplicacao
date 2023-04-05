// Importe de arquivos
import "dotenv/config";
import app from "./src/app.js";

// Definindo as opções de porta
const port = process.env.PORT || 3000;

// Iniciando servidor
app.listen(port, () => {
  console.log(`Servidor escutando em: http://localhost:${port}`);
});
