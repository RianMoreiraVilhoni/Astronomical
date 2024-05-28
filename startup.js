const path = require('path');
const bodyParser = require('body-parser');
const express = require("express");
const banco = require('./repository/database');
const session = require("express-session");
const crypto = require("crypto");
const app = express()
const consign = require("consign")
app.set('view engine', 'ejs')
app.set('views', 'mvc/views/ctrldev')
app.use(express.static('mvc/views/public'))
const AsteroideDAO = require("./DAO/AsteroideDAO");
const PlanetaDAO = require("./DAO/PlanetaDAO.js");

const asteroideDAO = new AsteroideDAO();
const planetaDAO = new PlanetaDAO();
const db = new banco();
const generateRandomSecret = () => {
    return crypto.randomBytes(64).toString('hex');
}
function verificarAutenticacao(req, res, next) {
    if (req.session.user && req.session.user.email) {
        next();
    } else {
        res.redirect('/');
    }
}
app.use(session({
    secret: generateRandomSecret(),
    resave: false,
    saveUninitialized: true
}))

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, "./mvc/views/ctrldev")));

app.get("/", async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.sendFile(path.resolve(__dirname, "./mvc/views/public", "principal.html"));
});


// Configurando o diretório de arquivos estáticos, se necessário


// Configurando o diretório das views e o motor de visualização EJS


app.get("/inicio", async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    const lista_asteroides = await asteroideDAO.consultarAsteroid();
    const lista_planeta = await planetaDAO.consultarPlaneta();
    res.render('pindex',{ asteroides: lista_asteroides, planetas: lista_planeta });
    
});

app.get("/home",  async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");

    res.render('home');

});

app.get("/error", async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.sendFile(path.resolve(__dirname, "./mvc/views/ctrldev", "error.html"));
});

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "./mvc/views/ctrldev")));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "./mvc/views/ctrldev")));

consign()
    .include("mvc/controllers")
    .into(app)


app.listen(3001, () => console.log("Online Server at port 3001"))


app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, '../views/ctrldev')));


module.exports = app
