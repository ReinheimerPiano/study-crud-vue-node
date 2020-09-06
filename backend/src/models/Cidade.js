const sequelize = require('./sequilize');
const Cliente = sequelize.import('./Cliente');

module.exports = (sequelize, DataTypes) => {
    const Cidade = sequelize.define('Cidade', {
        Nome: DataTypes.STRING(250),
        Estado_Id: DataTypes.INTEGER
    }, {
        timestamps: false
    });

    Cidade.hasMany(Cliente, { foreignKey: 'Cidade_Id' })

    return Cidade;
}