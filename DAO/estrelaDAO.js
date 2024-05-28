const Estrela = require('../mvc/models/estrelaModel')
const Database = require('../repository/database')

class EstrelaDAO {

    #conexao

    constructor() {
        this.#conexao = new Database()
    }

    async consultarEstrela() {

        const lista_estrelas = []
        const estrelas = await this.#conexao.selecionarEstrela()

        if (estrelas) {
            for (const estrela of estrelas) {
                const objestrela = new Estrela()
                objestrela.id = estrela.id_estrela
                objestrela.nome = estrela.nome_estrela
                objestrela.tipoes = estrela.tipo_espectral_estrela
                objestrela.magnitude = estrela.magnitude_estrela
                objestrela.idade = estrela.idade_estrela
                objestrela.dstterra = estrela.distancia_terra_estrela
                objestrela.foto01 = estrela.foto01_estrela
                objestrela.foto02 = estrela.foto02_estrela
                lista_estrelas.push(objestrela.toJson())
            }
        }

        return lista_estrelas
    }

    async consultarEstrelaId(id) {

        const estrela = await this.#conexao.selecionarEstrelaId(id)

        const objestrela = new Estrela()

        objestrela.id = estrela[0].id_estrela
        objestrela.nome = estrela[0].nome_estrela
        objestrela.tipoes = estrela[0].tipo_espectral_estrela
        objestrela.magnitude = estrela[0].magnitude_estrela
        objestrela.idade = estrela[0].idade_estrela
        objestrela.dstterra = estrela[0].distancia_terra_estrela
        objestrela.foto01 = estrela[0].foto01_estrela
        objestrela.foto02 = estrela[0].foto02_estrela


        return objestrela.toJson()
    }



    registrarestrela(nome,tipoes, magnitude, idade, dstterra, foto01, foto02) {
        console.log("Registrando nova estrela...");
        console.log("Dados recebidos:", tipoes, nome, magnitude, idade, dstterra, foto01, foto02);
    
        const estrela = new Estrela();
    
        estrela.nomeestrela = nome;
        estrela.tipoestrela = tipoes;
        estrela.magnitudeestrela = magnitude;
        estrela.idadeestrela = idade;
        estrela.dstterraestrela = dstterra;
        estrela.foto01 = foto01;
        estrela.foto02 = foto02;
    
        this.#conexao.insertEstrela( estrela.nomeestrela, estrela.tipoestrela, estrela.magnitudeestrela, estrela.idadeestrela, estrela.dstterraestrela, estrela.foto01, estrela.foto02);
    }
    
    async atualizarEstrela(id, nome, tipoes, magnitude, dstterra, idade, foto01, foto02){

        const estrela = new Estrela()
    
        estrela.id = id;
        estrela.nomeestrela = nome;
        estrela.tipoestrela = tipoes;
        estrela.magnitudeestrela = magnitude;
        estrela.idadeestrela = idade;
        estrela.dstterraestrela = dstterra;
        estrela.foto01 = foto01;
        estrela.foto02 = foto02;
    
        const dt = await this.#conexao.atualizarEstrela( estrela.id, estrela.nomeestrela, estrela.tipoestrela, estrela.magnitudeestrela, estrela.idadeestrela, estrela.dstterraestrela, estrela.foto01, estrela.foto02)
        return dt
    }

    // async atualizarEstrela(id, tipoes, nome, magnitude, idade, dstterra, foto01, foto02) {
    //     console.log("Atualizando estrela...");
    //     console.log("Dados recebidos:", id, tipoes, nome, magnitude, idade, dstterra, foto01, foto02);
    
    //     const estrela = new estrela();
    
    //     estrela.id = id;
    //     estrela.nomeestrela = nome;
    //     estrela.tipoestrela = tipoes;
    //     estrela.magnitudeestrela = magnitude;
    //     estrela.idadeestrela = idade;
    //     estrela.dstterraestrela = dstterra;
    //     estrela.foto01 = foto01;
    //     estrela.foto02 = foto02;
    
    //     try {
    //         // Antes de atualizar a skin, primeiro verifique se a skin existe
    //         const estrelaExistente = await this.#conexao.selecionarEstrelaId(id);
    //         if (!estrelaExistente) {
    //             throw new Error("estrela não encontrado para atualização.");
    //         }
    
    //         // Agora, atualize a skin
    //         const dt = await this.#conexao.atualizarEstrela(estrela.tipoestrela, estrela.nomeestrela, estrela.magnitudeestrela, estrela.idadeestrela, estrela.dstterraestrela, estrela.foto01, estrela.foto02, estrela.id);
    
    //         console.log("estrela atualizado com sucesso.");
    //         return dt;
    //     } catch (error) {
    //         console.error("Erro ao atualizar estrela:", error);
    //         throw error;
    //     }
    // }

    async apagarEstrela(id){
        const dados =  await this.#conexao.deleteEstrela(id)
        return dados
       }
    

}

module.exports = EstrelaDAO