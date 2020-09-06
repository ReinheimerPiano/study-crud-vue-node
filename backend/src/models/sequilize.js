const Sequelize = require('sequelize');

const sequelize = new Sequelize('WebCrud', 'sa', '44543303873', {
    host: 'localhost',
    dialect: 'mssql',
    sync: { force: true },
});
sequelize
    .authenticate()
    .then(() => console.log('Authenticated'))
    .catch(() => console.log('Error Auth'));

sequelize.sync();

module.exports = sequelize;