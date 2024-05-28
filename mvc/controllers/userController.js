const path = require('path');
const Database = require('../../repository/database'); 
const UserDAO = require('../../DAO/userDAO');

module.exports = (app) => {

    app.get("/register", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../views/ctrldev", "register.html"));
    });

    app.post('/register', async (req, res) => {
        const database = new Database(); 
        const userDAO = new UserDAO(database); 
        res.setHeader("Access-Control-Allow-Origin","*")
        const {nome_usuario, email_usuario, senha_usuario} = req.body;
    
        try {
            await userDAO.registrarUsuario(nome_usuario, senha_usuario, email_usuario);
            res.redirect('/home');
        } catch (error) {
            console.error('Erro ao registrar usuário:', error);
            res.status(500).send('Erro ao registrar usuário');
        }
    });
    
};