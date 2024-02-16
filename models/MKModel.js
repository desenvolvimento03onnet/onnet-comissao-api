const db = require("../config/db"); // Importe a configuração do banco de dados

const MK = {
  getComissaoTotal: async ( vendaTVFrente, vendaTVTele, vendaTVPAP, vendaTelFrente, vendaTelTele, vendaTelPAP, vendaRecorrenteFrente, vendaRecorrenteTele, vendaRecorrentePAP, vendaPorcentagemFrente, vendaPorcentagemTele, vendaPorcentagemPAP, Dia01, Dia02, vendaDia01, vendaDia02, dataInicio, dataFim, setores, cidadesoperadores, renovacaoTVFrente, renovacaoTVTele, renovacaoTVPAP, renovacaoTelFrente, renovacaoTelTele, renovacaoTelPAP, renovacaoRecorrenteFrente, renovacaoRecorrenteTele, renovacaoRecorrentePAP, renovacaoPorcentagemFrenteRenovacao, renovacaoPorcentagemFrenteUpgrade, renovacaoPorcentagemTeleRenovacao, renovacaoPorcentagemTeleUpgrade, renovacaoPorcentagemPAPRenovacao, renovacaoPorcentagemPAPUpgrade, renovacaoDia01Frente, renovacaoDia01Tele, renovacaoDia01PAP, renovacaoDia02Frente, renovacaoDia02Tele, renovacaoDia02PAP ) => {
    try {
      const query =
      "SELECT\n"+
      "codigo,\n"+
      "cliente,\n"+
      "cidade,\n"+
      "contrato,\n"+
      "data,\n"+
      "operacao,\n"+
      "codoperador,\n"+
      "operador,\n"+
      "cidadeope,\n"+
      "setor,\n"+
      "fatura,\n"+
      "dt_liquidacao,\n"+
      "pago,\n"+
      "CASE\n"+
      "WHEN valor_plano NOT IN ('Cliente não possui faturas', 'Cliente ainda não pagou') THEN valor_plano\n"+
      "ELSE valor_plano\n"+
      "END valor_plano,\n"+
      "CASE\n"+
      "WHEN valor_tv NOT IN ('Cliente não possui faturas', 'Cliente ainda não pagou') THEN valor_tv\n"+
      "ELSE valor_tv\n"+
      "END valor_tv,\n"+
      "CASE\n"+
      "WHEN valor_telefonia NOT IN ('Cliente não possui faturas', 'Cliente ainda não pagou') THEN valor_telefonia\n"+
      "ELSE valor_telefonia\n"+
      "END valor_telefonia,\n"+
      "CASE\n"+
      "WHEN valor_recorrente NOT IN ('Cliente não possui faturas', 'Cliente ainda não pagou') THEN valor_recorrente\n"+
      "ELSE valor_recorrente\n"+
      "END valor_recorrente,\n"+
      "CASE\n"+
      "WHEN comissao_venda NOT IN ('Cliente não possui faturas', 'Cliente ainda não pagou') THEN comissao_venda\n"+
      "ELSE comissao_venda\n"+
      "END comissao_venda,\n"+
      "CASE\n"+
      "WHEN dia_02_04 NOT IN ('Cliente não possui faturas', 'Cliente ainda não pagou') THEN dia_02_04\n"+
      "ELSE dia_02_04\n"+
      "END dia_02_04,\n"+
      "CASE\n"+
      "WHEN dt_liquidacao NOT IN ('Cliente não possui faturas', 'Cliente ainda não pagou') THEN\n"+
      "(\n"+
			"(\n"+
      "select\n"+
      "CASE\n"+
      "WHEN valor_tv NOT IN ('Cliente não possui faturas', 'Cliente ainda não pagou') THEN CAST(valor_tv AS NUMERIC(9,3))\n"+
      "END\n"+
			")\n"+
			"+\n"+
			"(\n"+
      "select\n"+
      "CASE\n"+
      "WHEN valor_telefonia NOT IN ('Cliente não possui faturas', 'Cliente ainda não pagou') THEN CAST(valor_telefonia AS NUMERIC(9,3))\n"+
      "END\n"+
			")\n"+
			"+\n"+
			"(\n"+
      "select\n"+
      "CASE\n"+
      "WHEN valor_recorrente NOT IN ('Cliente não possui faturas', 'Cliente ainda não pagou') THEN CAST(valor_recorrente AS NUMERIC(9,3))\n"+
      "END\n"+
			")\n"+
			"+\n"+
			"(\n"+
      "select\n"+
      "CASE\n"+
      "WHEN comissao_venda NOT IN ('Cliente não possui faturas', 'Cliente ainda não pagou') THEN CAST(comissao_venda AS NUMERIC(9,3))\n"+
      "END\n"+
			")\n"+
			"+\n"+
			"(\n"+
      "select\n"+
      "CASE\n"+
      "WHEN dia_02_04 NOT IN ('Cliente não possui faturas', 'Cliente ainda não pagou') THEN CAST(dia_02_04 AS NUMERIC(9,3))\n"+
      "END\n"+
			")\n"+
      ")||''\n"+
      "ELSE dt_liquidacao\n"+
      "end valor_total\n"+
      "FROM\n"+
      "(\n"+
      "SELECT\n"+
      "codigo,\n"+
      "cliente,\n"+
      "cidade,\n"+
      "contrato,\n"+
      "adesao AS \"data\",\n"+
      "'Venda' operacao,\n"+
      "codoperador,\n"+
      "operador,\n"+
      "cidadeope,\n"+
      "setor,\n"+
      "coalesce(fat||'','Cliente não possui faturas') fatura,\n"+
      "CASE\n"+
      "WHEN (\n"+
      "SELECT\n"+
			"CASE\n"+
      "WHEN fatura.data_liquidacao IS NULL THEN 'Cliente ainda não pagou'\n"+
      "ELSE fatura.data_liquidacao||''\n"+
			"END\n"+
      "from\n"+
			"mk_faturas fatura\n"+
      "where\n"+
			"fatura.codfatura = fat\n"+
      ") IS NULL THEN 'Cliente não possui faturas'\n"+
      "else\n"+
      "(\n"+
			"SELECT\n"+
      "CASE\n"+
      "WHEN fatura.data_liquidacao IS NULL THEN 'Cliente ainda não pagou'\n"+
      "ELSE fatura.data_liquidacao||''\n"+
      "END\n"+
			"from\n"+
      "mk_faturas fatura\n"+
			"where\n"+
			"fatura.codfatura = fat\n"+
      ")\n"+
      "end dt_liquidacao,\n"+
      "CASE\n"+
      "WHEN (\n"+
			"SELECT\n"+
      "case\n"+
      "WHEN fatura.liquidado = 'N' THEN 'Cliente ainda não pagou'\n"+
      "ELSE 'Cliente pagou a 1ª Mensalidade'\n"+
      "end\n"+
			"from\n"+
      "mk_faturas fatura\n"+
			"where\n"+
      "fatura.codfatura = fat\n"+
			") IS NULL THEN 'Cliente não possui faturas'\n"+
      "else\n"+
      "(\n"+
      "SELECT\n"+
			"case\n"+
      "WHEN fatura.liquidado = 'N' THEN 'Cliente ainda não pagou'\n"+
      "ELSE 'Cliente pagou a 1ª Mensalidade'\n"+
			"end\n"+
      "from\n"+
			"mk_faturas fatura\n"+
      "where\n"+
			"fatura.codfatura = fat\n"+
      ")\n"+
      "end pago,\n"+
      "CASE\n"+
      "WHEN (\n"+
      "SELECT\n"+
      "case\n"+
      "WHEN fatura.liquidado = 'N' THEN 'Cliente ainda não pagou'\n"+
      "ELSE (\n"+
      "SELECT\n"+
      "plano.vlr_mensalidade||''\n"+
      "from\n"+
      "mk_planos_acesso plano\n"+
      "where\n"+
      "planoC = plano.codplano\n"+
      ")\n"+
      "END\n"+
      "from\n"+
      "mk_faturas fatura\n"+
      "where\n"+
      "fatura.codfatura = fat\n"+
			") IS NULL THEN 'Cliente não possui faturas'\n"+
      "ELSE\n"+
      "(\n"+
			"SELECT\n"+
      "case\n"+
      "WHEN fatura.liquidado = 'N' THEN 'Cliente ainda não pagou'\n"+
      "ELSE (\n"+
      "SELECT\n"+
      "plano.vlr_mensalidade||''\n"+
      "from\n"+
      "mk_planos_acesso plano\n"+
      "where\n"+
      "planoC = plano.codplano\n"+
      ")\n"+
      "END\n"+
			"from\n"+
			"mk_faturas fatura\n"+
			"where\n"+
			"fatura.codfatura = fat\n"+
      ")\n"+
      "end valor_plano,\n"+
      "CASE\n"+
      "WHEN (\n"+
      "SELECT\n"+
      "case\n"+
      "WHEN fatura.liquidado = 'N' THEN 'Cliente ainda não pagou'\n"+
      "ELSE (\n"+
      "SELECT\n"+
      "REPLACE (plano.vlr_mensalidade||'','.',',')\n"+
      "from\n"+
      "mk_planos_acesso plano\n"+
      "where\n"+
      "planoC = plano.codplano\n"+
      ")\n"+
      "END\n"+
      "from\n"+
      "mk_faturas fatura\n"+
      "where\n"+
      "fatura.codfatura = fat\n"+
			") IS NULL THEN 'Cliente não possui faturas'\n"+
      "ELSE\n"+
      "(\n"+
			"SELECT\n"+
      "case\n"+
      "WHEN fatura.liquidado = 'N' THEN 'Cliente ainda não pagou'\n"+
      "ELSE\n"+
      "case\n"+
      "WHEN codsetor IN (11,13,14) THEN $1\n"+
      "WHEN codsetor = 15 THEN $2\n"+
      "WHEN codsetor = 32 THEN $3\n"+
      "ELSE '0'\n"+
      "end\n"+
      "END\n"+
			"from\n"+
			"mk_faturas fatura\n"+
			"where\n"+
			"fatura.codfatura = fat\n"+
      ")\n"+
      "END valor_tv,\n"+
      "CASE\n"+
      "WHEN (\n"+
      "SELECT\n"+
      "case\n"+
      "WHEN fatura.liquidado = 'N' THEN 'Cliente ainda não pagou'\n"+
			"ELSE\n"+
      "case\n"+
      "WHEN (\n"+
      "SELECT\n"+
      "produto.descricao\n"+
      "FROM\n"+
      "mk_crm_produtos plano\n"+
      "INNER JOIN mk_crm_produtos_composicao item ON (item.cd_produto = plano.codcrmproduto)\n"+
      "INNER JOIN mk_planos_acesso produto ON (produto.codplano = item.cd_plano)\n"+
      "WHERE\n"+
			"plano.cd_plano_principal = planoC\n"+
      "AND UPPER(produto.descricao) LIKE '%TEL%ADICIONAL%'\n"+
      ") IS NOT NULL THEN '0'\n"+
      "ELSE '0'\n"+
      "end\n"+
      "end\n"+
      "from\n"+
      "mk_faturas fatura\n"+
      "where\n"+
      "fatura.codfatura = fat\n"+
			") IS NULL THEN 'Cliente não possui faturas'\n"+
      "else\n"+
      "(\n"+
			"SELECT\n"+
      "case\n"+
      "WHEN fatura.liquidado = 'N' THEN 'Cliente ainda não pagou'\n"+
			"ELSE\n"+
      "case\n"+
      "WHEN (\n"+
      "SELECT\n"+
      "produto.descricao\n"+
      "FROM\n"+
      "mk_crm_produtos plano\n"+
      "INNER JOIN mk_crm_produtos_composicao item ON (item.cd_produto = plano.codcrmproduto)\n"+
      "INNER JOIN mk_planos_acesso produto ON (produto.codplano = item.cd_plano)\n"+
      "WHERE\n"+
      "plano.cd_plano_principal = planoC\n"+
      "AND UPPER(produto.descricao) LIKE '%TEL%ADICIONAL%'\n"+
      ") IS NOT NULL THEN\n"+
      "case\n"+
      "WHEN codsetor IN (11,13,14) THEN $4\n"+
      "WHEN codsetor = 15 THEN $5\n"+
      "WHEN codsetor = 32 THEN $6\n"+
      "ELSE '0'\n"+
      "end\n"+
      "ELSE '0'\n"+
      "end\n"+
      "end\n"+
			"from\n"+
			"mk_faturas fatura\n"+
			"where\n"+
			"fatura.codfatura = fat\n"+
      ")\n"+
      "end valor_telefonia,\n"+
      "CASE\n"+
      "WHEN (\n"+
      "SELECT\n"+
			"case\n"+
      "WHEN fatura.liquidado = 'N' THEN 'Cliente ainda não pagou'\n"+
      "ELSE\n"+
      "case\n"+
      "when\n"+
      "exists(\n"+
      "select\n"+
      "trans.codtransacaocartao\n"+
      "from\n"+
      "mk_transacoes_cartao_geradas trans\n"+
      "WHERE\n"+
      "trans.cd_fatura = fatura.codfatura\n"+
			"AND trans.excluida = 'N'\n"+
      ") IS TRUE THEN '0'\n"+
      "ELSE '0'\n"+
      "END\n"+
			"end\n"+
      "from\n"+
      "mk_faturas fatura\n"+
      "where\n"+
      "fatura.codfatura = fat\n"+
			") IS NULL THEN 'Cliente não possui faturas'\n"+
      "else\n"+
      "(\n"+
			"SELECT\n"+
      "case\n"+
      "WHEN fatura.liquidado = 'N' THEN 'Cliente ainda não pagou'\n"+
      "ELSE\n"+
      "case\n"+
      "when\n"+
      "exists(\n"+
      "select\n"+
      "trans.codtransacaocartao\n"+
      "from\n"+
      "mk_transacoes_cartao_geradas trans\n"+
      "WHERE\n"+
      "trans.cd_fatura = fatura.codfatura\n"+
      "AND trans.excluida = 'N'\n"+
      ") IS TRUE THEN\n"+
      "case\n"+
      "WHEN codsetor IN (11,13,14) THEN $7\n"+
      "WHEN codsetor = 15 THEN $8\n"+
      "WHEN codsetor = 32 THEN $9\n"+
      "ELSE '0'\n"+
      "end\n"+
      "ELSE '0'\n"+
      "END\n"+
      "end\n"+
			"from\n"+
			"mk_faturas fatura\n"+
			"where\n"+
			"fatura.codfatura = fat\n"+
      ")\n"+
      "end valor_recorrente,\n"+
      "CASE\n"+
      "WHEN (\n"+
      "SELECT\n"+
      "case\n"+
      "WHEN fatura.liquidado = 'N' THEN 'Cliente ainda não pagou'\n"+
      "ELSE (\n"+
      "SELECT\n"+
      "REPLACE (plano.vlr_mensalidade||'','.',',')\n"+
      "from\n"+
      "mk_planos_acesso plano\n"+
      "where\n"+
      "planoC = plano.codplano\n"+
      ")\n"+
      "END\n"+
      "from\n"+
      "mk_faturas fatura\n"+
      "where\n"+
      "fatura.codfatura = fat\n"+
			") IS NULL THEN 'Cliente não possui faturas'\n"+
      "ELSE\n"+
      "(\n"+
			"SELECT\n"+
      "case\n"+
      "WHEN fatura.liquidado = 'N' THEN 'Cliente ainda não pagou'\n"+
      "ELSE\n"+
      "case\n"+
      "WHEN codsetor IN (11,13,14) THEN\n"+
      "(\n"+
      "SELECT\n"+
      "(plano.vlr_mensalidade * $10)||''\n"+
      "from\n"+
      "mk_planos_acesso plano\n"+
      "where\n"+
      "planoC = plano.codplano\n"+
      ")\n"+
      "WHEN codsetor = 15 THEN\n"+
      "(\n"+
      "SELECT\n"+
      "(plano.vlr_mensalidade * $11)||''\n"+
      "from\n"+
      "mk_planos_acesso plano\n"+
      "where\n"+
      "planoC = plano.codplano\n"+
      ")\n"+
      "WHEN codsetor = 32 THEN $12\n"+
      "ELSE '0'\n"+
      "end\n"+
      "END\n"+
			"from\n"+
			"mk_faturas fatura\n"+
			"where\n"+
			"fatura.codfatura = fat\n"+
      ")\n"+
      "end comissao_venda,\n"+
      "CASE\n"+
      "WHEN (\n"+
      "SELECT\n"+
      "case\n"+
      "WHEN fatura.liquidado = 'N' THEN 'Cliente ainda não pagou'\n"+
      "ELSE (\n"+
      "SELECT\n"+
      "plano.vlr_mensalidade||''\n"+
      "from\n"+
      "mk_planos_acesso plano\n"+
      "where\n"+
      "planoC = plano.codplano\n"+
      ")\n"+
      "END\n"+
      "from\n"+
      "mk_faturas fatura\n"+
      "where\n"+
      "fatura.codfatura = fat\n"+
			") IS NULL THEN 'Cliente não possui faturas'\n"+
      "ELSE\n"+
      "(\n"+
			"SELECT\n"+
      "case\n"+
      "WHEN fatura.liquidado = 'N' THEN 'Cliente ainda não pagou'\n"+
      "ELSE\n"+
      "case\n"+
      "WHEN vencimento IN ($13) THEN $15\n"+
      "WHEN vencimento IN ($14) THEN $16\n"+
      "ELSE '0'\n"+
      "end\n"+
      "END\n"+
			"from\n"+
			"mk_faturas fatura\n"+
			"where\n"+
			"fatura.codfatura = fat\n"+
      ")\n"+
      "END dia_02_04\n"+
      "FROM\n"+
      "(\n"+
      "SELECT\n"+
      "cliente.codpessoa codigo,\n"+
      "cliente.nome_razaosocial cliente,\n"+
      "cidade.cidade,\n"+
      "contrato.codcontrato contrato,\n"+
      "contrato.plano_acesso planoC,\n"+
      "contrato.adesao,\n"+
      "usuario.usr_codigo codoperador,\n"+
      "contrato.operador,\n"+
      "cidadeope.cidade cidadeope,\n"+
      "setor.codperfilacessomaster codsetor,\n"+
      "setor.descricao setor,\n"+
      "(\n"+
			"SELECT\n"+
      "min(faturas.codfatura)\n"+
			"from\n"+
      "mk_faturas faturas\n"+
      "INNER JOIN mk_faturas_historicos histos ON (histos.cd_fatura = faturas.codfatura)\n"+
			"where\n"+
      "faturas.cd_pessoa = cliente.codpessoa and\n"+
      "faturas.excluida = 'N' and\n"+
      "faturas.suspenso = 'N' and\n"+
      "faturas.tipo = 'R' and\n"+
      "faturas.data_vencimento = \n"+
      "(\n"+
      "select\n"+
      "min(fatura.data_vencimento)\n"+
      "from\n"+
      "mk_faturas fatura\n"+
      "INNER JOIN mk_faturas_historicos histo ON (histo.cd_fatura = fatura.codfatura)\n"+
			"where\n"+
      "fatura.cd_pessoa = faturas.cd_pessoa and\n"+
      "histo.cd_operacao IN (1,8,40,47) and\n"+
      "histo.dt_hr >= (histos.dt_hr - INTERVAL '5 minutes') and\n"+
      "fatura.excluida = 'N' and\n"+
      "fatura.suspenso = 'N' and\n"+
      "fatura.tipo = 'R' and\n"+
      "fatura.data_vencimento > histos.dt_hr::date\n"+
      ")\n"+
      "AND histos.cd_operacao IN (1,8,40,47)\n"+
      "AND histos.dt_hr >= (contrato.adesao - INTERVAL '5 minutes')\n"+
      ") fat,\n"+
      "(\n"+
      "select\n"+
      "dia.dia_vcto\n"+
      "from\n"+
      "mk_faturamentos_regras dia\n"+
      "where\n"+
      "dia.codfaturamentoregra = contrato.cd_regra_faturamento\n"+
      ") vencimento\n"+
      "FROM\n"+
      "mk_contratos contrato\n"+
      "INNER JOIN mk_pessoas cliente ON (cliente.codpessoa = contrato.cliente)\n"+
      "INNER JOIN mk_cidades cidade ON (cidade.codcidade = cliente.codcidade)\n"+
      "LEFT JOIN fr_usuario usuario ON (usuario.usr_login = contrato.operador)\n"+
      "LEFT JOIN mk_usuarios_perfil_acesso_master setor ON (setor.codperfilacessomaster = usuario.cd_perfil_acesso)\n"+
      "LEFT JOIN mk_crm_operadores operador ON (operador.cd_operador = usuario.usr_codigo)\n"+
      "LEFT JOIN mk_pessoas operadorcad ON (operadorcad.codpessoa = operador.codpessoa)\n"+
      "LEFT JOIN mk_cidades cidadeope ON (cidadeope.codcidade = operadorcad.codcidade)\n"+
      "WHERE\n"+
      "contrato.adesao BETWEEN $17 and $18\n"+
      "AND cliente.inativo = 'N'\n"+
      "AND operador.perfil_ativo = 'S'\n"+
      "AND setor.codperfilacessomaster||'' IN ($19)\n"+
      "AND cidadeope.codcidade||'' IN ($20)\n"+
      "GROUP BY 1,2,3,4,5,6,7,8,9,10\n"+
      ") AS tabela\n"+
      "UNION\n"+
      "SELECT\n"+
      "codigo,\n"+
      "cliente,\n"+
      "cidade,\n"+
      "contrato,\n"+
      "ultimo::date AS \"data\",\n"+
      "operacao,\n"+
      "codoperador,\n"+
      "operador,\n"+
      "cidadeope,\n"+
      "setor,\n"+
      "coalesce(fat||'','Cliente não possui faturas') fatura,\n"+
      "CASE\n"+
      "WHEN (\n"+
      "SELECT\n"+
			"CASE\n"+
      "WHEN fatura.data_liquidacao IS NULL THEN 'Cliente ainda não pagou'\n"+
      "ELSE fatura.data_liquidacao||''\n"+
			"END\n"+
      "from\n"+
			"mk_faturas fatura\n"+
      "where\n"+
			"fatura.codfatura = fat\n"+
      ") IS NULL THEN 'Cliente não possui faturas'\n"+
      "else\n"+
      "(\n"+
			"SELECT\n"+
      "CASE\n"+
      "WHEN fatura.data_liquidacao IS NULL THEN 'Cliente ainda não pagou'\n"+
      "ELSE fatura.data_liquidacao||''\n"+
      "END\n"+
			"from\n"+
      "mk_faturas fatura\n"+
			"where\n"+
      "fatura.codfatura = fat\n"+
      ")\n"+
      "end dt_liquidacao,\n"+
      "CASE\n"+
      "WHEN (\n"+
			"SELECT\n"+
      "case\n"+
      "WHEN fatura.liquidado = 'N' THEN 'Cliente ainda não pagou'\n"+
      "ELSE 'Cliente pagou a 1ª Mensalidade'\n"+
      "end\n"+
			"from\n"+
      "mk_faturas fatura\n"+
			"where\n"+
      "fatura.codfatura = fat\n"+
			") IS NULL THEN 'Cliente não possui faturas'\n"+
      "else\n"+
      "(\n"+
      "SELECT\n"+
			"case\n"+
      "WHEN fatura.liquidado = 'N' THEN 'Cliente ainda não pagou'\n"+
      "ELSE 'Cliente pagou a 1ª Mensalidade'\n"+
			"end\n"+
      "from\n"+
			"mk_faturas fatura\n"+
      "where\n"+
			"fatura.codfatura = fat\n"+
      ")\n"+
      "end pago,\n"+
      "CASE\n"+
      "WHEN (\n"+
      "SELECT\n"+
      "case\n"+
      "WHEN fatura.liquidado = 'N' THEN 'Cliente ainda não pagou'\n"+
      "ELSE (\n"+
      "SELECT\n"+
      "REPLACE (plano.vlr_mensalidade||'','.',',')\n"+
      "from\n"+
      "mk_planos_acesso plano\n"+
      "where\n"+
      "planoC = plano.codplano\n"+
      ")\n"+
			"END\n"+
      "from\n"+
      "mk_faturas fatura\n"+
      "where\n"+
      "fatura.codfatura = fat\n"+
			") IS NULL THEN 'Cliente não possui faturas'\n"+
      "ELSE\n"+
      "(\n"+
			"SELECT\n"+
      "case\n"+
      "WHEN fatura.liquidado = 'N' THEN 'Cliente ainda não pagou'\n"+
      "ELSE (\n"+
      "SELECT\n"+
      "plano.vlr_mensalidade||''\n"+
      "from\n"+
      "mk_planos_acesso plano\n"+
      "where\n"+
      "planoC = plano.codplano\n"+
      ")\n"+
      "END\n"+
			"from\n"+
			"mk_faturas fatura\n"+
			"where\n"+
			"fatura.codfatura = fat\n"+
      ")\n"+
      "end valor_plano,\n"+
      "CASE\n"+
      "WHEN (\n"+
			"SELECT\n"+
      "case\n"+
      "WHEN fatura.liquidado = 'N' THEN 'Cliente ainda não pagou'\n"+
      "ELSE\n"+
      "case\n"+
      "WHEN (\n"+
      "SELECT\n"+
      "produto.descricao\n"+
      "FROM\n"+
      "mk_crm_produtos plano\n"+
      "INNER JOIN mk_crm_produtos_composicao item ON (item.cd_produto = plano.codcrmproduto)\n"+
      "LEFT JOIN mk_planos_acesso produto ON (produto.codplano = item.cd_plano)\n"+
      "WHERE\n"+
      "plano.cd_plano_principal = planoC\n"+
      "AND (UPPER(produto.descricao) LIKE '%TELA%'\n"+
      "OR UPPER(produto.descricao) LIKE '%CDN%')\n"+
      ") IS NOT NULL THEN '0'\n"+
      "ELSE '0'\n"+
      "end\n"+
      "end\n"+
			"from\n"+
			"mk_faturas fatura\n"+
			"where\n"+
			"fatura.codfatura = fat\n"+
      ") IS NULL THEN 'Cliente não possui faturas'\n"+
      "else\n"+
      "(\n"+
			"SELECT\n"+
      "case\n"+
      "WHEN fatura.liquidado = 'N' THEN 'Cliente ainda não pagou'\n"+
      "ELSE\n"+
      "case\n"+
      "WHEN\n"+
      "exists(\n"+
      "SELECT\n"+
      "produto.descricao\n"+
      "FROM\n"+
      "mk_crm_produtos plano\n"+
      "INNER JOIN mk_crm_produtos_composicao item ON (item.cd_produto = plano.codcrmproduto)\n"+
      "INNER JOIN mk_planos_acesso produto ON (produto.codplano = item.cd_plano)\n"+
      "WHERE\n"+
      "plano.cd_plano_principal = ultimoPlanoV\n"+
      "AND (UPPER(produto.descricao) LIKE '%TELA%'\n"+
      "OR UPPER(produto.descricao) LIKE '%CDN%')\n"+
      ") IS FALSE AND\n"+
      "exists(\n"+
      "SELECT\n"+
      "produto.descricao\n"+
      "FROM\n"+
      "mk_crm_produtos plano\n"+
      "INNER JOIN mk_crm_produtos_composicao item ON (item.cd_produto = plano.codcrmproduto)\n"+
      "INNER JOIN mk_planos_acesso produto ON (produto.codplano = item.cd_plano)\n"+
      "WHERE\n"+
      "plano.cd_plano_principal = ultimoPlanoN\n"+
      "AND (UPPER(produto.descricao) LIKE '%TELA%'\n"+
      "OR UPPER(produto.descricao) LIKE '%CDN%')\n"+
      ") IS TRUE THEN\n"+
      "case\n"+
      "WHEN codsetor IN (11,13,14) THEN $21\n"+
      "WHEN codsetor = 15 THEN $22\n"+
      "WHEN codsetor = 32 THEN $23\n"+
      "ELSE '0'\n"+
      "END\n"+
      "ELSE '0'\n"+
      "end\n"+
      "end\n"+
			"from\n"+
			"mk_faturas fatura\n"+
			"where\n"+
			"fatura.codfatura = fat\n"+
      ")\n"+
      "end valor_tv,\n"+
      "CASE\n"+
      "WHEN (\n"+
      "SELECT\n"+
      "case\n"+
      "WHEN fatura.liquidado = 'N' THEN 'Cliente ainda não pagou'\n"+
      "ELSE\n"+
      "case\n"+
      "WHEN (\n"+
      "SELECT\n"+
      "produto.descricao\n"+
      "FROM\n"+
      "mk_crm_produtos plano\n"+
      "INNER JOIN mk_crm_produtos_composicao item ON (item.cd_produto = plano.codcrmproduto)\n"+
      "INNER JOIN mk_planos_acesso produto ON (produto.codplano = item.cd_plano)\n"+
      "WHERE\n"+
      "plano.cd_plano_principal = planoC\n"+
      "AND (UPPER(produto.descricao) LIKE '%TELEFONIA%'\n"+
      "OR UPPER(produto.descricao) LIKE '%DDR%')\n"+
      ") IS NOT NULL THEN '0'\n"+
      "ELSE '0'\n"+
      "end\n"+
      "end\n"+
      "from\n"+
      "mk_faturas fatura\n"+
      "where\n"+
      "fatura.codfatura = fat\n"+
			") IS NULL THEN 'Cliente não possui faturas'\n"+
      "else\n"+
      "(\n"+
			"SELECT\n"+
      "case\n"+
      "WHEN fatura.liquidado = 'N' THEN 'Cliente ainda não pagou'\n"+
      "ELSE\n"+
      "case\n"+
      "WHEN\n"+
      "exists(\n"+
      "SELECT\n"+
      "produto.descricao\n"+
      "FROM\n"+
      "mk_crm_produtos plano\n"+
      "INNER JOIN mk_crm_produtos_composicao item ON (item.cd_produto = plano.codcrmproduto)\n"+
      "INNER JOIN mk_planos_acesso produto ON (produto.codplano = item.cd_plano)\n"+
      "WHERE\n"+
      "plano.cd_plano_principal = ultimoPlanoV\n"+
      "AND (UPPER(produto.descricao) LIKE '%TELEFONIA%'\n"+
      "OR UPPER(produto.descricao) LIKE '%DDR%')\n"+
      ") IS FALSE AND\n"+
      "exists(\n"+
      "SELECT\n"+
      "produto.descricao\n"+
      "FROM\n"+
      "mk_crm_produtos plano\n"+
      "INNER JOIN mk_crm_produtos_composicao item ON (item.cd_produto = plano.codcrmproduto)\n"+
      "INNER JOIN mk_planos_acesso produto ON (produto.codplano = item.cd_plano)\n"+
      "WHERE\n"+
      "plano.cd_plano_principal = ultimoPlanoN\n"+
      "AND (UPPER(produto.descricao) LIKE '%TELEFONIA%'\n"+
      "OR UPPER(produto.descricao) LIKE '%DDR%')\n"+
      ") IS TRUE THEN\n"+
      "CASE\n"+
      "WHEN ultimoPlanoNDesc ILIKE '%r-ipca%' THEN '0'\n"+
      "ELSE\n"+
      "case\n"+
      "WHEN codsetor IN (11,13,14) THEN $24\n"+
      "WHEN codsetor = 15 THEN $25\n"+
      "WHEN codsetor = 32 THEN $26\n"+
      "ELSE '0'\n"+
      "END\n"+
      "end\n"+
      "ELSE '0'\n"+
      "end\n"+
      "end\n"+
			"from\n"+
			"mk_faturas fatura\n"+
			"where\n"+
			"fatura.codfatura = fat\n"+
      ")\n"+
      "end valor_telefonia,\n"+
      "CASE\n"+
      "WHEN (\n"+
      "SELECT\n"+
      "case\n"+
      "WHEN fatura.liquidado = 'N' THEN 'Cliente ainda não pagou'\n"+
      "ELSE\n"+
      "case\n"+
      "when\n"+
      "exists(\n"+
      "select\n"+
      "trans.codtransacaocartao\n"+
      "from\n"+
      "mk_transacoes_cartao_geradas trans\n"+
      "WHERE\n"+
      "trans.cd_fatura = fatura.codfatura\n"+
      "AND trans.excluida = 'N'\n"+
      ") IS TRUE THEN '0'\n"+
      "ELSE '0'\n"+
      "END\n"+
      "end\n"+
      "from\n"+
      "mk_faturas fatura\n"+
      "where\n"+
      "fatura.codfatura = fat\n"+
			") IS NULL THEN 'Cliente não possui faturas'\n"+
      "else\n"+
      "(\n"+
			"SELECT\n"+
      "case\n"+
      "WHEN fatura.liquidado = 'N' THEN 'Cliente ainda não pagou'\n"+
      "ELSE\n"+
      "case\n"+
      "when\n"+
      "exists(\n"+
      "select\n"+
      "trans.codtransacaocartao\n"+
      "from\n"+
      "mk_transacoes_cartao_geradas trans\n"+
      "WHERE\n"+
      "trans.cd_fatura = fatura.codfatura\n"+
      "AND trans.excluida = 'N'\n"+
      "AND trans.dh >= (ultimo - INTERVAL '5 minutes')\n"+
      ") IS TRUE THEN\n"+
      "case\n"+
      "WHEN codsetor IN (11,13,14) THEN $27\n"+
      "WHEN codsetor = 15 THEN $28\n"+
      "WHEN codsetor = 32 THEN $29\n"+
      "ELSE '0'\n"+
      "end\n"+
      "ELSE '0'\n"+
      "END\n"+
      "end\n"+
			"from\n"+
			"mk_faturas fatura\n"+
			"where\n"+
			"fatura.codfatura = fat\n"+
      ")\n"+
      "end valor_recorrente,\n"+
      "CASE\n"+
      "WHEN (\n"+
			"SELECT\n"+
      "case\n"+
      "WHEN fatura.liquidado = 'N' THEN 'Cliente ainda não pagou'\n"+
      "ELSE 'Cliente pagou a 1ª Mensalidade'\n"+
      "end\n"+
			"from\n"+
      "mk_faturas fatura\n"+
			"where\n"+
      "fatura.codfatura = fat\n"+
			") IS NULL THEN 'Cliente não possui faturas'\n"+
      "ELSE\n"+
      "(\n"+
			"SELECT\n"+
      "case\n"+
      "WHEN fatura.liquidado = 'N' THEN 'Cliente ainda não pagou'\n"+
      "ELSE\n"+
      "CASE\n"+
      "WHEN codsetor IN (11,13,14) THEN\n"+
      "case\n"+
      "WHEN ultimoPlanoVDesc ILIKE '%r-ipca%' then\n"+
      "case\n"+
      "WHEN (penultimoPlanoN = ultimoPlanoV) AND ((ultimoPlanoNmensal - penultimoPlanoVmensal) = 0) THEN\n"+
      "case\n"+
      "when ultimoPlanoNDesc ILIKE '%r-ipca%' THEN '0'\n"+
      "else (ultimoPlanoNmensal * $30)||''\n"+
      "end\n"+
      "WHEN (penultimoPlanoN = ultimoPlanoV) AND ((ultimoPlanoNmensal - penultimoPlanoVmensal) > 0) THEN\n"+
      "case\n"+
      "when ultimoPlanoNDesc ILIKE '%r-ipca%' THEN '0'\n"+
      "else ((ultimoPlanoNmensal - penultimoPlanoVmensal) * $31)||''\n"+
      "end\n"+
      "WHEN (penultimoPlanoN = ultimoPlanoV) AND ((ultimoPlanoNmensal - penultimoPlanoVmensal) < 0) THEN '0'\n"+
      "END\n"+
      "else\n"+
      "case\n"+
      "WHEN ((ultimoPlanoNmensal - ultimoPlanoVmensal) = 0) THEN\n"+
      "case\n"+
      "when ultimoPlanoNDesc ILIKE '%r-ipca%' THEN '0'\n"+
      "else (ultimoPlanoNmensal * $30)||''\n"+
      "end\n"+
      "WHEN ((ultimoPlanoNmensal - ultimoPlanoVmensal) > 0) THEN\n"+
      "case\n"+
      "when ultimoPlanoNDesc ILIKE '%r-ipca%' THEN '0'\n"+
      "ELSE ((ultimoPlanoNmensal - ultimoPlanoVmensal) * $31)||''\n"+
      "end\n"+
      "WHEN ((ultimoPlanoNmensal - ultimoPlanoVmensal) < 0) THEN '0'\n"+
      "END\n"+
      "END\n"+
      "WHEN codsetor = 15 THEN\n"+
      "case\n"+
      "WHEN ultimoPlanoVDesc ILIKE '%r-ipca%' then\n"+
      "case\n"+
      "WHEN (penultimoPlanoN = ultimoPlanoV) AND ((ultimoPlanoNmensal - penultimoPlanoVmensal) = 0) THEN\n"+
      "case\n"+
      "when ultimoPlanoNDesc ILIKE '%r-ipca%' THEN '0'\n"+
      "else $32\n"+
      "end\n"+
      "WHEN (penultimoPlanoN = ultimoPlanoV) AND ((ultimoPlanoNmensal - penultimoPlanoVmensal) > 0) THEN\n"+
      "case\n"+
      "when ultimoPlanoNDesc ILIKE '%r-ipca%' THEN '0'\n"+
      "ELSE $33\n"+
      "end\n"+
      "WHEN (penultimoPlanoN = ultimoPlanoV) AND ((ultimoPlanoNmensal - penultimoPlanoVmensal) < 0) THEN '0'\n"+
      "END\n"+
      "else\n"+
      "case\n"+
      "WHEN ((ultimoPlanoNmensal - ultimoPlanoVmensal) = 0) THEN\n"+
      "case\n"+
      "when ultimoPlanoNDesc ILIKE '%r-ipca%' THEN '0'\n"+
      "ELSE $32\n"+
      "end\n"+
      "WHEN ((ultimoPlanoNmensal - ultimoPlanoVmensal) > 0) THEN\n"+
      "case\n"+
      "when ultimoPlanoNDesc ILIKE '%r-ipca%' THEN '0'\n"+
      "ELSE $33\n"+
      "end\n"+
      "WHEN ((ultimoPlanoNmensal - ultimoPlanoVmensal) < 0) THEN '0'\n"+
      "END\n"+
      "end\n"+
      "WHEN codsetor = 32 THEN\n"+
      "case\n"+
      "WHEN ultimoPlanoVDesc ILIKE '%r-ipca%' then\n"+
      "case\n"+
      "WHEN (penultimoPlanoN = ultimoPlanoV) AND ((ultimoPlanoNmensal - penultimoPlanoVmensal) = 0) THEN\n"+
      "case\n"+
      "when ultimoPlanoNDesc ILIKE '%r-ipca%' THEN '0'\n"+
      "ELSE $34\n"+
      "end\n"+
      "WHEN (penultimoPlanoN = ultimoPlanoV) AND ((ultimoPlanoNmensal - penultimoPlanoVmensal) > 0) THEN\n"+
      "case\n"+
      "when ultimoPlanoNDesc ILIKE '%r-ipca%' THEN '0'\n"+
      "ELSE $35\n"+
      "end\n"+
      "WHEN (penultimoPlanoN = ultimoPlanoV) AND ((ultimoPlanoNmensal - penultimoPlanoVmensal) < 0) THEN '0'\n"+
      "END\n"+
      "else\n"+
      "case\n"+
      "WHEN ((ultimoPlanoNmensal - ultimoPlanoVmensal) = 0) THEN\n"+
      "case\n"+
      "when ultimoPlanoNDesc ILIKE '%r-ipca%' THEN '0'\n"+
      "ELSE $34\n"+
      "end\n"+
      "WHEN ((ultimoPlanoNmensal - ultimoPlanoVmensal) > 0) THEN\n"+
      "case\n"+
      "when ultimoPlanoNDesc ILIKE '%r-ipca%' THEN '0'\n"+
      "ELSE $35\n"+
      "end\n"+
      "WHEN ((ultimoPlanoNmensal - ultimoPlanoVmensal) < 0) THEN '0'\n"+
      "END\n"+
      "end\n"+
      "ELSE '0'\n"+
      "END\n"+
      "end\n"+
			"from\n"+
      "mk_faturas fatura\n"+
			"where\n"+
      "fatura.codfatura = fat\n"+
      ")\n"+
      "end comissao_venda,\n"+
      "CASE\n"+
      "WHEN (\n"+
      "SELECT\n"+
      "case\n"+
      "WHEN fatura.liquidado = 'N' THEN 'Cliente ainda não pagou'\n"+
      "ELSE (\n"+
      "SELECT\n"+
      "REPLACE (plano.vlr_mensalidade||'','.',',')\n"+
      "from\n"+
      "mk_planos_acesso plano\n"+
      "where\n"+
      "planoC = plano.codplano\n"+
      ")\n"+
      "END\n"+
      "from\n"+
      "mk_faturas fatura\n"+
      "where\n"+
      "fatura.codfatura = fat\n"+
			") IS NULL THEN 'Cliente não possui faturas'\n"+
      "ELSE\n"+
      "(\n"+
			"SELECT\n"+
      "case\n"+
      "WHEN fatura.liquidado = 'N' THEN 'Cliente ainda não pagou'\n"+
      "ELSE\n"+
      "CASE\n"+
      "WHEN vencimento = $13 THEN\n"+
      "case\n"+
      "WHEN codsetor IN (11,13,14) THEN $36\n"+
      "WHEN codsetor = 15 THEN $37\n"+
      "WHEN codsetor = 32 THEN $38\n"+
      "ELSE '0'\n"+
      "end\n"+
      "WHEN vencimento = $14 THEN\n"+
      "case\n"+
      "WHEN codsetor IN (11,13,14) THEN $39\n"+
      "WHEN codsetor = 15 THEN $40\n"+
      "WHEN codsetor = 32 THEN $41\n"+
      "ELSE '0'\n"+
      "end\n"+
      "ELSE '0'\n"+
      "end\n"+
      "END\n"+
			"from\n"+
			"mk_faturas fatura\n"+
			"where\n"+
			"fatura.codfatura = fat\n"+
      ")\n"+
      "END dia_02_04\n"+
      "from\n"+
      "(\n"+
      "SELECT distinct\n"+
      "cliente.codpessoa codigo,\n"+
      "cliente.nome_razaosocial cliente,\n"+
      "cidade.cidade,\n"+
      "contrato.codcontrato contrato,\n"+
      "contrato.plano_acesso planoC,\n"+
      "ultimo.codplanoN ultimoPlanoN,\n"+
      "ultimo.planoNdesc ultimoPlanoNDesc,\n"+
      "ultimo.planoNmensal ultimoPlanoNmensal,\n"+
      "ultimo.codplanoV ultimoPlanoV,\n"+
      "ultimo.planoVdesc ultimoPlanoVDesc,\n"+
      "ultimo.planoVmensal ultimoPlanoVmensal,\n"+
      "penultimo.codplanoN penultimoPlanoN,\n"+
      "penultimo.planoNdesc penultimoPlanoNDesc,\n"+
      "penultimo.planoNmensal penultimoPlanoNmensal,\n"+
      "penultimo.codplanoV penultimoPlanoV,\n"+
      "penultimo.planoVdesc penultimoPlanoVDesc,\n"+
      "penultimo.planoVmensal penultimoPlanoVmensal,\n"+
      "ultimo.dt_hr::date ultimo,\n"+
      "CASE\n"+
      "WHEN ultimo.planoVdesc ILIKE '%r-ipca%' then\n"+
      "case\n"+
			"WHEN (penultimo.codplanoN = ultimo.codplanoV) AND ((ultimo.planoNmensal - penultimo.planoVmensal) = 0) THEN 'Renovação'\n"+
			"WHEN (penultimo.codplanoN = ultimo.codplanoV) AND ((ultimo.planoNmensal - penultimo.planoVmensal) > 0) THEN 'Upgrade'\n"+
			"WHEN (penultimo.codplanoN = ultimo.codplanoV) AND ((ultimo.planoNmensal - penultimo.planoVmensal) < 0) THEN 'Downgrade'\n"+
      "end\n"+
      "else\n"+
      "case\n"+
			"WHEN ((ultimo.planoNmensal - ultimo.planoVmensal) = 0) THEN 'Renovação'\n"+
			"WHEN ((ultimo.planoNmensal - ultimo.planoVmensal) > 0) THEN 'Upgrade'\n"+
			"WHEN ((ultimo.planoNmensal - ultimo.planoVmensal) < 0) THEN 'Downgrade'\n"+
      "end\n"+
      "END AS operacao,\n"+
      "usuarios.usr_codigo codoperador,\n"+
      "usuarios.usr_login operador,\n"+
      "cidadeope.cidade cidadeope,\n"+
      "perfis.codperfilacessomaster codsetor,\n"+
      "perfis.descricao setor,\n"+
      "(\n"+
      "SELECT\n"+
      "min(faturas.codfatura)\n"+
      "from\n"+
      "mk_faturas faturas\n"+
      "INNER JOIN mk_faturas_historicos histos ON (histos.cd_fatura = faturas.codfatura)\n"+
      "where\n"+
      "faturas.cd_pessoa = cliente.codpessoa and\n"+
      "faturas.excluida = 'N' and\n"+
      "faturas.suspenso = 'N' and\n"+
      "faturas.tipo = 'R' and\n"+
      "faturas.data_vencimento =\n"+
      "(\n"+
			"select\n"+
      "min(fatura.data_vencimento)\n"+
			"from\n"+
      "mk_faturas fatura\n"+
			"where\n"+
      "fatura.cd_pessoa = faturas.cd_pessoa and\n"+
      "fatura.excluida = 'N' and\n"+
      "fatura.suspenso = 'N' and\n"+
      "fatura.tipo = 'R' and\n"+
      "fatura.data_vencimento >= ultimo.dt_hr::date\n"+
      ")\n"+
      ") fat,\n"+
      "(\n"+
      "select\n"+
      "dia.dia_vcto\n"+
      "from\n"+
      "mk_faturamentos_regras dia\n"+
      "where\n"+
      "dia.codfaturamentoregra = contrato.cd_regra_faturamento\n"+
      ") vencimento\n"+
      "FROM\n"+
      "mk_contratos contrato\n"+
      "INNER JOIN mk_pessoas cliente ON (cliente.codpessoa = contrato.cliente)\n"+
      "INNER JOIN mk_cidades cidade ON (cidade.codcidade = cliente.codcidade)\n"+
      "LEFT JOIN (\n"+
      "SELECT\n"+
      "clientes.codpessoa,\n"+
      "contratos.codcontrato,\n"+
      "hists.dt_hr,\n"+
      "planoVs.codplano codplanoV,\n"+
      "planoVs.descricao planoVdesc,\n"+
      "planoVs.vlr_mensalidade planoVmensal,\n"+
      "planoNs.codplano codplanoN,\n"+
      "planoNs.descricao planoNdesc,\n"+
      "planoNs.vlr_mensalidade planoNmensal\n"+
      "from\n"+
      "mk_contratos contratos\n"+
      "INNER JOIN mk_contratos_historicos hists ON (hists.cd_contrato = contratos.codcontrato AND hists.cd_operacao IN (4,5))\n"+
      "INNER JOIN mk_pessoas clientes ON (clientes.codpessoa = contratos.cliente)\n"+
      "INNER JOIN mk_planos_acesso planoVs ON (planoVs.codplano = hists.cd_plano_velho)\n"+
      "INNER JOIN mk_planos_acesso planoNs ON (planoNs.codplano = hists.cd_plano_novo)\n"+
      "WHERE\n"+
      "hists.dt_hr =\n"+
      "(\n"+
			"SELECT distinct\n"+
      "MAX(histss.dt_hr)\n"+
			"from\n"+
      "mk_contratos contratoss\n"+
      "INNER JOIN mk_contratos_historicos histss ON (histss.cd_contrato = contratoss.codcontrato AND histss.cd_operacao IN (4,5))\n"+
      "INNER JOIN mk_pessoas clientess ON (clientess.codpessoa = contratoss.cliente)\n"+
      "INNER JOIN fr_usuario usuarioss ON (usuarioss.usr_login = histss.operador and usuarioss.cd_perfil_acesso||'' in ($19))\n"+
			"WHERE\n"+
      "clientess.codpessoa = clientes.codpessoa\n"+
      ")\n"+
      ") as ultimo ON (ultimo.codpessoa = cliente.codpessoa AND ultimo.codcontrato = contrato.codcontrato)\n"+
      "LEFT JOIN\n"+
      "(\n"+
      "SELECT\n"+
      "clientes.codpessoa,\n"+
      "contratos.codcontrato,\n"+
      "hists.dt_hr,\n"+
      "planoVs.codplano codplanoV,\n"+
      "planoVs.descricao planoVdesc,\n"+
      "planoVs.vlr_mensalidade planoVmensal,\n"+
      "planoNs.codplano codplanoN,\n"+
      "planoNs.descricao planoNdesc,\n"+
      "planoNs.vlr_mensalidade planoNmensal\n"+
      "from\n"+
      "mk_contratos contratos\n"+
      "INNER JOIN mk_contratos_historicos hists ON (hists.cd_contrato = contratos.codcontrato)\n"+
      "INNER JOIN mk_pessoas clientes ON (clientes.codpessoa = contratos.cliente)\n"+
      "LEFT JOIN mk_planos_acesso planoVs ON (planoVs.codplano = hists.cd_plano_velho)\n"+
      "LEFT JOIN mk_planos_acesso planoNs ON (planoNs.codplano = hists.cd_plano_novo)\n"+
      "WHERE\n"+
      "hists.dt_hr =\n"+
      "(\n"+
			"SELECT\n"+
      "MAX(histss.dt_hr)\n"+
			"from\n"+
      "mk_contratos contratoss\n"+
      "INNER JOIN mk_contratos_historicos histss ON (histss.cd_contrato = contratoss.codcontrato AND histss.cd_operacao IN (4,5))\n"+
      "INNER JOIN mk_pessoas clientess ON (clientess.codpessoa = contratoss.cliente)\n"+
			"WHERE\n"+
      "histss.dt_hr <\n"+
      "(\n"+
      "SELECT distinct\n"+
      "MAX(histss1.dt_hr)\n"+
      "from\n"+
      "mk_contratos contratoss1\n"+
      "INNER JOIN mk_contratos_historicos histss1 ON (histss1.cd_contrato = contratoss1.codcontrato AND histss1.cd_operacao IN (4,5))\n"+
      "INNER JOIN mk_pessoas clientess1 ON (clientess1.codpessoa = contratoss1.cliente)\n"+
      "WHERE\n"+
      "clientess1.codpessoa = clientess.codpessoa\n"+
      ")\n"+
      "and\n"+
      "clientess.codpessoa = clientes.codpessoa\n"+
      ")\n"+
			"AND hists.codcontratohist =\n"+
      "(\n"+
			"SELECT\n"+
      "max(histss1.codcontratohist)\n"+
			"from\n"+
      "mk_contratos_historicos histss1\n"+
			"where\n"+
      "histss1.cd_contrato = contratos.codcontrato and\n"+
      "histss1.dt_hr = \n"+
			"(\n"+
      "SELECT\n"+
      "MAX(histss.dt_hr)\n"+
      "FROM\n"+
      "mk_contratos contratoss\n"+
      "INNER JOIN mk_contratos_historicos histss ON (histss.cd_contrato = contratoss.codcontrato AND histss.cd_operacao IN (4,5))\n"+
      "INNER JOIN mk_pessoas clientess ON (clientess.codpessoa = contratoss.cliente)\n"+
      "WHERE\n"+
      "histss.dt_hr <\n"+
      "(\n"+
      "SELECT distinct\n"+
      "MAX(histss1.dt_hr)\n"+
      "from\n"+
      "mk_contratos contratoss1\n"+
      "INNER JOIN mk_contratos_historicos histss1 ON (histss1.cd_contrato = contratoss1.codcontrato AND histss1.cd_operacao IN (4,5))\n"+
      "INNER JOIN mk_pessoas clientess1 ON (clientess1.codpessoa = contratoss1.cliente)\n"+
      "WHERE\n"+
      "clientess1.codpessoa = clientess.codpessoa\n"+
      ")\n"+
      "and\n"+
      "clientess.codpessoa = clientes.codpessoa\n"+
			")\n"+
      ")\n"+
      ") as penultimo ON (penultimo.codpessoa = cliente.codpessoa AND penultimo.codcontrato = contrato.codcontrato)\n"+
      "LEFT JOIN mk_contratos_historicos hist ON (hist.cd_contrato = contrato.codcontrato AND hist.dt_hr = ultimo.dt_hr)\n"+
      "LEFT JOIN fr_usuario usuarios ON (usuarios.usr_login = hist.operador)\n"+
      "inner JOIN mk_usuarios_perfil_acesso_master perfis ON (perfis.codperfilacessomaster = usuarios.cd_perfil_acesso)\n"+
      "LEFT JOIN mk_crm_operadores operador ON (operador.cd_operador = usuarios.usr_codigo)\n"+
      "LEFT JOIN mk_pessoas operadorcad ON (operadorcad.codpessoa = operador.codpessoa)\n"+
      "LEFT JOIN mk_cidades cidadeope ON (cidadeope.codcidade = operadorcad.codcidade)\n"+
      "WHERE\n"+
      "ultimo.dt_hr::DATE BETWEEN $17 and $18\n"+
      "AND contrato.cancelado = 'N'\n"+
      "AND operador.perfil_ativo = 'S'\n"+
      "AND cidadeope.codcidade||'' IN ($20)\n"+
      ") AS tabela\n"+
      ") AS tb\n"+
      "ORDER BY 3,6,13";
      //! FIM DO SQL
      /*
      TODO $1 - vendaTVFrente - VALOR PADRÃO: 0
      TODO $2 - vendaTVTele - VALOR PADRÃO: 0
      TODO $3 - vendaTVPAP - VALOR PADRÃO: 0
      TODO $4 - vendaTelFrente - VALOR PADRÃO: 3
      TODO $5 - vendaTelTele - VALOR PADRÃO: 0
      TODO $6 - vendaTelPAP - VALOR PADRÃO: 6
      TODO $7 - vendaRecorrenteFrente - VALOR PADRÃO: 4
      TODO $8 - vendaRecorrenteTele - VALOR PADRÃO: 3
      TODO $9 - vendaRecorrentePAP - VALOR PADRÃO: 3
      TODO $10 - vendaPorcentagemFrente - VALOR PADRÃO: 0.15
      TODO $11 - vendaPorcentagemTele - VALOR PADRÃO: 0.15
      TODO $12 - vendaPorcentagemPAP - VALOR PADRÃO: 0.08
      TODO $13 - Dia01 - VALOR PADRÃO: 2
      TODO $14 - Dia02 - VALOR PADRÃO: 4
      TODO $15 - vendaDia01 - VALOR PADRÃO: 6
      TODO $16 - vendaDia02 - VALOR PADRÃO: 3
      TODO $17 - dataInicio
      TODO $18 - dataFim
      TODO $19 - setores - VALOR PADRÃO: 11,13,14,15,32
      TODO $20 - cidadesoperadores - VALOR PADRÃO: 96,105,242,67,61,19,286,57,9,5,537,183,217,191,213,538
      TODO $21 - renovacaoTVFrente - VALOR PADRÃO: 0
      TODO $22 - renovacaoTVTele - VALOR PADRÃO: 2
      TODO $23 - renovacaoTVPAP - VALOR PADRÃO: 6
      TODO $24 - renovacaoTelFrente - VALOR PADRÃO: 3
      TODO $25 - renovacaoTelTele - VALOR PADRÃO: 3
      TODO $26 - renovacaoTelPAP - VALOR PADRÃO: 6
      TODO $27 - renovacaoRecorrenteFrente - VALOR PADRÃO: 4
      TODO $28 - renovacaoRecorrenteTele - VALOR PADRÃO: 3
      TODO $29 - renovacaoRecorrentePAP - VALOR PADRÃO: 6
      TODO $30 - renovacaoPorcentagemFrenteRenovacao - VALOR PADRÃO: 0.02
      TODO $31 - renovacaoPorcentagemFrenteUpgrade - VALOR PADRÃO: 0.5
      TODO $32 - renovacaoPorcentagemTeleRenovacao - VALOR PADRÃO: 3
      TODO $33 - renovacaoPorcentagemTeleUpgrade - VALOR PADRÃO: 4
      TODO $34 - renovacaoPorcentagemPAPRenovacao - VALOR PADRÃO: 6
      TODO $35 - renovacaoPorcentagemPAPUpgrade - VALOR PADRÃO: 6
      TODO $36 - renovacaoDia01Frente - VALOR PADRÃO: 0
      TODO $37 - renovacaoDia01Tele - VALOR PADRÃO: 0
      TODO $38 - renovacaoDia01PAP - VALOR PADRÃO: 0
      TODO $39 - renovacaoDia02Frente - VALOR PADRÃO: 0
      TODO $40 - renovacaoDia02Tele - VALOR PADRÃO: 0
      TODO $41 - renovacaoDia02PAP - VALOR PADRÃO: 0
      */
      const values = [ vendaTVFrente, vendaTVTele, vendaTVPAP, vendaTelFrente, vendaTelTele, vendaTelPAP, vendaRecorrenteFrente, vendaRecorrenteTele, vendaRecorrentePAP, vendaPorcentagemFrente, vendaPorcentagemTele, vendaPorcentagemPAP, Dia01, Dia02, vendaDia01, vendaDia02, dataInicio, dataFim, setores, cidadesoperadores, renovacaoTVFrente, renovacaoTVTele, renovacaoTVPAP, renovacaoTelFrente, renovacaoTelTele, renovacaoTelPAP, renovacaoRecorrenteFrente, renovacaoRecorrenteTele, renovacaoRecorrentePAP, renovacaoPorcentagemFrenteRenovacao, renovacaoPorcentagemFrenteUpgrade, renovacaoPorcentagemTeleRenovacao, renovacaoPorcentagemTeleUpgrade, renovacaoPorcentagemPAPRenovacao, renovacaoPorcentagemPAPUpgrade, renovacaoDia01Frente, renovacaoDia01Tele, renovacaoDia01PAP, renovacaoDia02Frente, renovacaoDia02Tele, renovacaoDia02PAP ];
      const result = await db.query(query, values);
      return result.rows;
    } catch (error) {
      throw error;
    }
  },
  getAllQntContratos: async (diasVencimento, dataInicio, dataFim) => {
    try {
      const query =
      "SELECT vencimento.dia_vcto vencimento,\n"+
      "count(contra.codcontrato) qnt\n"+
      "FROM\n"+
      "mk_faturamentos_regras vencimento\n"+
      "left JOIN (\n"+
      "SELECT distinct\n"+
      "contrato.cd_regra_faturamento,\n"+
      "contrato.codcontrato\n"+
      "FROM\n"+
      "mk_contratos contrato\n"+
      "WHERE\n"+
      "contrato.adesao between $2 and $3\n"+
      ") contra ON (contra.cd_regra_faturamento = vencimento.codfaturamentoregra)\n"+
      "WHERE\n"+
      "vencimento.dia_vcto||'' IN ($1)\n"+
      "GROUP BY 1\n"+
      "ORDER BY 1 ASC";
      const values = [diasVencimento,dataInicio,dataFim];
      const result = await db.query(query, values);
      return result.rows;
    } catch (error) {
      throw error;
    }
  },
  getClientWithCelNumer: async (numeroCel, dataInicio, dataFim) => {
    try {
      const query =
      "SELECT DISTINCT\n"+
      "CASE\n"+
      "WHEN length(SMS.DESTINATARIO) = 11 THEN '(' || LEFT(SMS.DESTINATARIO, 2) || ') ' || SUBSTRING(SMS.DESTINATARIO,3,5) || '-' || SUBSTRING(SMS.DESTINATARIO,8,4)\n"+
      "WHEN length(SMS.DESTINATARIO) = 10 THEN '(' || LEFT(SMS.DESTINATARIO, 2) || ') 9' || SUBSTRING(SMS.DESTINATARIO,3,4) || '-' || SUBSTRING(SMS.DESTINATARIO,7,4)\n"+
      "ELSE SMS.DESTINATARIO\n"+
      "end nro,\n"+
      "CLIENTE.NOME_RAZAOSOCIAL nome,\n"+
      "SMS.dt_hr \"data\",\n"+
      "SMS.msg\n"+
      "FROM\n"+
      "MK_SMS_03_HISTORICO SMS\n"+
      "INNER JOIN MK_PESSOAS CLIENTE ON (CLIENTE.CODPESSOA = SMS.CD_CLIENTE)\n"+
      "WHERE\n"+
      "SMS.DESTINATARIO like $1\n"+
      "AND DT_HR BETWEEN $2 AND $3\n"+
      "ORDER BY 3 ASC";
      const values = [numeroCel,dataInicio,dataFim];
      const result = await db.query(query, values);
      return result.rows;
    } catch (error) {
      throw error;
    }
  },
  getQuantityContratsActives: async (dataFim) => {
    try {
      const query =
      "SELECT\n"+
      "criados.nomes endereco,\n"+
      "criados.quantidade criados,\n"+
      "cancelados.quantidade cancelados,\n"+
      "(criados.quantidade - cancelados.quantidade) ativos\n"+
      "FROM (\n"+
      "SELECT DISTINCT\n"+
      "count(contrato.codcontrato) quantidade,\n"+
      "cidade.codcidade endereco,\n"+
      "cidade.cidade nomes\n"+
      "FROM mk_contratos contrato\n"+
      "INNER JOIN mk_pessoas cliente ON (cliente.codpessoa = contrato.cliente)\n"+
      "inner join MK_CIDADES CIDADE ON (cidade.codcidade = cliente.codcidade)\n"+
      "INNER JOIN MK_BAIRROS BAIRRO ON (cliente.codbairro = bairro.codbairro and bairro.codbairro NOT IN (16233, 16234))\n"+
      "WHERE CIDADE.CODCIDADE IN (96, 242, 19, 5, 9, 61, 537, 538, 213, 217, 286, 191, 57, 183, 67)\n"+
      "AND contrato.adesao BETWEEN '2010-01-01' AND $1\n"+
      "GROUP BY 2,3\n"+
      "UNION\n"+
      "SELECT DISTINCT\n"+
      "COUNT(contrato.codcontrato) quantidade,\n"+
      "bairro.codbairro endereco,\n"+
      "bairro.bairro nomes\n"+
      "FROM mk_contratos contrato\n"+
      "INNER JOIN mk_pessoas cliente ON (cliente.codpessoa = contrato.cliente)\n"+
      "inner join MK_CIDADES CIDADE ON (cidade.codcidade = cliente.codcidade)\n"+
      "INNER JOIN MK_BAIRROS BAIRRO ON (cliente.codbairro = bairro.codbairro and bairro.codbairro IN (16233, 16234))\n"+
      "WHERE CIDADE.CODCIDADE IN (96, 242, 19, 5, 9, 61, 537, 538, 213, 217, 286, 191, 57, 183, 67)\n"+
      "AND contrato.adesao BETWEEN '2010-01-01' AND $1\n"+
      "GROUP BY 2,3\n"+
      ") AS criados,\n"+
      "(\n"+
      "SELECT DISTINCT\n"+
      "count(contrato.codcontrato) quantidade,\n"+
      "cidade.codcidade endereco,\n"+
      "cidade.cidade nomes\n"+
      "FROM mk_contratos contrato\n"+
      "INNER JOIN mk_pessoas cliente ON (cliente.codpessoa = contrato.cliente)\n"+
      "inner join MK_CIDADES CIDADE ON (cidade.codcidade = cliente.codcidade)\n"+
      "INNER JOIN MK_BAIRROS BAIRRO ON (cliente.codbairro = bairro.codbairro and bairro.codbairro NOT IN (16233, 16234))\n"+
      "WHERE CIDADE.CODCIDADE IN (96, 242, 19, 5, 9, 61, 537, 538, 213, 217, 286, 191, 57, 183, 67)\n"+
      "AND contrato.cancelado = 'S'\n"+
      "AND contrato.dt_cancelamento BETWEEN '2010-01-01' AND $1\n"+
      "GROUP BY 2,3\n"+
      "UNION\n"+
      "SELECT DISTINCT\n"+
      "count(contrato.codcontrato) quantidade,\n"+
      "bairro.codbairro endereco,\n"+
      "bairro.bairro nomes\n"+
      "FROM mk_contratos contrato\n"+
      "INNER JOIN mk_pessoas cliente ON (cliente.codpessoa = contrato.cliente)\n"+
      "inner join MK_CIDADES CIDADE ON (cidade.codcidade = cliente.codcidade)\n"+
      "INNER JOIN MK_BAIRROS BAIRRO ON (cliente.codbairro = bairro.codbairro and bairro.codbairro IN (16233, 16234))\n"+
      "WHERE CIDADE.CODCIDADE IN (96, 242, 19, 5, 9, 61, 537, 538, 213, 217, 286, 191, 57, 183, 67)\n"+
      "AND contrato.cancelado = 'S'\n"+
      "AND contrato.dt_cancelamento BETWEEN '2010-01-01' AND $1\n"+
      "GROUP BY 2,3\n"+
      ") AS cancelados\n"+
      "WHERE criados.endereco = cancelados.endereco\n"+
      "order BY 1";
      const values = [dataFim];
      const result = await db.query(query, values);
      return result.rows;
    } catch (error) {
      throw error;
    }
  },
  getAllClientsFromNAP: async (caixa) => {
    try {
      const query =
      "SELECT\n"+
      "cliente.codpessoa codigo,\n"+
      "cliente.nome_razaosocial cliente,\n"+
      "conexao.codconexao conexao,\n"+
      "caixa.identificacao caixa,\n"+
      "porta.id_porta porta\n"+
      "FROM mk_conexoes conexao\n"+
      "INNER JOIN mk_fiber_splitter splitter ON (conexao.cd_splitter = splitter.codsplitter)\n"+
      "INNER JOIN mk_fiber_caixa caixa ON (splitter.cd_caixa = caixa.codcaixa)\n"+
      "INNER JOIN mk_pessoas cliente ON (conexao.codcliente  = cliente.codpessoa)\n"+
      "INNER JOIN mk_fiber_splitter_portas porta ON (conexao.id_porta_splitter = porta.codsplitterporta)\n"+
      "WHERE caixa.identificacao LIKE $1\n"+
      "UNION\n"+
      "SELECT\n"+
      "cliente.codpessoa codigo,\n"+
      "cliente.nome_razaosocial cliente,\n"+
      "conexao.codconexao conexao,\n"+
      "caixa.identificacao caixa,\n"+
      "porta.id_porta porta\n"+
      "FROM vi_fiber_info_caixas_conexao vi_caixas\n"+
      "inner JOIN mk_conexoes conexao ON (conexao.codconexao = vi_caixas.cd_conexao)\n"+
      "inner JOIN mk_pessoas cliente ON (cliente.codpessoa = conexao.codcliente)\n"+
      "inner JOIN mk_fiber_caixa caixa ON (caixa.codcaixa = vi_caixas.cd_caixa)\n"+
      "left JOIN mk_fiber_splitter_portas porta ON (porta.codsplitterporta = vi_caixas.cd_porta_caixa)\n"+
      "WHERE caixa.identificacao LIKE $1\n"+
      "ORDER BY 4,5";
      const value = [caixa];
      const result = await db.query(query, value);
      return result.rows;
    } catch (error) {
      throw error;
    }
  },
  getAllCities: async () => {
    try {
      const query =
      "SELECT\n"+
      "codcidade,\n"+
      "cidade\n"+
      "FROM\n"+
      "mk_cidades\n"+
      "cidade\n"+
      "WHERE\n"+
      "codcidade in (96, 105, 242, 67, 61, 19, 286, 57, 9, 5, 537, 183, 217, 191, 213, 538)\n"+
      "ORDER BY 2";
      const result = await db.query(query);
      return result.rows;
    } catch (error) {
      throw error;
    }
  },
  getAllCitiesOperators: async () => {
    try {
      const query =
      "SELECT\n"+
      "usuario.usr_login usuario,\n"+
      "operadorcid.codcidade\n"+
      "FROM\n"+
      "mk_crm_operadores operador\n"+
      "INNER JOIN mk_pessoas operadorcad ON (operadorcad.codpessoa = operador.codpessoa)\n"+
      "INNER JOIN mk_cidades operadorcid ON (operadorcid.codcidade = operadorcad.codcidade)\n"+
      "LEFT JOIN fr_usuario usuario ON (usuario.usr_codigo = operador.cd_operador)\n"+
      "WHERE\n"+
      "operador.perfil_ativo = 'S'\n"+
      "ORDER BY operadorcid.cidade,2";
      const result = await db.query(query);
      return result.rows;
    } catch (error) {
      throw error;
    }
  },
  getAllSectors: async () => {
    try {
      const query =
      "SELECT\n"+
      "setor.codperfilacessomaster codsetor,\n"+
      "setor.descricao setor\n"+
      "FROM\n"+
      "mk_usuarios_perfil_acesso_master setor\n"+
      "WHERE\n"+
      "setor.codperfilacessomaster IN (11,13,14,15,32)\n"+
      "ORDER BY 2";
      const result = await db.query(query);
      return result.rows;
    } catch (error) {
      throw error;
    }
  },
  getContractByNumber: async (fixo) => {
    try {
      const query =
      "SELECT\n"+
      "pessoa.codpessoa codigo,\n"+
      "pessoa.nome_razaosocial cliente,\n"+
      "cidade.cidade,\n"+
      "contrato.codcontrato contrato,\n"+
      "CASE\n"+
      "WHEN contrato.cancelado = 'N' THEN 'Não'\n"+
      "ELSE 'Sim'\n"+
      "end cancelado,\n"+
      "COALESCE(to_char(contrato.dt_cancelamento,'DD/MM/YYYY'), 'Contrato Ativo') AS data,\n"+
      "LEFT(telefone.num_virtual,4) || '-' || RIGHT(telefone.num_virtual,4) numero\n"+
      "FROM mk_telefonia_assinante_num telefone\n"+
      "INNER JOIN mk_telefonia_assinante telefonia ON (telefone.cd_assinante = telefonia.codassinante)\n"+
      "INNER JOIN mk_pessoas pessoa ON (telefonia.cd_pessoa = pessoa.codpessoa)\n"+
      "LEFT JOIN mk_cidades cidade on (cidade.codcidade = pessoa.codcidade)\n"+
      "LEFT JOIN mk_contratos contrato ON (telefonia.cd_contrato = contrato.codcontrato)\n"+
      "WHERE telefone.num_virtual LIKE $1";
      const value = [fixo];
      const result = await db.query(query, value);
      return result.rows;
    } catch (error) {
      throw error;
    }
  },
  getProfileFromClients: async (listaClientes) => {
    try {
      const query =
      "SELECT distinct\n"+
      "cliente.codpessoa codigo,\n"+
      "cliente.nome_razaosocial cliente,\n"+
      "cidade.cidade cidade,\n"+
      "fatura.data_vencimento \"data\",\n"+
      "profile.nome_profile profile\n"+
      "FROM\n"+
      "mk_pessoas cliente\n"+
      "LEFT JOIN mk_cidades cidade ON (cidade.codcidade = cliente.codcidade)\n"+
      "LEFT JOIN mk_faturas fatura ON (fatura.cd_pessoa = cliente.codpessoa)\n"+
      "LEFT JOIN mk_contratos contrato ON (contrato.cliente = cliente.codpessoa)\n"+
      "LEFT JOIN mk_profile_pgto profile ON (profile.codprofile = fatura.cd_profile_cobranca)\n"+
      "WHERE\n"+
      "contrato.cancelado = 'N' AND\n"+
      "fatura.data_vencimento = (\n"+
      "SELECT\n"+
      "max(fat.data_vencimento)\n"+
      "FROM\n"+
      "mk_faturas fat\n"+
      "WHERE\n"+
      "fat.tipo = 'R' AND\n"+
      "fat.excluida = 'N' AND\n"+
      "fat.suspenso = 'N' AND\n"+
      "fat.cd_pessoa = cliente.codpessoa\n"+
      ") AND\n"+
      "fatura.tipo = 'R' AND\n"+
      "fatura.excluida = 'N' AND\n"+
      "fatura.suspenso = 'N' and\n"+
      "cliente.nome_razaosocial IN ($1)\n"+
      "ORDER BY 3,4,2";
      const values = [listaClientes];
      const result = await db.query(query, values);
      return result.rows;
    } catch (error) {
      throw error;
    }
  },
  getRenovationIsPossible: async (info) => {
    try {
      const query =
      "SELECT\n"+
      "CASE\n"+
      "WHEN hist.cd_operacao IN (4,5) THEN 'ERRO! Já foi realizada uma renovação para esse cliente, referente ao contrato: ' || contrato.codcontrato || ' no dia: ' || hist.dt_hr::DATE || ' às: ' || hist.dt_hr::TIME || ' hrs, pelo operador(a): ' || hist.operador || ' do setor: ' || setor.descricao\n"+
      "ELSE 'Não foi encontrato nenhum registro de Upgrade/Downgrade para o contrato: ' || contrato.codcontrato || ' nos últimos 60 dias!'\n"+
      "END validacao\n"+
      "FROM\n"+
      "mk_contratos contrato\n"+
      "INNER JOIN mk_contratos_historicos hist ON (hist.cd_contrato = contrato.codcontrato)\n"+
      "INNER JOIN mk_pessoas cliente ON (cliente.codpessoa = contrato.cliente)\n"+
      "LEFT JOIN mk_cidades cidade ON (cidade.codcidade = cliente.codcidade)\n"+
      "LEFT JOIN mk_planos_acesso planoV ON (planoV.codplano = hist.cd_plano_velho)\n"+
      "LEFT JOIN mk_planos_acesso planoN ON (planoN.codplano = hist.cd_plano_novo)\n"+
      "LEFT JOIN fr_usuario usuario ON (usuario.usr_login = hist.operador)\n"+
      "LEFT JOIN mk_usuarios_perfil_acesso_master setor ON (setor.codperfilacessomaster = usuario.cd_perfil_acesso)\n"+
      "WHERE\n"+
      "hist.dt_hr >= (SELECT (DATE_TRUNC('DAY', CURRENT_DATE) - INTERVAL '60 day')::timestamp) and\n"+
      "(cliente.nome_razaosocial ILIKE $1 OR contrato.codcontrato||'' ilike $1) AND\n"+
      "contrato.cancelado = 'N'\n"+
      "GROUP BY 1";
      const values = [info];
      const result = await db.query(query, values);
      return result.rows;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = MK;
