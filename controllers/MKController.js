const { query } = require("express");
const MKModel = require("../models/MKModel"); // Importe o modelo

const MKController = {
  getComissaoTotal: async (req, res) => {
    const { comissaoVendaTV, comissaoVendaTel, comissaoVendaRecorrente, comissaoVenda, comissaoDia01, comissaoDia02, comissaoRenovacaoTVFrente, comissaoRenovacaoTVTele, comissaoRenovacaoTelFrente, comissaoRenovacaoTelTele, comissaoRenovacaoRecorrenteFrente, comissaoRenovacaoRecorrenteTele, comissaoRenovacaoFrente2, comissaoRenovacaoRecorrenteFrente50, comissaoRenovacaoRecorrenteTele3, comissaoRenovacaoRecorrenteTele4, dataInicio, dataFim } = req.body;
    try {
      const clients = await MKModel.getComissaoTotal( comissaoVendaTV, comissaoVendaTel, comissaoVendaRecorrente, comissaoVenda, comissaoDia01, comissaoDia02, comissaoRenovacaoTVFrente, comissaoRenovacaoTVTele, comissaoRenovacaoTelFrente, comissaoRenovacaoTelTele, comissaoRenovacaoRecorrenteFrente, comissaoRenovacaoRecorrenteTele, comissaoRenovacaoFrente2, comissaoRenovacaoRecorrenteFrente50, comissaoRenovacaoRecorrenteTele3, comissaoRenovacaoRecorrenteTele4, dataInicio, dataFim );
      res.status(200).json(clients);
    } catch (error) {
      res.status(500).json({ error: "Erro ao obter lista de clientes."+error });
    }
  },
  getComissaoVenda: async (req, res) => {
    const { comissaoTV, comissaoTel, comissaoRecorrente, comissaoVenda, comissaoDia01, comissaoDia02, dataInicio, dataFim } = req.body;
    try {
      const clients = await MKModel.getComissaoVenda(comissaoTV, comissaoTel, comissaoRecorrente, comissaoVenda, comissaoDia01, comissaoDia02, dataInicio, dataFim);
      res.status(200).json(clients);
    } catch (error) {
      res.status(500).json({ error: "Erro ao obter lista de comissões de Vendas."+error });
    }
  },
  getComissaoRenovacao: async (req, res) => {
    const { comissaoTVFrente, comissaoTVTele, comissaoTelFrente, comissaoTelTele, comissaoRecorrenteFrente, comissaoRecorrenteTele, comissaoVendaFrente2, comissaoVendaFrente50, comissaoVendaTele3, comissaoVendaTele4, dataInicio, dataFim } = req.body;
    try {
      const clients = await MKModel.getComissaoRenovacao(comissaoTVFrente, comissaoTVTele, comissaoTelFrente, comissaoTelTele, comissaoRecorrenteFrente, comissaoRecorrenteTele, comissaoVendaFrente2, comissaoVendaFrente50, comissaoVendaTele3, comissaoVendaTele4, dataInicio, dataFim);
      res.status(200).json(clients);
    } catch (error) {
      res.status(500).json({ error: "Erro ao obter lista de comissões de Renovação."+error });
    }
  },
  getAllOperators: async (req, res) => {
    const { } = req.body;
    try {
      const operators = await MKModel.getAllOperators();
      res.status(200).json(operators);
    } catch (error) {
      res.status(500).json({ error: "Erro ao obter lista de operadores."+error });
    }
  },
  getAllOperators3M: async (req, res) => {
    const { } = req.body;
    try {
      const operators = await MKModel.getAllOperators3M();
      res.status(200).json(operators);
    } catch (error) {
      res.status(500).json({ error: "Erro ao obter lista de operadores."+error });
    }
  },
  getAllOperatorsVarzea: async (req, res) => {
    const { } = req.body;
    try {
      const operators = await MKModel.getAllOperatorsVarzea();
      res.status(200).json(operators);
    } catch (error) {
      res.status(500).json({ error: "Erro ao obter lista de operadores."+error });
    }
  },
  getAllOperatorsBuritizeiro: async (req, res) => {
    const { } = req.body;
    try {
      const operators = await MKModel.getAllOperatorsBuritizeiro();
      res.status(200).json(operators);
    } catch (error) {
      res.status(500).json({ error: "Erro ao obter lista de operadores."+error });
    }
  },
  getAllOperatorsPirapora: async (req, res) => {
    const { } = req.body;
    try {
      const operators = await MKModel.getAllOperatorsPirapora();
      res.status(200).json(operators);
    } catch (error) {
      res.status(500).json({ error: "Erro ao obter lista de operadores."+error });
    }
  },
  getAllOperatorsJP: async (req, res) => {
    const { } = req.body;
    try {
      const operators = await MKModel.getAllOperatorsJP();
      res.status(200).json(operators);
    } catch (error) {
      res.status(500).json({ error: "Erro ao obter lista de operadores."+error });
    }
  },
  getAllOperatorsPatos: async (req, res) => {
    const { } = req.body;
    try {
      const operators = await MKModel.getAllOperatorsPatos();
      res.status(200).json(operators);
    } catch (error) {
      res.status(500).json({ error: "Erro ao obter lista de operadores."+error });
    }
  },
  getAllOperatorsVarjao: async (req, res) => {
    const { } = req.body;
    try {
      const operators = await MKModel.getAllOperatorsVarjao();
      res.status(200).json(operators);
    } catch (error) {
      res.status(500).json({ error: "Erro ao obter lista de operadores."+error });
    }
  },
  getAllOperatorsSaoGoncalo: async (req, res) => {
    const { } = req.body;
    try {
      const operators = await MKModel.getAllOperatorsSaoGoncalo();
      res.status(200).json(operators);
    } catch (error) {
      res.status(500).json({ error: "Erro ao obter lista de operadores."+error });
    }
  },
  getAllOperatorsPresidente: async (req, res) => {
    const { } = req.body;
    try {
      const operators = await MKModel.getAllOperatorsPresidente();
      res.status(200).json(operators);
    } catch (error) {
      res.status(500).json({ error: "Erro ao obter lista de operadores."+error });
    }
  },
  getAllOperatorsIrai: async (req, res) => {
    const { } = req.body;
    try {
      const operators = await MKModel.getAllOperatorsIrai();
      res.status(200).json(operators);
    } catch (error) {
      res.status(500).json({ error: "Erro ao obter lista de operadores."+error });
    }
  },
  getAllOperatorsAbadia: async (req, res) => {
    const { } = req.body;
    try {
      const operators = await MKModel.getAllOperatorsAbadia();
      res.status(200).json(operators);
    } catch (error) {
      res.status(500).json({ error: "Erro ao obter lista de operadores."+error });
    }
  },
  getAllOperatorsLagoa: async (req, res) => {
    const { } = req.body;
    try {
      const operators = await MKModel.getAllOperatorsLagoa();
      res.status(200).json(operators);
    } catch (error) {
      res.status(500).json({ error: "Erro ao obter lista de operadores."+error });
    }
  },
  getAllOperatorsGuima: async (req, res) => {
    const { } = req.body;
    try {
      const operators = await MKModel.getAllOperatorsGuima();
      res.status(200).json(operators);
    } catch (error) {
      res.status(500).json({ error: "Erro ao obter lista de operadores."+error });
    }
  },
  getAllOperatorsCruzeiro: async (req, res) => {
    const { } = req.body;
    try {
      const operators = await MKModel.getAllOperatorsCruzeiro();
      res.status(200).json(operators);
    } catch (error) {
      res.status(500).json({ error: "Erro ao obter lista de operadores."+error });
    }
  },
  getAllOperatorsPatro: async (req, res) => {
    const { } = req.body;
    try {
      const operators = await MKModel.getAllOperatorsPatro();
      res.status(200).json(operators);
    } catch (error) {
      res.status(500).json({ error: "Erro ao obter lista de operadores."+error });
    }
  },
  getAllQntContratos: async (req, res) => {
    const { diasVencimento, dataInicio, dataFim } = req.body;
    const operators = [];
    try {
      for(var i=0;i<diasVencimento.length;i++){
        operators[i] = await MKModel.getAllQntContratos(diasVencimento[i], dataInicio, dataFim);
      }
      res.status(200).json(operators);
    } catch (error) {
      res.status(500).json({ error: "Erro ao obter relatório. "+error });
    }
  },
  getClientWithCelNumer: async (req, res) => {
    const { numeroCel, dataInicio, dataFim } = req.body;
    try {
      const operators = await MKModel.getClientWithCelNumer(numeroCel, dataInicio, dataFim);
      res.status(200).json(operators);
    } catch (error) {
      res.status(500).json({ error: "Erro ao obter cliente/número."+error });
    }
  },
  getQuantityContratsActives: async (req, res) => {
    const { dataFim } = req.body;
    try {
      const operators = await MKModel.getQuantityContratsActives(dataFim);
      res.status(200).json(operators);
    } catch (error) {
      res.status(500).json({ error: "Erro ao obter cliente/número."+error });
    }
  },
  getAllCities: async (req, res) => {
    const { } = req.body;
    try {
      const operators = await MKModel.getAllCities();
      res.status(200).json(operators);
    } catch (error) {
      res.status(500).json({ error: "Erro ao obter cidades."+error });
    }
  },
};

module.exports = MKController;
