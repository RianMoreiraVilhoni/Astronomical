const AsteroideDAO = require("../../DAO/AsteroideDAO.js");
const path = require("path");
const Asteroide = require("../models/asteroidModel.js");
const multer = require('multer');
const crypto = require('crypto');
const fs = require('fs').promises;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', 'views', 'public', 'images', 'upload'));
    },
    filename: function (req, file, cb) {
        const extensao = path.extname(file.originalname);
        const nomeArquivo = crypto.createHash('md5').update(file.originalname + Date.now().toString()).digest('hex') + extensao;
        cb(null, nomeArquivo);
    }
});

const upload = multer({ storage: storage });
const asteroideDAO = new AsteroideDAO();

function verificarAutenticacao(req, res, next) {
    // Verifica se o usuário está autenticado
    if (req.session.user && req.session.user.email) {
        // Se estiver autenticado, prossiga para a próxima middleware
        next();
    } else {
        // Se não estiver autenticado, redirecione para a página de login
        res.redirect('/admin');
    }
}

module.exports = (app) => {

    app.get("/getAsteroids", async (req, res) => {
        res.setHeader("Access-Control-Allow-Origin","*")
        res.sendFile(path.resolve("mvc/views/"))
    });

    app.get("/asteroids",  async (req, res) => {
        res.setHeader("Access-Control-Allow-Origin","*")
        res.render("asteroide/addasteroide");
    });

    app.post("/registrarasteroide", upload.fields([{ name: 'foto01', maxCount: 1 }, { name: 'foto02', maxCount: 1 }]), async (req, res) => {
        console.log("Recebendo requisição para cadastrar asteroide...");
        console.log("Corpo da requisição:", req.body);
        console.log("Arquivos recebidos:", req.files);
    
        try {
            const {
                txtid: id,
                seltipoasteroide: tipo,
                txtnomeasteroide: nome,
                txttamanhoasteroide: tamanho,
                txtorbitaasteroide: orbita
            } = req.body;
    
            let foto01 = '';
            let foto02 = '';
    
            if (req.files['foto01'] && req.files['foto01'][0]) {
                foto01 = req.files['foto01'][0].filename;
            }
    
            if (req.files['foto02'] && req.files['foto02'][0]) {
                foto02 = req.files['foto02'][0].filename;
            }
    
            console.log("Dados recebidos para cadastro:", id, tipo, nome, tamanho, orbita, foto01, foto02);
    
            let status;
            if (!id) {
                status = await asteroideDAO.registrarAsteroide(tipo, nome, tamanho, orbita, foto01, foto02);
            } else {
                status = await asteroideDAO.atualizarAsteroid(id, tipo, nome, tamanho, orbita, foto01, foto02);
            }
    
            console.log("Status do cadastro:", status);
    
            // Redirecionamento após o cadastro bem-sucedido
            res.redirect('/asteroide/lista');
        } catch (error) {
            console.error(error);
            res.status(500).send('Erro ao realizar o upload.');
        }
    });
    
    app.get("/pagina/asteroide", verificarAutenticacao, (req, res) => {
         res.setHeader("Access-Control-Allow-Origin","*")
         res.sendFile(path.resolve("mvc/views/ctrldev/asteroide/addasteroide.html"));
    });

    app.get("/asteroide",  (req, res) => {
        res.setHeader("Acess-control-Allow-Origin","*")
        res.sendFile(path.resolve("mvc/views/ctrldev/asteroide/addasteroide.html"));
    });

    app.get("/asteroide/lista",  async (req, res) => {
        res.setHeader("Access-Control-Allow-Origin","*")
        const lista_asteroides = await asteroideDAO.consultarAsteroid();
        res.render("asteroide/listaasteroide", { asteroides: lista_asteroides });
    });

    app.get("/asteroide/alterar/:id", async (req, res) => {
        const dtasteroide = await asteroideDAO.consultarAsteroidId(req.params.id);
        res.render("asteroide/upasteroide", { asteroide: dtasteroide });
    });

    app.get("/asteroide/bruno",  async (req, res) => {
        const lista_asteroides = await asteroideDAO.consultarAsteroid();
        res.render("../views/public/produtos/index.ejs", { asteroides: lista_asteroides });
    });

    app.get("/asteroide/brunaldo/:id", async (req, res) => {
        const dtasteroide = await asteroideDAO.consultarAsteroidId(req.params.id);
        res.render("../views/public/produtos/detalhes.ejs", { asteroides: dtasteroide });
    });

    app.delete("/asteroide/apagar/:id", async (req, res) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        try {
            const resultado = await asteroideDAO.apagarAsteroide(req.params.id);
            res.json(resultado);
        } catch (error) {
            console.error("Erro ao apagar asteroide:", error);
            res.status(500).json({ error: "Erro ao apagar asteroide." });
        }
    });
}
