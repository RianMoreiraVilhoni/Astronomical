const Database = require("../repository/database");
//const criptografarSenha = require("../cryptoUtil");

class UserDAO {
    constructor() {
        this.database = new Database();
    }
    

    async registrarUsuario(nome, senha, email) {
        try {
            //const senhaCriptografada = criptografarSenha(senha);
            console.log('Registrando usuário:', nome, senha, email);  
            const resultado = await this.database.insertUser(nome, senha, email);
            console.log('Usuário registrado com sucesso:', resultado);  
            return resultado;
        } catch (error) {
            console.error('Erro ao registrar usuário:', error);
            throw error;
        }
    }

    
}

module.exports = UserDAO;