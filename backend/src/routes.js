const express = require('express');
var cors = require('cors')

const EstadoController = require('./controllers/EstadoController');
const CidadeControler = require('./controllers/CidadeController');
const ClienteController = require('./controllers/ClienteController');

const routes = express.Router();

routes.get('/', cors(), (req, res) => {
    return res.json({
        message: "It's Work!"
    });
});

routes.get('/estado', EstadoController.index);
routes.get('/estado/:id', EstadoController.getId);
routes.post('/estado', EstadoController.create);
routes.put('/estado/:id', EstadoController.update);
routes.delete('/estado/:id', EstadoController.delete);

routes.get('/cidade', CidadeControler.index);
routes.get('/cidade/:id', CidadeControler.getId);
routes.get('/cidade/estado/:id', CidadeControler.getEstadoId);
routes.post('/cidade', CidadeControler.create);
routes.put('/cidade/:id', CidadeControler.update);
routes.delete('/cidade/:id', CidadeControler.delete);

routes.get('/cliente', ClienteController.index);
routes.get('/cliente/:id', ClienteController.getId);
routes.post('/cliente', ClienteController.create);
routes.put('/cliente/:id', ClienteController.update);
routes.delete('/cliente/:id', ClienteController.delete);

module.exports = routes;