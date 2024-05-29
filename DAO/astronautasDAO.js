const astronauta = require('../mvc/models/astronautasModel')
const Database = require('../repository/database')

class AstronautaDAO {

    #conexao

    constructor() {
        this.#conexao = new Database()
    }

    async consultarAstronauta() {

        const lista_astronautas = []
        const astronautas = await this.#conexao.selecionarAstronauta()

        if (astronautas) {
            for (const astronauta of astronautas) {
                const objastronauta = new astronauta()
                objastronauta.id = astronauta.id_astronauta
                objastronauta.nome = astronauta.nome_astronauta
                objastronauta.idade = astronauta.idade_astronauta
                objastronauta.nacionalidade = astronauta.nacionalidade_astronauta
                objastronauta.sexo = astronauta.sexo_astronauta
                objastronauta.foto01 = astronauta.foto01_astronauta
                objastronauta.foto02 = astronauta.foto02_astronauta
                lista_astronautas.push(objastronauta.toJson())
            }
        }

        return lista_astronautas
    }

    async consultarAstronautaId(id) {

        const astronauta = await this.#conexao.selecionarAstronautaId(id)

        const objastronauta = new astronauta()

        objastronauta.id = astronauta[0].id_astronauta
        objastronauta.nome = astronauta[0].nome_astronauta
        objastronauta.idade = astronauta[0].idade_astronauta
        objastronauta.nacionalidade = astronauta[0].nacionalidade_astronauta
        objastronauta.idade = astronauta[0].idade_astronauta
        objastronauta.sexo = astronauta[0].sexo_astronauta
        objastronauta.foto01 = astronauta[0].foto01_astronauta
        objastronauta.foto02 = astronauta[0].foto02_astronauta


        return objastronauta.toJson()
    }



    registrarAstronauta(nome, idade, nacionalidade, sexo, foto01, foto02) {
        console.log("Registrando nova astronauta...");
        console.log("Dados recebidos:", idade, nome, nacionalidade, sexo, foto01, foto02);
    
        const astronauta = new astronauta();
    
        astronauta.nomeastronauta = nome;
        astronauta.tipoastronauta = idade;
        astronauta.nacionalidadeastronauta = nacionalidade;
        astronauta.idadeastronauta = idade;
        astronauta.sexoastronauta = sexo;
        astronauta.foto01 = foto01;
        astronauta.foto02 = foto02;
    
        this.#conexao.insertAstronauta( astronauta.nomeastronauta, astronauta.tipoastronauta, astronauta.nacionalidadeastronauta, astronauta.idadeastronauta, astronauta.sexoastronauta, astronauta.foto01, astronauta.foto02);
    }
    
    async atualizarAstronauta(id, idade, nome, nacionalidade, sexo, foto01, foto02) {
        console.log("Atualizando astronauta...");
        console.log("Dados recebidos:", id, idade, nome, nacionalidade, sexo, foto01, foto02);
    
        const astronauta = new astronauta();
    
        astronauta.id = id;
        astronauta.nomeastronauta = nome;
        astronauta.tipoastronauta = idade;
        astronauta.nacionalidadeastronauta = nacionalidade;
        astronauta.idadeastronauta = idade;
        astronauta.sexoastronauta = sexo;
        astronauta.foto01 = foto01;
        astronauta.foto02 = foto02;
    
        try {
            // Antes de atualizar a skin, primeiro verifique se a skin existe
            const astronautaExistente = await this.#conexao.selecionarAstronautaId(id);
            if (!astronautaExistente) {
                throw new Error("astronauta não encontrado para atualização.");
            }
    
            // Agora, atualize a skin
            const dt = await this.#conexao.Atualizarastronauta(astronauta.tipoastronauta, astronauta.nomeastronauta, astronauta.nacionalidadeastronauta, astronauta.idadeastronauta, astronauta.sexoastronauta, astronauta.foto01, astronauta.foto02, astronauta.id);
    
            console.log("astronauta atualizado com sucesso.");
            return dt;
        } catch (error) {
            console.error("Erro ao atualizar astronauta:", error);
            throw error;
        }
    }

    async apagarAstronauta(id) {
        const dados = await this.#conexao.deletarAstronauta(id)
        return dados
    }

}

module.exports = AstronautaDAO