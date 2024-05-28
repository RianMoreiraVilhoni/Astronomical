const PlanetaDAO = require("../../DAO/PlanetaDAO.js");
const path = require("path");
const Planeta = require("../models/planetaModel.js");
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
const planetaDAO = new PlanetaDAO();

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

    app.get("/getPlanetas", async (req, res) => {
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.sendFile(path.resolve("mvc/views/"))
    });

    app.get("/planetas",  async (req, res) => {
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.render("planeta/addplaneta");
    });

    app.post("/registrarplaneta", upload.fields([{ name: 'foto01', maxCount: 1 }, { name: 'foto02', maxCount: 1 }]), async (req, res) => {
        console.log("Recebendo requisição para cadastrar planeta...");
        console.log("Corpo da requisição:", req.body);
        console.log("Arquivos recebidos:", req.files);

        try {
            const {
                txtid: id,
                txtnomeplaneta: nome,
                txtmassaplaneta: massa,
                txtraioplaneta: raio,
                txtorbitaplaneta: porbita,
                txtdstplaneta: dstsol
            } = req.body;

            let foto01 = '';
            let foto02 = '';

            if (req.files['foto01'] && req.files['foto01'][0]) {
                foto01 = req.files['foto01'][0].filename;
            }

            if (req.files['foto02'] && req.files['foto02'][0]) {
                foto02 = req.files['foto02'][0].filename;
            }

            console.log("Dados recebidos para cadastro:", id, nome, massa, raio, porbita, dstsol, foto01, foto02);

            let status;
            if (!id) {
                status = await planetaDAO.registrarPlaneta(nome, massa, raio, porbita, dstsol, foto01, foto02);
            } else {
                status = await planetaDAO.atualizarPlaneta(id, nome, massa, raio, porbita, dstsol, foto01, foto02);
            }

            console.log("Status do cadastro:", status);

            // Redirecionamento após o cadastro bem-sucedido
            res.redirect('/planeta/lista');
        } catch (error) {
            console.error(error);
            res.status(500).send('Erro ao realizar o upload.');
        }
    });

    app.get("/pagina/planeta",  (req, res) => {
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.sendFile(path.resolve("mvc/views/ctrldev/planeta/addplaneta.html"));
    });

    app.get("/planeta",  (req, res) => {
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.sendFile(path.resolve("mvc/views/ctrldev/planeta/addplaneta.html"));
    });

    app.get("/planeta/lista",  async (req, res) => {
        res.setHeader("Access-Control-Allow-Origin", "*")
        const lista_planetas = await planetaDAO.consultarPlaneta();
        res.render("planeta/listaplaneta", { planetas: lista_planetas });
    });

    app.get("/planeta/alterar/:id", async (req, res) => {
        const dtplaneta = await planetaDAO.consultarPlanetaId(req.params.id);
        res.render("planeta/upasteroide", { planeta: dtplaneta });
    });

    app.get("/planeta/bruno", verificarAutenticacao, async (req, res) => {
        const lista_planetas = await planetaDAO.consultarPlaneta();
        res.render("../views/public/produtos/index.ejs", { planeta: lista_planetas });
    });

    app.get("/planeta/brunaldo/:id", async (req, res) => {
        const dtplaneta = await planetaDAO.consultarPlanetaId(req.params.id);
        res.render("../views/public/produtos/detalhes.ejs", { planeta: dtplaneta });
    });

    app.delete("/planeta/apagar/:id", async (req, res) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        try {
            console.log("ID do planeta a ser apagado:", req.params.id); // Adição de log
            const resultado = await planetaDAO.apagarPlaneta(req.params.id);
            console.log("Resultado da exclusão:", resultado); // Adição de log
            res.json(resultado);
        } catch (error) {
            console.error("Erro ao apagar planeta:", error);
            res.status(500).json({ error: "Erro ao apagar planeta." });
        }
    });
    
}
