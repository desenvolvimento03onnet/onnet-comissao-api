const { Pool } = require("pg");

// Configurações do banco de dados
const pool = new Pool({
  user: "cliente_r",
  host: "177.85.6.118",
  database: "mkData3.0",
  password: "Cl13nt_R",
  port: 5432, // Porta padrão do PostgreSQL
  timeout: 360000,
  schema: "public"
});

module.exports = pool;
