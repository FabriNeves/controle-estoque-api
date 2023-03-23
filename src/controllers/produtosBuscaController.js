// static async find(req, res) {
    //     const { escola, nome, idade, genero, situacaoFinal } = req.query;
    //     console.log(escola, nome, idade, genero, situacaoFinal);

    //     try {

    //         const alunos = await Produto.findAll({
    //             include: {
    //                 model: Estabelecimento,
    //                 where: {
    //                     nomeEstabelecimento: {
    //                         [Op.like]: `${escola}%`,
    //                     },
    //                 },
    //             },
    //             where: {
    //                 nome: {
    //                     [Op.like]: `${nome}%`,
    //                 },
    //                 idade: {
    //                     [Op.like]: `${idade}%`,
    //                 },
    //                 genero: {
    //                     [Op.like]: `${genero}%`,
    //                 },
    //                 situacaoFinal: {
    //                     [Op.like]: `${situacaoFinal}%`,
    //                 },
    //             },
    //         });
    //         res.status(200).json(alunos);
    //     } catch (error) {
    //         res.status(500).json({ error: error.message });
    //     }
    // }