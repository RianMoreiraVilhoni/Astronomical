const EstrelaDAO = require("../../DAO/estrelaDAO.js");
const path = require("path");
const Estrela = require("../models/estrelaModel.js");
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
const estrelaDAO = new EstrelaDAO();

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

    app.get("/getEstrelas", async (req, res) => {
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.sendFile(path.resolve("mvc/views/"))
    });

    app.get("/estrelas", verificarAutenticacao, async (req, res) => {
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.render("estrela/addestrela");
    });

    app.post("/registrarestrela", upload.fields([{ name: 'foto01', maxCount: 1 }, { name: 'foto02', maxCount: 1 }]), async (req, res) => {
        console.log("Recebendo requisição para cadastrar estrela...");
        console.log("Corpo da requisição:", req.body);
        console.log("Arquivos recebidos:", req.files);

        try {
            const {
                txtid: id,
                txtnomeestrela: nome,
                txttipoesestrela: tipoes,
                numbermagnitudeestrela: magnitude,
                numberidadeestrela: idade,
                numberdstterraestrela: dstterra
            } = req.body;

            let foto01 = '';
            let foto02 = '';

            if (req.files['foto01'] && req.files['foto01'][0]) {
                foto01 = req.files['foto01'][0].filename;
            }

            if (req.files['foto02'] && req.files['foto02'][0]) {
                foto02 = req.files['foto02'][0].filename;
            }

            console.log("Dados recebidos para cadastro:", nome, tipoes, magnitude, idade, dstterra, foto01, foto02);

            let status;
            if (!id) {
                status = await estrelaDAO.registrarestrela(nome, tipoes, magnitude, idade, dstterra, foto01, foto02);
            } else {
                status = await estrelaDAO.atualizarEstrela(nome, tipoes, magnitude, idade, dstterra, foto01, foto02);
            }

            console.log("Status do cadastro:", status);

            // Redirecionamento após o cadastro bem-sucedido
            res.redirect('/estrela/lista');
        } catch (error) {
            console.error(error);
            res.status(500).send('Erro ao realizar o upload.');
        }
    });

    app.get("/pagina/estrela", verificarAutenticacao, (req, res) => {
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.sendFile(path.resolve("mvc/views/ctrldev/estrela/addestrela.html"));
    });

    app.get("/estrela", verificarAutenticacao, (req, res) => {
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.sendFile(path.resolve("mvc/views/ctrldev/estrela/addestrela.html"));
    });

    app.get("/estrela/lista", verificarAutenticacao, async (req, res) => {
        res.setHeader("Access-Control-Allow-Origin", "*")
        const lista_estrelas = await estrelaDAO.consultarEstrela();
        res.render("estrela/listaestrela", { estrelas: lista_estrelas });
    });
    //////////////////////////////////////////////////////////////////////////////////
    app.get("/estrela/alterar/:id", async (req, res) => {
        const estrelaDAO = new EstrelaDAO()
        const lista_estrelas = await estrelaDAO.consultarEstrelaId(req.params.id);
        res.render("estrela/upestrela", { estrela: lista_estrelas });
    });
    //////////////////////////////////////////////////////////////////////////////////
    app.get("/estrela/bruno", verificarAutenticacao, async (req, res) => {
        const lista_estrelas = await estrelaDAO.consultarEstrela();
        res.render("../views/public/produtos/index.ejs", { estrela: lista_estrelas });
    });

    app.get("/estrela/brunaldo/:id", async (req, res) => {
        const dtestrela = await estrelaDAO.consultarEstrelaId(req.params.id);
        res.render("../views/public/produtos/detalhes.ejs", { estrela: dtestrela });
    });

    app.delete("/estrela/apagar/:id", async (req,res) =>{
        const estrelaDAO = new EstrelaDAO();
        res.setHeader("Access-Control-Allow-Origin","*")
    
        res.json(await estrelaDAO.apagarEstrela(req.params.id))

    })
    
}
