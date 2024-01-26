const express = require('express');
const db = require('./config/db');
const cors = require('cors');
const MKController = require('./controllers/MKController');

const app = express(); //Instância do Express
const PORT = 3000; //Porta para o servidor, por exemplo a 3000

app.use(express.json()); //Middleware para tratar os dados no formato JSON

app.use(cors());

app.get('/api/comissaoTotal/', MKController.getComissaoTotal);
app.get('/api/QntContratos/', MKController.getAllQntContratos);
app.get('/api/SMSNumero/', MKController.getClientWithCelNumer);
app.get('/api/QntContratosAtivos/', MKController.getQuantityContratsActives);
app.get('/api/ClientesPorCaixa/', MKController.getAllClientsFromNAP);
app.get('/api/Cidades/', MKController.getAllCities);
app.get('/api/CidadesOperadores/', MKController.getAllCitiesOperators);
app.get('/api/Setores/', MKController.getAllSectors);
//app.post('/api/clientes', clienteController.createNewClient); //Rota para adicionar um novo cliente

app.listen(PORT, () => {
  console.log(`Servidor na porta ${PORT}`);
}); 
