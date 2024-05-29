class Galaxia {
    #id
    // Métodos getters e setters (opcional)
    getId() {
      return this.#id;
    }
  
    setId(id) {
      this.id = id;
    }
  
    getNome() {
      return this.nome;
    }
  
    setNome(nome) {
      this.nome = nome;
    }
  
    getTipos() {
      return this.tipos;
    }
  
    setTipo(tipos) {
      this.tipos = tipos;
    }
  
    getTamanho() {
      return this.tamanho;
    }
  
    setTamanho(tamanho) {
      this.tamanho = tamanho;
    }

    getDstTerra() {
        return this.dstterra;
    }
    
    setDstTerra(dstterra) {
        this.dstterra = dstterra;
    }
  
    getFoto1() {
      return this.foto01;
    }
  
    setFoto1(foto01) {
      this.foto01 = foto01;
    }
  
    getFoto2() {
      return this.foto02;
    }
  
    setFoto2(foto02) {
      this.foto02 = foto02;
    }

    constructor(id, nome, tipos, tamanho, dstterra, foto01, foto02) {
      this.id = id;
      this.nome = nome;
      this.tipos = tipos;
      this.tamanho = tamanho;
      this.dstterra = dstterra;
      this.foto01 = foto01;
      this.foto02 = foto02;
    }

    toJson(){
      return {
          "id": this.#id,
          "nome": this.nome,
          "tipos":this.tipos,
          "tamanho":this.tamanho,
          "dstterra":this.dstterra,
          "foto01":this.foto01,
          "foto02":this.foto02
      }
    }
}


module.exports = Galaxia