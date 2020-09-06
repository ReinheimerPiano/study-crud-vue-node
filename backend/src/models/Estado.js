const sequelize = require('./sequilize');
const Cidade = sequelize.import('./Cidade');

module.exports = (sequelize, DataTypes) => {
    const Estado = sequelize.define('Estado', {
        Nome: DataTypes.STRING(250),
        Abreviacao: DataTypes.STRING(5)
    }, {
        timestamps: false
    });


    Estado.hasMany(Cidade, { foreignKey: 'Estado_Id' })

    return Estado;
}