const AstronautaDAO = require("../../DAO/astronautasDAO.js");
const path = require("path");
const astronauta = require("../models/astronautasModel.js");
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
const astronautaDAO = new AstronautaDAO();

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

    app.get("/getAstronautas", async (req, res) => {
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.sendFile(path.resolve("mvc/views/"))
    });

    app.get("/astronautas", verificarAutenticacao, async (req, res) => {
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.render("astronauta/addastronauta");
    });

    app.post("/registrarastronauta", upload.fields([{ name: 'foto01', maxCount: 1 }, { name: 'foto02', maxCount: 1 }]), async (req, res) => {
        console.log("Recebendo requisição para cadastrar astronauta...");
        console.log("Corpo da requisição:", req.body);
        console.log("Arquivos recebidos:", req.files);

        try {
            const {
                txtid: id,
                txtnomeastronauta: nome,
                numberidadeastronauta: idade,
                txtnacionalidadeastronauta: nacionalidade,
                txtsexoastronauta: sexo,
            } = req.body;

            let foto01 = '';
            let foto02 = '';

            if (req.files['foto01'] && req.files['foto01'][0]) {
                foto01 = req.files['foto01'][0].filename;
            }

            if (req.files['foto02'] && req.files['foto02'][0]) {
                foto02 = req.files['foto02'][0].filename;
            }

            console.log("Dados recebidos para cadastro:", nome, idade, nacionalidade, sexo, foto01, foto02);

            let status;
            if (!id) {
                status = await astronautaDAO.registrarAstronauta(nome, idade, nacionalidade, sexo, foto01, foto02);
            } else {
                status = await astronautaDAO.atualizarAstronauta(nome, idade, nacionalidade, sexo, foto01, foto02);
            }

            console.log("Status do cadastro:", status);

            // Redirecionamento após o cadastro bem-sucedido
            res.redirect('/home');
        } catch (error) {
            console.error(error);
            res.status(500).send('Erro ao realizar o upload.');
        }
    });

    app.get("/pagina/astronauta", verificarAutenticacao, (req, res) => {
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.sendFile(path.resolve("mvc/views/ctrldev/astronauta/addastronautas.html"));
    });

    app.get("/astronauta", verificarAutenticacao, (req, res) => {
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.sendFile(path.resolve("mvc/views/ctrldev/astronauta/addastronautas.html"));
    });

    app.get("/astronauta/lista", verificarAutenticacao, async (req, res) => {
        res.setHeader("Access-Control-Allow-Origin", "*")
        const lista_astronautas = await astronautaDAO.consultarAstronauta();
        res.render("astronauta/listaastronautas", { astronautas: lista_astronautas });
    });

    app.get("/astronauta/alterar/:id", async (req, res) => {
        const dtastronauta = await astronautaDAO.consultarastronautaId(req.params.id);
        res.render("astronauta/upastroauta", { astronauta: dtastronauta });
    });

    app.get("/astronauta/bruno", verificarAutenticacao, async (req, res) => {
        const lista_astronautas = await astronautaDAO.consultarAstronauta();
        res.render("../views/public/produtos/index.ejs", { astronauta: lista_astronautas });
    });

    app.get("/astronauta/brunaldo/:id", async (req, res) => {
        const dtastronauta = await astronautaDAO.consultarAstronautaId(req.params.id);
        res.render("../views/public/produtos/detalhes.ejs", { astronauta: dtastronauta });
    });

    app.delete("/astronauta/apagar/:id", async (req, res) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        try {
            console.log("ID do astronauta a ser apagado:", req.params.id); // Adição de log
            const resultado = await astronautaDAO.apagarAstronauta(req.params.id);
            console.log("Resultado da exclusão:", resultado); // Adição de log
            res.json(resultado);
        } catch (error) {
            console.error("Erro ao apagar astronauta:", error);
            res.status(500).json({ error: "Erro ao apagar astronauta." });
        }
    });
    
}