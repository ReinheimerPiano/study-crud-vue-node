const express = require('express');
const routes = require('./routes');
const cors = require('cors')

const app = express();

app.use(express.json());
app.use(routes);
app.use(cors())


app.listen(3000, () => {
    console.log(`Server started on http://localhost:3000`);
});

module.exports = app;



// const express = require('express');
// const app = express();
// const bodyParser = require('body-parser');
// const port = 3000; //porta padrão
// const sql = require('mssql');
// const connStr = "Server=(local);Database=WebC;User Id=sa;Password=44543303873;";

// function execSQLQuery(sqlQry, res) {
//     GLOBAL.conn.request()
//         .query(sqlQry)
//         .then(result => res.json(result.recordset))
//         .catch(err => res.json(err));
// }

// sql.connect(connStr)
//     .then(conn => GLOBAL.conn = conn)
//     .catch(err => console.log(err));

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// const router = express.Router();
// router.get('/', (req, res) => res.json({ message: 'pass!' }));
// app.use('/', router);

// router.get('/estado/:id?', (req, res) => {
//     let filter = '';
//     if (req.params.id) filter = ' WHERE Estado_Id=' + parseInt(req.params.id);
//     execSQLQuery('SELECT * FROM Estado' + filter, res);
// })

// router.post('/estado', (req, res) => {
//     const id = parseInt(req.body.id);
//     const nome = req.body.nome.substring(0, 250);
//     const abreviacao = req.body.abreviacao.substring(0, 5);
//     execSQLQuery(`INSERT INTO Estado(Estado_Id, Estado_Nome, Estado_Abreciacao) VALUES(${id},'${nome}','${abreviacao}')`, res);
// })

// router.patch('/estado/:id', (req, res) => {
//     const id = parseInt(req.params.id);
//     const nome = req.body.nome.substring(0, 150);
//     const abreviacao = req.body.cpf.substring(0, 11);
//     execSQLQuery(`UPDATE Estado SET Estado_Nome='${nome}', Estado_Abreciacao='${abreviacao}' WHERE Estado_Id=${id}`, res);
// })

// router.delete('/estado/:id', (req, res) => {
//     execSQLQuery('DELETE Estado WHERE Estado_Id=' + parseInt(req.params.id), res);
// })



// app.listen(port);
// console.log('API OK!');