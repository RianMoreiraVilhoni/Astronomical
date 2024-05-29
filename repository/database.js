const mysql = require("mysql2");

class Database {
    #connection;

    constructor() {
        // Configuração do banco
        this.#connection = mysql.createPool({
            host: "localhost",
            user: "root",
            password: "",
            database: "asstronomic",
        }).promise();
    }

//////////////////////////////////////////////////// Galaxia ////////////////////////////////////////////////////

async selecionarGalaxia() {
    const GalaxiaData = await this.#connection.query("SELECT * FROM galaxias;");
    return GalaxiaData[0];
}

async insertGalaxia(nome, tipos, tamanho, dstterra, foto01, foto02) {
    const sql = `
        INSERT INTO galaxias (nome_galaxia, tipo_galaxia, tamanho_galaxia, distancia_terra_galaxia,
        foto01_galaxia, foto02_galaxia)
        VALUES ('${nome}','${tipos}','${tamanho}','${dstterra}',
        '${foto01}','${foto02}');
    `
    const bd = await this.#connection.execute(sql);
    return bd[0];
}

async selecionarGalaxiaId(id) {
    const GalaxiaData = await this.#connection.query("select * from galaxias where id_galaxia =" + id)
    return GalaxiaData[0]
}

async deleteGalaxia(id) {
    const sql =
        `
    delete from galaxias
    where id_galaxias = ${id}`

    const dt = await this.#connection.execute(sql)
    return dt[0]
}

async atualizarGalaxia(nome, tipos, tamanho, dstterra, foto01, foto02) {
    console.log("Atualizando skin...");
    console.log("Dados recebidos:",  nome, tipos, tamanho, dstterra, foto01, foto02);

    const sqlSelectFoto = `SELECT foto01_galaxia, foto02_galaxia FROM galaxias WHERE id_galaxia = ?`;
    const [rows] = await this.#connection.execute(sqlSelectFoto, [id]);
    const fotoAtual1 = rows[0].foto01_galaxia;
    const fotoAtual2 = rows[0].foto02_galaxia;

    // Verifica se as fotos foram fornecidas na requisição
    const foto1Final = foto01 ? foto01 : fotoAtual1;
    const foto2Final = foto02 ? foto02 : fotoAtual2;

    const sqlUpdate = `
        UPDATE galaxias
        SET nome_galaxia = ?,
            tipo_galaxia = ?,
            tamanho_galaxia = ?,
            distancia_terra_galaxia = ?,
            foto01_galaxia = ?,
            foto02_galaxia = ?
        WHERE id_galaxia = ?
    `;
    const values = [nome, tipos, tamanho, dstterra, foto1Final, foto2Final, id];

    try {
        const [rows, fields] = await this.#connection.execute(sqlUpdate, values);
        console.log("Galaxia atualizada com sucesso!");
        return rows;
    } catch (error) {
        console.error('Erro ao atualizar Galaxia:', error);
        throw error;
    }
}

//////////////////////////////////////////////////// Astronauta ///////////////////////////////////////////////////

async selecionarAstronauta() {
    const [astronautaData] = await this.#connection.query("SELECT * FROM astronautas;");
    return astronautaData;
}

async inserirAstronauta(nome, idade, nacionalidade, sexo, foto01, foto02) {
    const sql = `
        INSERT INTO astronautas (nome_astronauta, idade_astronauta, nacionalidade_astronauta, sexo_astronauta, foto01_astronauta, foto02_astronauta)
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    const [result] = await this.#connection.execute(sql, [nome, idade, nacionalidade, sexo, foto01, foto02]);
    return result;
}

async selecionarAstronautaPorId(id) {
    const [astronautaData] = await this.#connection.query("SELECT * FROM astronautas WHERE id_astronauta = ?", [id]);
    return astronautaData[0];
}

async deletarAstronauta(id) {
    const sql = "DELETE FROM astronautas WHERE id_astronauta = ?";
    const [result] = await this.#connection.execute(sql, [id]);
    return result;
}

async atualizarAstronauta(id, nome, idade, nacionalidade, sexo, foto01, foto02) {
    console.log("Atualizando astronauta...");
    console.log("Dados recebidos:", nome, idade, nacionalidade, sexo, foto01, foto02);

    const sqlSelectFoto = "SELECT foto01_astronauta, foto02_astronauta FROM astronautas WHERE id_astronauta = ?";
    const [rows] = await this.#connection.execute(sqlSelectFoto, [id]);
    const fotoAtual1 = rows[0].foto01_astronauta;
    const fotoAtual2 = rows[0].foto02_astronauta;

    const foto1Final = foto01 ? foto01 : fotoAtual1;
    const foto2Final = foto02 ? foto02 : fotoAtual2;

    const sqlUpdate = `
        UPDATE astronautas
        SET nome_astronauta = ?, idade_astronauta = ?, nacionalidade_astronauta = ?, sexo_astronauta = ?, foto01_astronauta = ?, foto02_astronauta = ?
        WHERE id_astronauta = ?
    `;
    const values = [nome, idade, nacionalidade, sexo, foto1Final, foto2Final, id];

    try {
        const [result] = await this.#connection.execute(sqlUpdate, values);
        console.log("Astronauta atualizado com sucesso!");
        return result;
    } catch (error) {
        console.error("Erro ao atualizar astronauta:", error);
        throw error;
    }
}


    //////////////////////////////////////////////////// Asteroide ////////////////////////////////////////////////////
    async selecionarAsteroid() {
        const asteroidData = await this.#connection.query("SELECT * FROM asteroidescometas;");
        return asteroidData[0];
    }

    async insertAsteroid(tipo, nome, tamanho, orbita, foto01, foto02) {
        const sql = `
            INSERT INTO asteroidescometas (nome_asteroidescometas,tipo_asteroidescometas, tamanho_asteroidescometas, orbita_asteroidescometas, 
            foto01_asteroidescometas, foto02_asteroidescometas)
            VALUES ('${nome}','${tipo}','${tamanho}','${orbita}',
            '${foto01}','${foto02}');
        `
        const bd = await this.#connection.execute(sql);
        return bd[0];
    }

    async selecionarAsteroidId(id) {
        const asteroidData = await this.#connection.query("select * from asteroidescometas where id_asteroidescometas =" + id)
        return asteroidData[0]
    }

    async deleteAsteroid(id) {
        const sql =
            `
        delete from asteroidescometas
        where id_asteroidescometas = ${id}`

        const dt = await this.#connection.execute(sql)
        return dt[0]
    }

    async atualizarAsteroid(nome, tipo, tamanho, orbita, foto01, foto02) {
        console.log("Atualizando skin...");
        console.log("Dados recebidos:",  nome, tipo, tamanho, orbita, foto01, foto02);
    
        const sqlSelectFoto = `SELECT foto01_asteroidescometas, foto02_asteroidescometas FROM asteroidescometas WHERE id_asteroidescometas = ?`;
        const [rows] = await this.#connection.execute(sqlSelectFoto, [id]);
        const fotoAtual1 = rows[0].foto01_asteroidescometas;
        const fotoAtual2 = rows[0].foto02_asteroidescometas;
    
        // Verifica se as fotos foram fornecidas na requisição
        const foto1Final = foto01 ? foto01 : fotoAtual1;
        const foto2Final = foto02 ? foto02 : fotoAtual2;
    
        const sqlUpdate = `
            UPDATE asteroidescometas
            SET nome_asteroidescometas = ?,
                tipo_asteroidescometas = ?,
                tamanho_asteroidescometas = ?,
                orbita_asteroidescometas = ?,
                foto01_asteroidescometas = ?,
                foto02_asteroidescometas = ?
            WHERE id_asteroidescometas = ?
        `;
        const values = [nome,tipo, tamanho, orbita, foto1Final, foto2Final, id];
    
        try {
            const [rows, fields] = await this.#connection.execute(sqlUpdate, values);
            console.log("Asteroide atualizada com sucesso!");
            return rows;
        } catch (error) {
            console.error('Erro ao atualizar asteroide:', error);
            throw error;
        }
    }
    
    

//////////////////////////////////////////////////// planetas ////////////////////////////////////////////////////
async selecionarPlaneta() {
    const planetaData = await this.#connection.query("SELECT * FROM planetas;");
    return planetaData[0];
}

async insertPlaneta(nome, massa,raio, porbita, dstsol, foto01, foto02) {
    const sql = `
        INSERT INTO planetas (nome_planeta, massa_planeta, raio_planeta, periodo_orbital_planeta, distancia_sol_planeta, foto01_planeta, foto02_planeta)
        VALUES ('${nome}','${massa}','${raio}','${porbita}','${dstsol}','${foto01}','${foto02}');
    `
    const bd = await this.#connection.execute(sql);
    return bd[0];
}

async selecionarPlanetaId(id) {
    const planetaData = await this.#connection.query("select * from planetas where id_planeta =" + id)
    return planetaData[0]
}

async deletePlaneta(id) {
    const sql = await this.#connection.query("DELETE from planetas where id_planeta =" + id)
    console.log("Query SQL para exclusão:", sql); // Adição de log
    const dt = await this.#connection.execute(sql);
    console.log("Resultado da exclusão:", dt); // Adição de log
    return dt[0];
}


async atualizarPlaneta(nome, massa,raio, porbita, dstsol, foto01, foto02) {
    console.log("Atualizando skin...");
    console.log("Dados recebidos:",  nome, massa,raio, porbita, dstsol, foto01, foto02);

    const sqlSelectFoto = `SELECT foto01_planeta, foto02_planeta FROM planetas WHERE id_planeta = ?`;
    const [rows] = await this.#connection.execute(sqlSelectFoto, [id]);
    const fotoAtual1 = rows[0].foto01_planeta;
    const fotoAtual2 = rows[0].foto02_planeta;

    // Verifica se as fotos foram fornecidas na requisição
    const foto1Final = foto01 ? foto01 : fotoAtual1;
    const foto2Final = foto02 ? foto02 : fotoAtual2;

    const sqlUpdate = `
        UPDATE planetas
        SET nome_planeta = ?,
            massa_planeta = ?,
            raio_planeta = ?,
            perido_orbital_planeta = ?,
            raio_planeta = ?,
            distancia_do_sol = ?,
            foto02_planeta = ?
        WHERE id_planeta = ?
    `;
    const values = [nome, massa,raio, porbita, dstsol, foto1Final, foto2Final, id];

    try {
        const [rows, fields] = await this.#connection.execute(sqlUpdate, values);
        console.log("Planeta atualizado com sucesso!");
        return rows;
    } catch (error) {
        console.error('Erro ao atualizar planeta:', error);
        throw error;
    }
}


    //////////////////////////////////////////////////// Estrelas ////////////////////////////////////////////////////
    async selecionarEstrela() {
        const estrelaData = await this.#connection.query("SELECT * FROM estrelas;");
        return estrelaData[0];
    }

    async insertEstrela(nome, tipoes, magnitude, idade, dstterra, foto01, foto02) {
        const sql = `
            INSERT INTO estrelas (nome_estrela, tipo_espectral_estrela, magnitude_estrela, idade_estrela, distancia_terra_estrela,
            foto01_estrela, foto02_estrela)
            VALUES ('${nome}','${tipoes}','${magnitude}','${idade}','${dstterra}',
            '${foto01}','${foto02}');
        `
        const bd = await this.#connection.execute(sql);
        return bd[0];
    }

    async selecionarEstrelaId(id) {
        const estrelaData = await this.#connection.query("select * from estrelas where id_estrela =" + id)
        return estrelaData[0]
    }

    async deleteEstrela(id) {
        const sql =
            `
        delete from estrelas
        where id_estrela = ${id}`

        const dt = await this.#connection.execute(sql)
        return dt[0] 
    }



    async atualizarEstrela(id, nome, tipoes, magnitude, idade, dstterra, foto01, foto02) {
        const sql = `update estrelas 
        set id_estrela = "${id}",
            nome_estrela = "${nome}",
            tipo_espectral_estrela = "${tipoes}",
            magnitude_estrela = "${magnitude}",
            idade_estrela = ${idade}   ,
            distancia_terra_estrela = "${dstterra}",
            foto01_estrela = "${foto01}",
            foto02_estrela = "${foto02}"
         `

        const dt = await this.#connection.execute(sql)
        return dt[0]
    
      
    }

    // async atualizarEstrela(nome, tipoes, magnitude, idade, dstterra, foto01, foto02) {
    //     console.log("Atualizando skin...");
    //     console.log("Dados recebidos:",  nome, tipoes, magnitude, idade, dstterra, foto01, foto02);
    
    //     const sqlSelectFoto = `SELECT foto01_estrela, foto02_estrela FROM estrelas WHERE id_estrela = ?`;
    //     const [rows] = await this.#connection.execute(sqlSelectFoto, [id]);
    //     const fotoAtual1 = rows[0].foto01_estrela;
    //     const fotoAtual2 = rows[0].foto02_estrela;
    
    //     // Verifica se as fotos foram fornecidas na requisição
    //     const foto1Final = foto01 ? foto01 : fotoAtual1;
    //     const foto2Final = foto02 ? foto02 : fotoAtual2;
    
    //     const sqlUpdate = `
    //         UPDATE estrelas
    //         SET nome_estrela = ?,
    //             tipo_espectral_estrela = ?,
    //             magnitude_estrela = ?,
    //             idade_estrela = ?,
    //             distancia_terra_estrela = ?,
    //             foto01_estrela = ?,
    //             foto02_estrela = ?
    //         WHERE id_estrela = ?
    //     `;
    //     const values = [nome, tipoes, magnitude, idade, dstterra, foto1Final, foto2Final, id];
    
    //     try {
    //         const [rows, fields] = await this.#connection.execute(sqlUpdate, values);
    //         console.log("Estrela atualizada com sucesso!");
    //         return rows;
    //     } catch (error) {
    //         console.error('Erro ao atualizar estrela:', error);
    //         throw error;
    //     }
    // }


    
    //////////////////////////////////////////////////// User ////////////////////////////////////////////////////

    
        async verificarLogin(email, senha) {
            try {
                // Consulta SQL para verificar o login
                const sql = 'SELECT * FROM usuarios WHERE email_usuario = ? AND senha_usuario = ?';
                const [rows, fields] = await this.#connection.execute(sql, [email, senha]);
    
                // Retorna o resultado da consulta
                return rows;
            } catch (error) {
                // Trate os erros aqui
                console.error('Erro ao verificar login:', error);
                throw error; // Você pode tratar de forma mais apropriada de acordo com o seu contexto
            }
        }
    
        async insertUser(nome, senha, email) {
            const sql = `
                INSERT INTO usuarios (nome_usuario, email_usuario, senha_usuario)
                VALUES (?, ?, ?)
            `;
            const params = [nome, email, senha];
    
            try {
                const bd = await this.#connection.execute(sql, params);
                return bd[0];
            } catch (error) {
                console.error('Erro ao inserir usuário:', error);
                throw error;
            }
        }
    }
    
    

module.exports = Database;

