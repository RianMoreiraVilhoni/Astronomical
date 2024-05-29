const Galaxia = require('../mvc/models/galaxiasModel')
const Database = require('../repository/database')

class GalaxiaDAO {
    #conexao

    constructor() {
        this.#conexao = new Database()
    }

    async consultarGalaxia() {

        const lista_galaxias = []
        const galaxias = await this.#conexao.selecionarGalaxia()

        if (galaxias) {
            for (const galaxia of galaxias) {
                const objgalaxia = new galaxia()
                objgalaxia.id = galaxia.id_galaxia
                objgalaxia.nome = galaxia.nome_galaxia
                objgalaxia.tipoes = galaxia.tipo_espectral_galaxia
                objgalaxia.tamanho = galaxia.tamanho_galaxia
                objgalaxia.dstterra = galaxia.distancia_terra_galaxia
                objgalaxia.foto01 = galaxia.foto01_galaxia
                objgalaxia.foto02 = galaxia.foto02_galaxia
                lista_galaxias.push(objgalaxia.toJson())
            }
        }

        return lista_galaxias
    }

    async consultarGalaxiaId(id) {

        const galaxia = await this.#conexao.selecionarGalaxiaId(id)

        const objgalaxia = new galaxia()

        objgalaxia.id = galaxia[0].id_galaxia
        objgalaxia.nome = galaxia[0].nome_galaxia
        objgalaxia.tipoes = galaxia[0].tipo_espectral_galaxia
        objgalaxia.magnitude = galaxia[0].magnitude_galaxia
        objgalaxia.idade = galaxia[0].idade_galaxia
        objgalaxia.dstterra = galaxia[0].distancia_terra_galaxia
        objgalaxia.foto01 = galaxia[0].foto01_galaxia
        objgalaxia.foto02 = galaxia[0].foto02_galaxia


        return objgalaxia.toJson()
    }



    registrarGalaxia(nome, tipo, tamanho, dstterra, foto01, foto02) {
        console.log("Registrando nova galaxia...");
        console.log("Dados recebidos:", nome, tipo, tamanho, dstterra, foto01, foto02);
    
        const galaxia = new galaxia();
    
        galaxia.nomegalaxia = nome;
        galaxia.tipogalaxia = tipo;
        galaxia.tamanhogalaxia = tamanho;
        galaxia.dstterragalaxia = dstterra;
        galaxia.foto01 = foto01;
        galaxia.foto02 = foto02;
    
        this.#conexao.insertGalaxia( galaxia.nomegalaxia, galaxia.tipogalaxia, galaxia.dstterragalaxia, galaxia.foto01, galaxia.foto02);
    }
    
    async atualizarGalaxia(id, nome, tipo, tamanho, dstterra, foto01, foto02) {
        console.log("Atualizando galaxia...");
        console.log("Dados recebidos:", id, nome, tipo, tamanho, dstterra, foto01, foto02);
    
        const galaxia = new galaxia();
    
        galaxia.id = id;
        galaxia.nomegalaxia = nome;
        galaxia.tipogalaxia = tipo;
        galaxia.tamanhogalaxia = tamanho;
        galaxia.dstterragalaxia = dstterra;
        galaxia.foto01 = foto01;
        galaxia.foto02 = foto02;
    
        try {
            // Antes de atualizar a skin, primeiro verifique se a skin existe
            const galaxiaExistente = await this.#conexao.selecionarGalaxiaId(id);
            if (!galaxiaExistente) {
                throw new Error("galaxia não encontrado para atualização.");
            }
    
            // Agora, atualize a skin
            const dt = await this.#conexao.atualizargalaxia(galaxia.nomegalaxia, galaxia.tipogalaxia, galaxia.tamanhogalaxia, galaxia.dstterragalaxia, galaxia.foto01, galaxia.foto02, galaxia.id);
    
            console.log("galaxia atualizada com sucesso.");
            return dt;
        } catch (error) {
            console.error("Erro ao atualizar galaxia:", error);
            throw error;
        }
    }

    async apagarGalaxia(id) {
        const dados = await this.#conexao.deleteGalaxia(id)
        return dados
    }

}

module.exports = GalaxiaDAO