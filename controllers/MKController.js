const { query } = require("express");
const MKModel = require("../models/MKModel"); // Importe o modelo

const MKController = {
  getComissaoTotal: async (req, res) => {
    const { vendaTVFrente, vendaTVTele, vendaTVPAP, vendaTelFrente, vendaTelTele, vendaTelPAP, vendaRecorrenteFrente, vendaRecorrenteTele, vendaRecorrentePAP, vendaPorcentagemFrente, vendaPorcentagemTele, vendaPorcentagemPAP, Dia01, Dia02, vendaDia01, vendaDia02, dataInicio, dataFim, setores, cidadesoperadores, renovacaoTVFrente, renovacaoTVTele, renovacaoTVPAP, renovacaoTelFrente, renovacaoTelTele, renovacaoTelPAP, renovacaoRecorrenteFrente, renovacaoRecorrenteTele, renovacaoRecorrentePAP, renovacaoPorcentagemFrenteRenovacao, renovacaoPorcentagemFrenteUpgrade, renovacaoPorcentagemTeleRenovacao, renovacaoPorcentagemTeleUpgrade, renovacaoPorcentagemPAPRenovacao, renovacaoPorcentagemPAPUpgrade, renovacaoDia01Frente, renovacaoDia01Tele, renovacaoDia01PAP, renovacaoDia02Frente, renovacaoDia02Tele, renovacaoDia02PAP } = req.query;
    const operators = [];
    try {
        for(var i=0;i<setores.length;i++){
          operators[i] = [];
          for(var j=0;j<cidadesoperadores.length;j++){
            operators[i][j] = await MKModel.getComissaoTotal(vendaTVFrente, vendaTVTele, vendaTVPAP, vendaTelFrente, vendaTelTele, vendaTelPAP, vendaRecorrenteFrente, vendaRecorrenteTele, vendaRecorrentePAP, vendaPorcentagemFrente, vendaPorcentagemTele, vendaPorcentagemPAP, Dia01, Dia02, vendaDia01, vendaDia02, dataInicio, dataFim, setores[i], cidadesoperadores[j], renovacaoTVFrente, renovacaoTVTele, renovacaoTVPAP, renovacaoTelFrente, renovacaoTelTele, renovacaoTelPAP, renovacaoRecorrenteFrente, renovacaoRecorrenteTele, renovacaoRecorrentePAP, renovacaoPorcentagemFrenteRenovacao, renovacaoPorcentagemFrenteUpgrade, renovacaoPorcentagemTeleRenovacao, renovacaoPorcentagemTeleUpgrade, renovacaoPorcentagemPAPRenovacao, renovacaoPorcentagemPAPUpgrade, renovacaoDia01Frente, renovacaoDia01Tele, renovacaoDia01PAP, renovacaoDia02Frente, renovacaoDia02Tele, renovacaoDia02PAP);
          }
        }
      res.status(200).json(operators);
    } catch (error) {
      res.status(500).json({ error: "Erro ao obter lista de clientes."+error });
    }
  },
  getAllQntContratos: async (req, res) => {
    const { diasVencimento, dataInicio, dataFim } = req.query;
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
    const { numeroCel, dataInicio, dataFim } = req.query;
    try {
      const operators = await MKModel.getClientWithCelNumer(numeroCel, dataInicio, dataFim);
      res.status(200).json(operators);
    } catch (error) {
      res.status(500).json({ error: "Erro ao obter cliente/número."+error });
    }
  },
  getQuantityContratsActives: async (req, res) => {
    const { dataFim } = req.query;
    try {
      const operators = await MKModel.getQuantityContratsActives(dataFim);
      res.status(200).json(operators);
    } catch (error) {
      res.status(500).json({ error: "Erro ao obter cliente/número."+error });
    }
  },
  getAllClientsFromNAP: async (req, res) => {
    const { caixa } = req.query;
    try {
      const operators = await MKModel.getAllClientsFromNAP(caixa);
      res.status(200).json(operators);
    } catch (error) {
      res.status(500).json({ error: "Erro ao obter clientes."+error });
    }
  },
  getAllCities: async (req, res) => {
    const {} = req.query;
    try {
      const operators = await MKModel.getAllCities();
      res.status(200).json(operators);
    } catch (error) {
      res.status(500).json({ error: "Erro ao obter clientes."+error });
    }
  },
  getAllCitiesOperators: async (req, res) => {
    const {} = req.query;
    try {
      const operators = await MKModel.getAllCitiesOperators();
      res.status(200).json(operators);
    } catch (error) {
      res.status(500).json({ error: "Erro ao obter clientes."+error });
    }
  },
  getAllSectors: async (req, res) => {
    const {} = req.query;
    try {
      const operators = await MKModel.getAllSectors();
      res.status(200).json(operators);
    } catch (error) {
      res.status(500).json({ error: "Erro ao obter clientes."+error });
    }
  },
  getContractByNumber: async (req, res) => {
    const { fixo } = req.query;
    try {
      const operators = await MKModel.getContractByNumber(fixo);
      res.status(200).json(operators);
    } catch (error) {
      res.status(500).json({ error: "Erro ao obter clientes."+error });
    }
  },
  getProfileFromClients: async (req, res) => {
    const { listaClientes } = req.query;
    const operators = [];
    try {
      for(var i=0;i<listaClientes.length;i++){
        operators[i] = await MKModel.getProfileFromClients(listaClientes[i]);
      }
      res.status(200).json(operators);
    } catch (error) {
      res.status(500).json({ error: "Erro ao obter relatório. "+error });
    }
  },
};

module.exports = MKController;
