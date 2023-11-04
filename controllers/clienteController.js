const ClienteModel = require("../models/ClienteModel"); // Importe o modelo

const clienteController = {
  getAllClients: async (req, res) => {
    const { dataInicio, dataFim } = req.body;
    try {
      const clients = await ClienteModel.getAllClients(dataInicio, dataFim);
      res.status(200).json(clients);
    } catch (error) {
      res.status(500).json({ error: "Erro ao obter lista de clientes."+error });
    }
  },

  //   createNewClient: async (req, res) => {
  //     const { nome, cpf } = req.body;
  //     try {
  //       const newClient = await ClienteModel.createNewClient(nome, cpf);
  //       res.status(201).json(newClient);
  //     } catch (error) {
  //       res.status(500).json({ error: 'Erro ao criar novo cliente.' });
  //     }
  //   }
};

module.exports = clienteController;
