const express = require('express');
const db = require('./config/db');
const MKController = require('./controllers/MKController');

const app = express(); //Instância do Express
const PORT = 3000; //Porta para o servidor, por exemplo a 3000

app.use(express.json()); //Middleware para tratar os dados no formato JSON

app.get('/api/comissaoTotal/', MKController.getComissaoTotal);
app.get('/api/comissaoVenda/', MKController.getComissaoVenda);
app.get('/api/comissaoRenovacao/', MKController.getComissaoRenovacao);
app.get('/api/operators/', MKController.getAllOperators);
app.get('/api/cidades/', MKController.getAllCities); //Rota para obter todos os clientes
app.get('/api/3M/', MKController.getAllOperators3M);
app.get('/api/Varzea/', MKController.getAllOperatorsVarzea);
app.get('/api/Buritizeiro/', MKController.getAllOperatorsBuritizeiro);
app.get('/api/Pirapora/', MKController.getAllOperatorsPirapora);
app.get('/api/JP/', MKController.getAllOperatorsJP);
app.get('/api/Patos/', MKController.getAllOperatorsPatos);
app.get('/api/Varjao/', MKController.getAllOperatorsVarjao);
app.get('/api/SaoGoncalo/', MKController.getAllOperatorsSaoGoncalo);
app.get('/api/Presidente/', MKController.getAllOperatorsPresidente);
app.get('/api/Irai/', MKController.getAllOperatorsIrai);
app.get('/api/Abadia/', MKController.getAllOperatorsAbadia);
app.get('/api/Lagoa/', MKController.getAllOperatorsLagoa);
app.get('/api/Guima/', MKController.getAllOperatorsGuima);
app.get('/api/Cruzeiro/', MKController.getAllOperatorsCruzeiro);
app.get('/api/Patrocinio/', MKController.getAllOperatorsPatro);
app.get('/api/QntContratos/', MKController.getAllQntContratos);
app.get('/api/SMSNumero/', MKController.getClientWithCelNumer);
app.get('/api/QntContratosAtivos/', MKController.getQuantityContratsActives);
//app.post('/api/clientes', clienteController.createNewClient); //Rota para adicionar um novo cliente

app.listen(PORT, () => {
  console.log(`Servidor na porta ${PORT}`);
}); 
