const Asteroide = require('../mvc/models/asteroidModel')
const Database = require('../repository/database')

class AsteroideDAO {

    #conexao

    constructor() {
        this.#conexao = new Database()
    }

    async consultarAsteroid() {

        const lista_asteroides = []
        const asteroides = await this.#conexao.selecionarAsteroid()

        if (asteroides) {
            for (const asteroide of asteroides) {
                const objasteroide = new Asteroide()
                objasteroide.id = asteroide.id_asteroidescometas
                objasteroide.nome = asteroide.nome_asteroidescometas
                objasteroide.tipo = asteroide.tipo_asteroidescometas
                objasteroide.tamanho = asteroide.tamanho_asteroidescometas
                objasteroide.orbita = asteroide.orbita_asteroidescometas
                objasteroide.foto01 = asteroide.foto01_asteroidescometas
                objasteroide.foto02 = asteroide.foto02_asteroidescometas
                lista_asteroides.push(objasteroide.toJson())
            }
        }

        return lista_asteroides
    }

    async consultarAsteroidId(id) {

        const asteroide = await this.#conexao.selecionarAsteroidId(id)

        const objasteroide = new Asteroide()

        objasteroide.id = asteroide[0].id_asteroidescometas
        objasteroide.nome = asteroide[0].nome_asteroidescometas
        objasteroide.tipo = asteroide[0].tipo_asteroidescometas
        objasteroide.tamanho = asteroide[0].tamanho_asteroidescometas
        objasteroide.orbita = asteroide[0].orbita_asteroidescometas
        objasteroide.foto01 = asteroide[0].foto01_asteroidescometas
        objasteroide.foto02 = asteroide[0].foto02_asteroidescometas


        return objasteroide.toJson()
    }



    registrarAsteroide(tipo, nome, tamanho, orbita, foto01, foto02) {
        console.log("Registrando novo asteroide...");
        console.log("Dados recebidos:", tipo, nome, tamanho, orbita, foto01, foto02);
    
        const asteroide = new Asteroide();
    
        asteroide.nomeAsteroide = nome;
        asteroide.tipoAsteroide = tipo;
        asteroide.tamanhoAsteroide = tamanho;
        asteroide.orbitaAsteroide = orbita;
        asteroide.foto01 = foto01;
        asteroide.foto02 = foto02;
    
        this.#conexao.insertAsteroid( asteroide.nomeAsteroide, asteroide.tipoAsteroide, asteroide.tamanhoAsteroide, asteroide.orbitaAsteroide, asteroide.foto01, asteroide.foto02);
    }
    
    async atualizarAsteroid(id,tipo, nome, tamanho, orbita, foto01, foto02) {
        console.log("Atualizando asteroide...");
        console.log("Dados recebidos:", id, tipo, nome, tamanho, orbita, foto01, foto02);
    
        const asteroide = new Asteroide();
    
        asteroide.id = id;
        asteroide.nomeAsteroide = nome;
        asteroide.tipoAsteroide = tipo;
        asteroide.tamanhoAsteroide = tamanho;
        asteroide.orbitaAsteroide = orbita;
        asteroide.foto01 = foto01;
        asteroide.foto02 = foto02;
    
        try {
            // Antes de atualizar a skin, primeiro verifique se a skin existe
            const asteroideExistente = await this.#conexao.selecionarAsteroideId(id);
            if (!asteroideExistente) {
                throw new Error("Asteroide não encontrado para atualização.");
            }
    
            // Agora, atualize a skin
            const dt = await this.#conexao.atualizarAsteroid(asteroide.tipoAsteroide, asteroide.nomeAsteroide, asteroide.tamanhoAsteroide, asteroide.orbitaAsteroide, asteroide.foto01, asteroide.foto02, asteroide.id);
    
            console.log("Asteroide atualizado com sucesso.");
            return dt;
        } catch (error) {
            console.error("Erro ao atualizar asteroide:", error);
            throw error;
        }
    }

    async apagarAsteroide(id) {
        const dados = await this.#conexao.deleteAsteroid(id)
        return dados
    }

}

module.exports = AsteroideDAO