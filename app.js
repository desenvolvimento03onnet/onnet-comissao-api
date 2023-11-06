const express = require('express');
const db = require('./config/db');
const clienteController = require('./controllers/clienteController');

const app = express(); //Instância do Express
const PORT = 3000; //Porta para o servidor, por exemplo a 3000

app.use(express.json()); //Middleware para tratar os dados no formato JSON

app.get('/api/comissaoTotal/', clienteController.getComissaoTotal);
app.get('/api/comissaoVenda/', clienteController.getComissaoVenda);
app.get('/api/comissaoRenovacao/', clienteController.getComissaoRenovacao);
app.get('/api/operators/', clienteController.getAllOperators); //Rota para obter todos os clientes
app.get('/api/3M/', clienteController.getAllOperators3M);
app.get('/api/Varzea/', clienteController.getAllOperatorsVarzea);
app.get('/api/Buritizeiro/', clienteController.getAllOperatorsBuritizeiro);
app.get('/api/Pirapora/', clienteController.getAllOperatorsPirapora);
app.get('/api/JP/', clienteController.getAllOperatorsJP);
app.get('/api/Patos/', clienteController.getAllOperatorsPatos);
app.get('/api/Varjao/', clienteController.getAllOperatorsVarjao);
app.get('/api/SaoGoncalo/', clienteController.getAllOperatorsSaoGoncalo);
app.get('/api/Presidente/', clienteController.getAllOperatorsPresidente);
app.get('/api/Irai/', clienteController.getAllOperatorsIrai);
app.get('/api/Abadia/', clienteController.getAllOperatorsAbadia);
app.get('/api/Lagoa/', clienteController.getAllOperatorsLagoa);
app.get('/api/Guima/', clienteController.getAllOperatorsGuima);
app.get('/api/Cruzeiro/', clienteController.getAllOperatorsCruzeiro);
app.get('/api/Patrocinio/', clienteController.getAllOperatorsPatro);
//app.post('/api/clientes', clienteController.createNewClient); //Rota para adicionar um novo cliente

app.listen(PORT, () => {
  console.log(`Servidor na porta ${PORT}`);
}); 
