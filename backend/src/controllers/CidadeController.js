const sequelize = require('./../models/sequilize');
const Cidade = sequelize.import('./../models/Cidade');


module.exports = {
    async index(req, res) {
        const CidadeRequest = await Cidade.findAll();
        return res.status(200)
            .json(CidadeRequest);
    },

    async getId(req, res) {
        const { id } = req.params;
        const CidadeRequest = await Cidade.findByPk(id);
        return res.status(200)
            .json(CidadeRequest);
    },

    async getEstadoId(req, res) {
        const { id } = req.params;
        const CidadeRequest = await Cidade.findAll({
            where: { EstadoId: id }
        })
        return res.status(200)
            .json(CidadeRequest);
    },

    async create(req, res) {
        const CidadeRequest = req.body;
        const data = await Cidade.create(CidadeRequest);

        return res.status(200)
            .json(data);
    },

    async update(req, res) {
        const { id } = req.params;
        const CidadeRequest = req.body;

        const CidadeResult = await Cidade.update(
            CidadeRequest, {
                where: {
                    id: id
                }
            });

        return res.status(200)
            .json({
                status: true,
                updatedAffectLines: CidadeRequest,
            });
    },

    async delete(req, res) {
        const { id } = req.params;

        const CidadeResult = await Cidade.destroy({ where: { id } });

        return res.status(200)
            .json({
                status: true,
                deleteAffectLines: CidadeResult,
            });
    }

};