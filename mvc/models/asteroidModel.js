class Asteroide {
    
  
    
  id
  // Métodos getters e setters (opcional)
  getId() {
    return this.id;
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

  getTipo() {
    return this.tipo;
  }

  setTipo(tipo) {
    this.tipo = tipo;
  }

  getTamanho() {
    return this.tamanho;
  }

  setTamanho(tamanho) {
    this.tamanho = tamanho;
  }

  getOrbita() {
    return this.orbita;
  }

  setOrbita(orbita) {
    this.orbita = orbita;
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

  constructor(id, nome, tipo, tamanho, orbita, foto01, foto02) {
    this.id = id;
    this.nome = nome;
    this.tipo = tipo;
    this.tamanho = tamanho;
    this.orbita = orbita;
    this.foto01 = foto01;
    this.foto02 = foto02;
  }

  toJson(){
    return {
        "id": this.id,
        "nome": this.nome,
        "tipo":this.tipo,
        "tamanho":this.tamanho,
        "orbita":this.orbita,
        "foto01":this.foto01,
        "foto02":this.foto02
    }
  }
}


module.exports = Asteroide