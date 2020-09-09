const sequelize = require('./sequilize');
const Cliente = sequelize.import('./Cliente');

module.exports = (sequelize, DataTypes) => {
    const Cidade = sequelize.define('Cidade', {
        Nome: DataTypes.STRING(250),
    }, {
        timestamps: false
    });

    Cidade.hasMany(Cliente)

    return Cidade;
}