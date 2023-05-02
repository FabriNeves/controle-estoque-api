import { validate } from "../services/validate.js";

class fluxoEstoque {
  // REGISTRO
  static async registroIO(req, res) {
    const { id } = req.params;
    const { qtd } = req.body;

    if (qtd === 0) {
      return res.status(400).json({ error: "A quantidade não pode ser igual a zero." });
    } else if (qtd < 0) {
      if (Math.abs(qtd) > produto.qtd) {
        return res.status(400).json({ error: "A quantidade a ser retirada é maior do que a quantidade atual." });
      }
    }

    try {
      const produto = await Produto.findOne({ where: { id } });

      if (produto) {
        const validacao = validate(produto, qtd);

        
        const diferenca = Math.abs(qtd);
        if (qtd > 0) {
          await Entrada.create({ qtd_in: diferenca, data_in: new Date() });
        } else {
          await Saida.create({ qtd_out: diferenca, data_out: new Date() });
        }

        await produto.update({ qtd: produto.qtd + qtd });

        res.status(200).json({ produto, alerta: validacao });
      } else {
        res.status(404).send("Produto não encontrado.");
      }
    } catch (error) {
      res.status(500).send(error);
    }
  }
}
