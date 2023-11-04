const express = require('express');
const db = require('./config/db');
const clienteController = require('./controllers/clienteController');

const app = express(); //Instância do Express
const PORT = 3000; //Porta para o servidor, por exemplo a 3000

app.use(express.json()); //Middleware para tratar os dados no formato JSON

app.get('/api/bloqueio/', clienteController.getAllClients); //Rota para obter todos os clientes
//app.post('/api/clientes', clienteController.createNewClient); //Rota para adicionar um novo cliente

app.listen(PORT, () => {
  console.log(`Servidor na porta ${PORT}`);
}); 
