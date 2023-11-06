const { query } = require("express");
const ClienteModel = require("../models/ClienteModel"); // Importe o modelo

const clienteController = {
  getComissaoTotal: async (req, res) => {
    const { comissaoVendaTV, comissaoVendaTel, comissaoVendaRecorrente, comissaoVenda, comissaoDia01, comissaoDia02, comissaoRenovacaoTVFrente, comissaoRenovacaoTVTele, comissaoRenovacaoTelFrente, comissaoRenovacaoTelTele, comissaoRenovacaoRecorrenteFrente, comissaoRenovacaoRecorrenteTele, comissaoRenovacaoFrente2, comissaoRenovacaoRecorrenteFrente50, comissaoRenovacaoRecorrenteTele3, comissaoRenovacaoRecorrenteTele4, dataInicio, dataFim } = req.body;
    try {
      const clients = await ClienteModel.getComissaoTotal( comissaoVendaTV, comissaoVendaTel, comissaoVendaRecorrente, comissaoVenda, comissaoDia01, comissaoDia02, comissaoRenovacaoTVFrente, comissaoRenovacaoTVTele, comissaoRenovacaoTelFrente, comissaoRenovacaoTelTele, comissaoRenovacaoRecorrenteFrente, comissaoRenovacaoRecorrenteTele, comissaoRenovacaoFrente2, comissaoRenovacaoRecorrenteFrente50, comissaoRenovacaoRecorrenteTele3, comissaoRenovacaoRecorrenteTele4, dataInicio, dataFim );
      res.status(200).json(clients);
    } catch (error) {
      res.status(500).json({ error: "Erro ao obter lista de clientes."+error });
    }
  },
  getComissaoVenda: async (req, res) => {
    const { comissaoTV, comissaoTel, comissaoRecorrente, comissaoVenda, comissaoDia01, comissaoDia02, dataInicio, dataFim } = req.body;
    try {
      const clients = await ClienteModel.getComissaoVenda(comissaoTV, comissaoTel, comissaoRecorrente, comissaoVenda, comissaoDia01, comissaoDia02, dataInicio, dataFim);
      res.status(200).json(clients);
    } catch (error) {
      res.status(500).json({ error: "Erro ao obter lista de comissões de Vendas."+error });
    }
  },
  getComissaoRenovacao: async (req, res) => {
    const { comissaoTVFrente, comissaoTVTele, comissaoTelFrente, comissaoTelTele, comissaoRecorrenteFrente, comissaoRecorrenteTele, comissaoVendaFrente2, comissaoVendaFrente50, comissaoVendaTele3, comissaoVendaTele4, dataInicio, dataFim } = req.body;
    try {
      const clients = await ClienteModel.getComissaoRenovacao(comissaoTVFrente, comissaoTVTele, comissaoTelFrente, comissaoTelTele, comissaoRecorrenteFrente, comissaoRecorrenteTele, comissaoVendaFrente2, comissaoVendaFrente50, comissaoVendaTele3, comissaoVendaTele4, dataInicio, dataFim);
      res.status(200).json(clients);
    } catch (error) {
      res.status(500).json({ error: "Erro ao obter lista de comissões de Renovação."+error });
    }
  },
  getAllOperators: async (req, res) => {
    const { } = req.body;
    try {
      const operators = await ClienteModel.getAllOperators();
      res.status(200).json(operators);
    } catch (error) {
      res.status(500).json({ error: "Erro ao obter lista de operadores."+error });
    }
  },
  getAllOperators3M: async (req, res) => {
    const { } = req.body;
    try {
      const operators = await ClienteModel.getAllOperators3M();
      res.status(200).json(operators);
    } catch (error) {
      res.status(500).json({ error: "Erro ao obter lista de operadores."+error });
    }
  },
  getAllOperatorsVarzea: async (req, res) => {
    const { } = req.body;
    try {
      const operators = await ClienteModel.getAllOperatorsVarzea();
      res.status(200).json(operators);
    } catch (error) {
      res.status(500).json({ error: "Erro ao obter lista de operadores."+error });
    }
  },
  getAllOperatorsBuritizeiro: async (req, res) => {
    const { } = req.body;
    try {
      const operators = await ClienteModel.getAllOperatorsBuritizeiro();
      res.status(200).json(operators);
    } catch (error) {
      res.status(500).json({ error: "Erro ao obter lista de operadores."+error });
    }
  },
  getAllOperatorsPirapora: async (req, res) => {
    const { } = req.body;
    try {
      const operators = await ClienteModel.getAllOperatorsPirapora();
      res.status(200).json(operators);
    } catch (error) {
      res.status(500).json({ error: "Erro ao obter lista de operadores."+error });
    }
  },
  getAllOperatorsJP: async (req, res) => {
    const { } = req.body;
    try {
      const operators = await ClienteModel.getAllOperatorsJP();
      res.status(200).json(operators);
    } catch (error) {
      res.status(500).json({ error: "Erro ao obter lista de operadores."+error });
    }
  },
  getAllOperatorsPatos: async (req, res) => {
    const { } = req.body;
    try {
      const operators = await ClienteModel.getAllOperatorsPatos();
      res.status(200).json(operators);
    } catch (error) {
      res.status(500).json({ error: "Erro ao obter lista de operadores."+error });
    }
  },
  getAllOperatorsVarjao: async (req, res) => {
    const { } = req.body;
    try {
      const operators = await ClienteModel.getAllOperatorsVarjao();
      res.status(200).json(operators);
    } catch (error) {
      res.status(500).json({ error: "Erro ao obter lista de operadores."+error });
    }
  },
  getAllOperatorsSaoGoncalo: async (req, res) => {
    const { } = req.body;
    try {
      const operators = await ClienteModel.getAllOperatorsSaoGoncalo();
      res.status(200).json(operators);
    } catch (error) {
      res.status(500).json({ error: "Erro ao obter lista de operadores."+error });
    }
  },
  getAllOperatorsPresidente: async (req, res) => {
    const { } = req.body;
    try {
      const operators = await ClienteModel.getAllOperatorsPresidente();
      res.status(200).json(operators);
    } catch (error) {
      res.status(500).json({ error: "Erro ao obter lista de operadores."+error });
    }
  },
  getAllOperatorsIrai: async (req, res) => {
    const { } = req.body;
    try {
      const operators = await ClienteModel.getAllOperatorsIrai();
      res.status(200).json(operators);
    } catch (error) {
      res.status(500).json({ error: "Erro ao obter lista de operadores."+error });
    }
  },
  getAllOperatorsAbadia: async (req, res) => {
    const { } = req.body;
    try {
      const operators = await ClienteModel.getAllOperatorsAbadia();
      res.status(200).json(operators);
    } catch (error) {
      res.status(500).json({ error: "Erro ao obter lista de operadores."+error });
    }
  },
  getAllOperatorsLagoa: async (req, res) => {
    const { } = req.body;
    try {
      const operators = await ClienteModel.getAllOperatorsLagoa();
      res.status(200).json(operators);
    } catch (error) {
      res.status(500).json({ error: "Erro ao obter lista de operadores."+error });
    }
  },
  getAllOperatorsGuima: async (req, res) => {
    const { } = req.body;
    try {
      const operators = await ClienteModel.getAllOperatorsGuima();
      res.status(200).json(operators);
    } catch (error) {
      res.status(500).json({ error: "Erro ao obter lista de operadores."+error });
    }
  },
  getAllOperatorsCruzeiro: async (req, res) => {
    const { } = req.body;
    try {
      const operators = await ClienteModel.getAllOperatorsCruzeiro();
      res.status(200).json(operators);
    } catch (error) {
      res.status(500).json({ error: "Erro ao obter lista de operadores."+error });
    }
  },
  getAllOperatorsPatro: async (req, res) => {
    const { } = req.body;
    try {
      const operators = await ClienteModel.getAllOperatorsPatro();
      res.status(200).json(operators);
    } catch (error) {
      res.status(500).json({ error: "Erro ao obter lista de operadores."+error });
    }
  },
};

module.exports = clienteController;
