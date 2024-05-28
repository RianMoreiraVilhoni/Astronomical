const Database = require("../repository/database");
const User = require("../models/userModel");

class UserDAO {

    #connection;

    constructor() {
        this.#connection = new Database();
    }

    async registrarUsuario(nome, senha, email) {
        
        try {
            const resultado = await this.#connection.insertUser(nome, senha, email);
            return resultado;
        } catch (error) {
            console.error('Erro ao registrar usuário:', error);
            throw error;
        }
    }

}

module.exports = UserDAO;