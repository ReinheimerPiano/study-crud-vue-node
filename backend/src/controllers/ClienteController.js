const sequelize = require('./../models/sequilize');
const Cliente = sequelize.import('./../models/Cliente');

module.exports = {
    async index(req, res) {
        const ClienteRequest = await Cliente.findAll();
        return res.status(200)
            .json(ClienteRequest);
    },


    async getId(req, res) {
        const { id } = req.params;
        const ClienteRequest = await Cliente.findByPk(id);
        return res.status(200)
            .json(ClienteRequest);
    },

    async create(req, res) {
        const ClienteRequest = req.body;
        const data = await Cliente.create(ClienteRequest);

        return res.status(200)
            .json(data);
    },

    async update(req, res) {
        const { id } = req.params;
        const ClienteRequest = req.body;

        const ClienteResult = await Cliente.update(
            ClienteRequest, {
                where: {
                    id: id
                }
            });

        return res.status(200)
            .json({
                status: true,
                updatedAffectLines: ClienteRequest,
            });
    },

    async delete(req, res) {
        const { id } = req.params;

        const ClienteResult = await Cliente.destroy({ where: { id } });

        return res.status(200)
            .json({
                status: true,
                deleteAffectLines: ClienteResult,
            });
    }

};