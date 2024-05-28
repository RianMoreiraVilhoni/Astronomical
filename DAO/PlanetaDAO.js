// PlanetaDAO.js

const Planeta = require('../mvc/models/planetaModel');
const Database = require('../repository/database');

class PlanetaDAO {
    #conexao;

    constructor() {
        this.#conexao = new Database();
    }

    async consultarPlaneta() {
        const lista_planetas = [];
        const planetas = await this.#conexao.selecionarPlaneta();

        if (planetas) {
            for (const planeta of planetas) {
                const objplaneta = new Planeta();
                objplaneta.id = planeta.id_planeta;
                objplaneta.nome = planeta.nome_planeta;
                objplaneta.massa = planeta.massa_planeta;
                objplaneta.raio = planeta.raio_planeta;
                objplaneta.porbita = planeta.orbita_planeta;
                objplaneta.dstsol = planeta.distancia_sol_planeta;
                objplaneta.foto01 = planeta.foto01_planeta;
                objplaneta.foto02 = planeta.foto02_planeta;
                lista_planetas.push(objplaneta.toJson());
            }
        }

        return lista_planetas;
    }

    async consultarPlanetaId(id) {
        const planeta = await this.#conexao.selecionarPlanetaId(id);
        const objplaneta = new Planeta();

        objplaneta.id = planeta[0].id_planeta;
        objplaneta.nome = planeta[0].nome_planeta;
        objplaneta.massa = planeta[0].massa_planeta;
        objplaneta.raio = planeta[0].raio_planeta;
        objplaneta.porbita = planeta[0].orbita_planeta;
        objplaneta.dstsol = planeta[0].distancia_sol_planeta;
        objplaneta.foto01 = planeta[0].foto01_planeta;
        objplaneta.foto02 = planeta[0].foto02_planeta;

        return objplaneta.toJson();
    }

    async registrarPlaneta(massa, nome, raio, porbita, dstsol, foto01, foto02) {
        console.log("Registrando novo planeta...");
        console.log("Dados recebidos:", nome, massa, raio, porbita, dstsol, foto01, foto02);

        const planeta = new Planeta();

        planeta.nome = nome;
        planeta.massa = massa;
        planeta.raio = raio;
        planeta.porbita = porbita;
        planeta.dstsol = dstsol;
        planeta.foto01 = foto01;
        planeta.foto02 = foto02;

        this.#conexao.insertPlaneta(planeta.nome, planeta.massa, planeta.raio, planeta.porbita, planeta.dstsol, planeta.foto01, planeta.foto02);
    }

    async atualizarPlaneta(id, nome, massa, raio, porbita, dstsol, foto01, foto02) {
        console.log("Atualizando planeta...");
        console.log("Dados recebidos:", id, nome, massa, raio, porbita, dstsol, foto01, foto02);

        const planeta = new Planeta();

        planeta.id = id;
        planeta.nome = nome;
        planeta.massa = massa;
        planeta.raio = raio;
        planeta.porbita = porbita;
        planeta.dstsol = dstsol;
        planeta.foto01 = foto01;
        planeta.foto02 = foto02;

        try {
            const planetaExistente = await this.#conexao.selecionarPlanetaId(id);
            if (!planetaExistente) {
                throw new Error("Planeta não encontrado para atualização.");
            }

            const dt = await this.#conexao.atualizarPlaneta(planeta.nome, planeta.massa, planeta.raio, planeta.porbita, planeta.dstsol, planeta.foto01, planeta.foto02, planeta.id);

            console.log("Planeta atualizado com sucesso.");
            return dt;
        } catch (error) {
            console.error("Erro ao atualizar planeta:", error);
            throw error;
        }
    }

    async apagarPlaneta(id) {
        const dados = await this.#conexao.deletePlaneta(id);
        return dados;
    }
}

module.exports = PlanetaDAO;
