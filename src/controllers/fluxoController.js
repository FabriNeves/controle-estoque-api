import Movimentacao from '../models/controleFluxoModel.js';
import Produto from '../models/produtosModel.js';
class controleFluxo {

  //**Create Entrada */
  static async entrada(produto, qtd, data_in) {

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
  //**Create Saída */
  static async saida(produto, qtd, data_out) {

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

  //** Registro Nova Entrada */
  static async registrarEntrada(req, res) {
    const { id } = req.params;
    const { qtd_in, data } = req.body;

    try {
      const produto = await Produto.findOne({ where: { id } });
      if (!produto) {
        return res.status(404).json({ isSuccess: false, message: 'Produto não encontrado.' });
      }

      if (!qtd_in || qtd_in <= 0) {
        return res.status(409).json({ isSuccess: false, message: 'Quantidade de saída inválida.' });
      }
      const qtd_total = produto.qtd + qtd_in;

      await produto.update({ qtd: qtd_total });
      await controleFluxo.entrada(produto, qtd_in, data);
      res.status(200).json({ isSuccess: true, message: 'Entrada registrada com sucesso.', qtd_total: qtd_total });
    } catch (error) {
      console.error(error);
      res.status(500).json({ isSuccess: false, message: 'Ocorreu um erro ao registrar a entrada.' });
    }
  }
  //** Registro Nova Saída */
  static async registrarSaida(req, res) {
    const { id } = req.params;
    const { qtd_out, data } = req.body;

    try {
      const produto = await Produto.findOne({ where: { id } });
      if (!produto) {
        return res.status(404).json({ isSuccess: false, message: 'Produto não encontrado.' });
      }
      const { qtd } = produto;
      if (!qtd_out || qtd_out <= 0) {
        return res.status(409).json({ isSuccess: false, message: 'Quantidade de saída inválida.' });
      }
      if (qtd < qtd_out) {
        return res.status(409).json({ isSuccess: false, message: 'Quantidade indisponível para saída.' });
      }
      const qtd_total = qtd - qtd_out;
      console.log(qtd_total);
      const result = await produto.update({ qtd: qtd_total });
      if (result) {
        const movimentacao = await controleFluxo.saida(produto, qtd_out, data);
        if (!movimentacao) {
          return res.status(500).json({ isSuccess: false, message: 'Erro ao registrar saída na movimentação.' });
        }
        return res.status(200).json({ isSuccess: true, message: 'Saída registrada com sucesso.', qtd_total: qtd_total });
      }
    } catch (error) {
      res.status(500).json({ isSuccess: false, message: error.message });
    }
  }

  //**READ-ALL-ITEMS */
  static async read(req, res) {
    try {
      const Mov = await Movimentacao.findAll();
      res.status(200).json({ isSuccess: true, message: Mov });
    } catch (error) {
      res.status(500).json({ isSuccess: false, message: error });
    }
  }
  //**READ produto_id */
  static async read_produto_id(req, res) {
    const { produto_id } = req.params;
    console.log(produto_id);
    try {
      const registro = await Movimentacao.findAll({ where: { produto_id } });
      if (registro) {
        res.status(200).json({ isSuccess: true, message: registro });
      } else {
        res.status(404).send({ isSuccess: false, message: 'Produtos não encontrados.' });
      }
    } catch (error) {
      res.status(500).send({ isSuccess: false, message: error });
    }
  }

}

export default controleFluxo;