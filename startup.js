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
        res.redirect('/admin');
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


app.use(express.static(path.join(__dirname, 'public')));

// Configurando o diretório das views e o motor de visualização EJS
app.set('views', path.join(__dirname, 'mvc', 'views','public'));
app.set('view engine', 'ejs');

app.get("/admin", async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.sendFile(path.resolve(__dirname, "./mvc/views/ctrldev", "index.html"));
});

app.get("/inicio", async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    const lista_asteroides = await asteroideDAO.consultarAsteroid();
    const lista_planeta = await planetaDAO.consultarPlaneta();
    res.render('pindex',{ asteroides: lista_asteroides, planetas: lista_planeta });
    
});
// Rota para processar o formulário de login
app.post('/login', async (req, res) => {
    const email = req.body.txtctrllogin;
    const senha = req.body.txtctrlpass;

    // Consulta SQL para verificar o login usando método da classe Database
    try {
        const result = await db.verificarLogin(email, senha);
        if (result.length > 0) {
            // Se o login for bem-sucedido, redirecione para home.html
            req.session.user = { email: email };
            res.redirect('/home');

        } else {
            // Se o login falhar, redirecione para error.html

            res.redirect('/error');
        }
    } catch (error) {
        console.error('Erro ao verificar o login:', error);
        res.redirect('/error');
    }
});
app.get("/logout", (req, res) => {
    // Destrua a sessão
    req.session.destroy((err) => {
        if (err) {
            console.error('Erro ao destruir a sessão:', err);
            res.redirect('/error');
        } else {
            // Redirecione o usuário para a página de login após o logout
            res.redirect('/admin');
        }
    });
});
// Rota para a página home
app.get("/home", verificarAutenticacao, async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");

    res.sendFile(path.resolve(__dirname, "./mvc/views/ctrldev", "home.html"));

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
