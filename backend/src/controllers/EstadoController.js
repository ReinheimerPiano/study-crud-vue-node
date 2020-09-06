const sequelize = require('./../models/sequilize');
const Estado = sequelize.import('./../models/Estado');
module.exports = {

    async index(req, res) {
        const estadoResult = await Estado.findAll();
        return res.status(200)
            .json(estadoResult);
    },


    async getId(req, res) {
        const { id } = req.params;

        const estadoResult = await Estado.findByPk(id);
        return res.status(200)
            .json(estadoResult);
    },

    async create(req, res) {
        const estadoRequest = req.body;
        const data = await Estado.create(estadoRequest);

        return res.status(200)
            .json(data);
    },

    async update(req, res) {
        const { id } = req.params;
        const estadoRequest = req.body;

        const estadoResult = await Estado.update(
            estadoRequest, {
                where: {
                    id: id
                }
            });

        return res.status(200)
            .json({
                status: true,
                updatedAffectLines: estadoRequest,
            });
    },

    async delete(req, res) {
        const { id } = req.params;

        const estadoResult = await Estado.destroy({ where: { id: id } });

        return res.status(200)
            .json({
                status: true,
                deleteAffectLines: estadoResult,
            });
    }

};