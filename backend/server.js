const { app } = require("./src/app");

// puerto
const PORT = 8080;

// iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});