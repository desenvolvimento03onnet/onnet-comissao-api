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
};

module.exports = clienteController;
