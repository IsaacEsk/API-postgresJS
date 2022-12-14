const express = require('express');
const cors = require('cors');


const app = express();



// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// Routes
app.use(require('./routes/index'));


app.listen(80);
console.log("Servidor iniciado");
// app.listen(2500);
// console.log('Server on port', 2500);

