const db = require("../config/db"); // Importe a configuração do banco de dados


const Cliente = {
  getAllClients: async (dataInicio, dataFim) => {
    try {
      const query =
      'select codcontrato, cancelado, adesao from public.mk_contratos where adesao between $1 and $2';
      const values = [dataInicio, dataFim];
      const result = await db.query(query, values);
      return result.rows;
    } catch (error) {
      throw error;
    }
  },

  //   createNewClient: async (nome, cpf) => {
  //     try {
  //       const query = 'INSERT INTO Cliente (nome, cpf) VALUES ($1, $2) RETURNING *';
  //       const values = [nome, cpf];
  //       const result = await db.query(query, values);
  //       return result.rows[0];
  //     } catch (error) {
  //       throw error;
  //     }
  //   }
};

module.exports = Cliente;
