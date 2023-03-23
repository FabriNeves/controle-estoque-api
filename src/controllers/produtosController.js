import Produto from '../models/produtosModel.js';
import { Op } from "sequelize";

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
        const novoProduto = req.body;
        console.log(req.body);
        try {
            const produto = await Produto.create(novoProduto);
            res.status(200).json(produto);
        } catch (error) {
            res.status(500).send(error);
        }
    }
    // UPDATE
    static async update(req, res) {
        const { id } = req.params;
        const atualizacoes = req.body;
        try {
            const produto = await Produto.findOne({ where: { id } });
            if (produto) {
                await produto.update(atualizacoes);
                res.status(200).json(produto);
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
}

export default produtosController;