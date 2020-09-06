const express = require('express');
var cors = require('cors')

const EstadoController = require('./controllers/EstadoController');
const CidadeControler = require('./controllers/CidadeController');
const ClienteController = require('./controllers/ClienteController');

const routes = express.Router();

var corsOptions = {
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

routes.get('/', cors(corsOptions), (req, res) => {
    return res.json({
        message: "It's Work!"
    });
});


// routes.get('/estado/:id?', (req, res) => {
//     if (req.params.id) {
//         EstadoController.getId;
//     } else {
//         EstadoController.index;
//     }
// })

routes.get('/estado', cors(corsOptions), EstadoController.index);
routes.get('/estado/:id', cors(corsOptions), EstadoController.getId);
routes.post('/estado', cors(corsOptions), EstadoController.create);
routes.put('/estado/:id', cors(corsOptions), EstadoController.update);
routes.delete('/estado/:id', cors(corsOptions), EstadoController.delete);

routes.get('/cidade', cors(corsOptions), CidadeControler.index);
routes.get('/cidade/:id', cors(corsOptions), CidadeControler.getId);
routes.get('/cidade/estado/:id', cors(corsOptions), CidadeControler.getEstadoId);
routes.post('/cidade', cors(corsOptions), CidadeControler.create);
routes.put('/cidade/:id', cors(corsOptions), CidadeControler.update);
routes.delete('/cidade/:id', cors(corsOptions), CidadeControler.delete);

routes.get('/cliente', cors(corsOptions), ClienteController.index);
routes.get('/cliente/:id', cors(corsOptions), ClienteController.getId);
routes.post('/cliente', cors(corsOptions), ClienteController.create);
routes.put('/cliente/:id', cors(corsOptions), ClienteController.update);
routes.delete('/cliente/:id', cors(corsOptions), ClienteController.delete);

module.exports = routes;