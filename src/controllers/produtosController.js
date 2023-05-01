import Produto from '../models/produtosModel.js';
import { Op } from "sequelize";
import { validate } from '../services/validate.js';
import Sequelize from 'sequelize';
class produtosController {

    // READ
    static async read(req, res) {
        try {
            const produtos = await Produto.findAll();
            res.status(200).json(produtos);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    // READ-QUERY
    static async readQuery(req, res) {
        try {
            const itensPorPagina = Number(req.query.itensPorPagina) || 10; // Valor padrão é 10
            const pagina = Number(req.query.pagina) || 1; // Valor padrão é 1
            const offset = (pagina - 1) * itensPorPagina;
            console.log(itensPorPagina, pagina, offset);
            const produtos = await Produto.findAndCountAll({
                where: {},
                limit: itensPorPagina,
                offset: offset
            });
            const totalItens = produtos.count;
            const totalPaginas = Math.ceil(totalItens / itensPorPagina);
            res.status(200).json({
                produtos: produtos.rows,
                paginaAtual: pagina,
                totalPaginas: totalPaginas
            });
        } catch (error) {
            console.log(error)
            res.status(500).send(error);
        }
    }

    // READ-BY-ID
    static async readById(req, res) {
        const { id } = req.params;
        try {
            const produto = await Produto.findOne({ where: { id } });
            if (produto) {
                res.status(200).json(produto);
            } else {
                res.status(404).send('Produto não encontrado.');
            }
        } catch (error) {
            res.status(500).send(error);
        }
    }

    // CREATE
    static async create(req, res) {
        const { nome, marca, qtd } = req.body;

        const produto = await Produto.findOne({ where: { nome } });
        if (produto) {
            return res.status(409).send("Produto já existe.");
        } else if (Number(qtd) < 0) {
            return res.status(409).send("Quantidada precisa ser maior que 0");
        }

        try {
            const novoProduto = { nome, marca, qtd };
            const produtoCriado = await Produto.create(novoProduto);
            res.status(200).json(produtoCriado);
        } catch (error) {
            res.status(500).send(error);
        }
    }


    // UPDATE
    static async update(req, res) {
        const { id } = req.params;
        const atualizacoes = req.body;
        const { qtd } = atualizacoes;

        if (qtd < 0) {
            return res.status(400).json({ error: 'A quantidade não pode ser menor que zero.' });
        };

        try {
            const produto = await Produto.findOne({ where: { id } });

            if (produto) {
                const validacao = validate(produto, qtd);
                // if (validacao) {
                //     return res.status(400).json(validacao);
                // } else {
                await produto.update(atualizacoes);
                res.status(200).json({ produto, alerta: validacao });
                // }
            } else {
                res.status(404).send('Produto não encontrado.');
            }
        } catch (error) {
            res.status(500).send(error);
        }
    }

    // DELETE
    static async delete(req, res) {
        const { id } = req.params;
        try {
            const produto = await Produto.findOne({ where: { id } });
            if (produto) {
                await produto.destroy();
                res.send('Produto deletado. :' + JSON.stringify(produto));
            } else {
                res.status(404).send('Produto não encontrado.');
            }
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }

    // FIND 
    static async find(req, res) {
        const query = req.query;
        const objSQLQuery = {};

        // Construção do Objeto de Procura.
        for (const key in query) {
            objSQLQuery[key] = {

                [Op.like]: `${query[key]}%`
            };
        }

        try {
            const produtos = await Produto.findAll({
                where: objSQLQuery

            });
            res.status(200).json(produtos);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    //Listar Protudos Abaixo da quantidade Mínima
    static async listarProdutosComQuantidadeMinima(req, res) {
        try {
            const produtos = await Produto.findAll({
                where: Sequelize.literal('qtd < min_qtd')
            });

            if (produtos.length > 0) {
                return res.status(200).json(produtos);
            } else {
                return res.status(404).json({ message: "Nenhum produto encontrado com quantidade mínima abaixo do limite." });
            }
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export default produtosController;