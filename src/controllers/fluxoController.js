import Sequelize from 'sequelize';
import Movimentacao from '../models/controleFluxoModel.js';
import Produto from '../models/produtosModel.js';
class controleFluxo {
    static async entrada(produto,qtd, data_in) {

        data_in = data_in ? data_in : new Date();

        try {
            await Movimentacao.create({
                nome: produto.nome,
                tipo: "entrada",
                produto_id: produto.id,
                qtd: qtd,
                data: data_in
            })
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }

    }
    static async saida(produto,qtd, data_out) {

        data_out = data_out ? data_out : new Date();

        try {
            await Movimentacao.create({
                nome: produto.nome,
                tipo: "saida",
                produto_id: produto.id,
                qtd: -(qtd),
                data: data_out
            })
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }

    }

    static async registrarEntrada(req, res) {
        const { id } = req.params;
        const { qtd_in, data } = req.body;
        try {
          const produto = await Produto.findOne({ where: { id } });
          if (!produto) {
            return res.status(404).send('Produto não encontrado.');
          }
          if (qtd_in <= 0) {
            return res.status(400).send('A quantidade de entrada deve ser maior que zero.');
          }
          const qtd_total = produto.qtd + qtd_in;
          await produto.update({ qtd: qtd_total });
          await controleFluxo.entrada(produto, qtd_in, data);
          res.status(200).send('Entrada registrada com sucesso.');
        } catch (error) {
          console.error(error);
          res.status(500).send('Ocorreu um erro ao registrar a entrada.');
        }
      }
      
      static async registrarSaida(req, res) {
        const { id } = req.params;
        const { qtd_out, data } = req.body;
        
        try {
          const produto = await Produto.findOne({ where: { id } });
          if (!produto) {
            return res.status(404).send("Produto não encontrado.");
          }
          const { qtd } = produto;
          if (qtd < qtd_out) {
            return res.status(409).send("Quantidade indisponível para saída.");
          }
          const qtd_total = qtd - qtd_out;
          const result = await produto.update({ qtd: qtd_total });
          if (result) {
            const movimentacao = await controleFluxo.saida(produto, qtd_out, data);
            if (!movimentacao) {
              return res.status(500).send("Erro ao registrar saída na movimentação.");
            }
            return res.status(200).json(result);
          }
        } catch (error) {
          res.status(500).send(error);
        }
      }
      
}

export default controleFluxo;