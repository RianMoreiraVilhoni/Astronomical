const path = require("path");
const galaxia = require("../models/galaxiasModel.js");
const multer = require('multer');
const crypto = require('crypto');
const GalaxiaDAO = require("../../DAO/galaxiasDAO.js");
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
const galaxiaDAO = new GalaxiaDAO();

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
        res.render("galaxia/addgalaxia");
    });

    app.post("/registrargalaxia", upload.fields([{ name: 'photo1', maxCount: 1 }, { name: 'photo2', maxCount: 1 }]), async (req, res) => {        
        console.log("Recebendo requisição para cadastrar galaxia...");
        console.log("Corpo da requisição:", req.body);
        console.log("Arquivos recebidos:", req.files);
    
        try {
            const {
                id_galaxia: id,
                nome_galaxia: nome,
                tipo_galaxia: tipo,
                tamanho_galaxia: tamanho,
                dstterra_galaxia: distancia_terra,
            } = req.body;
    
            let foto01 = '';
            let foto02 = '';
    
            if (req.files['photo01'] && req.files['photo01'][0]) {
                foto01 = req.files['photo1'][0].filename;
            }
    
            if (req.files['photo02'] && req.files['photo02'][0]) {
                foto02 = req.files['photo02'][0].filename;
            }
    
            console.log("Dados recebidos para cadastro:", id, nome, tipo, tamanho, distancia_terra, foto01, foto01);
    
            let status;
            if (!id) {
                status = await galaxiaDAO.registrarGalaxia(nome, tipo, tamanho, distancia_terra, foto01, foto02);
            } else {
                status = await galaxiaDAO.atualizarGalaxia(nome, tipo, tamanho, distancia_terra, foto01, foto02);
            }
    
            console.log("Status do cadastro:", status);
    
            // Redirecionamento após o cadastro bem-sucedido
            res.redirect('/home');
        } catch (error) {
            console.error(error);
            res.status(500).send('Erro ao realizar o upload.');
        }
    });
    
    app.get("/pagina/galaxia", verificarAutenticacao, (req, res) => {
         res.setHeader("Access-Control-Allow-Origin","*")
         res.sendFile(path.resolve("mvc/views/ctrldev/galaxia/addgalaxia.html"));
    });

    app.get("/galaxia",  (req, res) => {
        res.setHeader("Acess-control-Allow-Origin","*")
        res.sendFile(path.resolve("mvc/views/ctrldev/galaxia/addgalaxia.html"));
    });

    app.get("/galaxia/lista",  async (req, res) => {
        res.setHeader("Access-Control-Allow-Origin","*")
        const lista_galaxias = await galaxiaDAO.consultarGalaxiaId();
        res.render("galaxia/listagalaxia", { galaxias: lista_galaxias });
    });

    app.get("/galaxia/alterar/:id", async (req, res) => {
        const dtgalaxia = await galaxiaDAO.consultarGalaxiaId(req.params.id);
        res.render("galaxia/upgalaxia", { galaxia: dtgalaxia });
    });

    app.get("/galaxia/bruno",  async (req, res) => {
        const lista_galaxias = await galaxiaDAO.consultarGalaxia();
        res.render("../views/public/produtos/index.ejs", { galaxias: lista_galaxias });
    });

    app.get("/galaxia/brunaldo/:id", async (req, res) => {
        const dtgalaxia = await galaxiaDAO.consultarGalaxiaId(req.params.id);
        res.render("../views/public/produtos/detalhes.ejs", { galaxias: dtgalaxia });
    });

    app.delete("/galaxia/apagar/:id", async (req, res) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        try {
            const resultado = await galaxiaDAO.apagarGalaxia(req.params.id);
            res.json(resultado);
        } catch (error) {
            console.error("Erro ao apagar galaxia:", error);
            res.status(500).json({ error: "Erro ao apagar galaxia." });
        }
    });
}
