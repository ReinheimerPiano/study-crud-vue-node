const sequelize = require('./sequilize');
const Cidade = sequelize.import('./Cidade');
const Cliente = sequelize.import('./Cliente');

module.exports = (sequelize, DataTypes) => {
    const Estado = sequelize.define('Estado', {
        Nome: DataTypes.STRING(250),
        Abreviacao: DataTypes.STRING(5)
    }, {
        timestamps: false
    });


    Estado.hasMany(Cidade)
    Estado.hasMany(Cliente)

    return Estado;
}