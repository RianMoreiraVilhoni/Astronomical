

class Estrela {
    
  
    
  id
  // Métodos getters e setters (opcional)
  getId() {
    return this.id;
  }

  setId(value) {
    this.id = value;
  }

  nome
  getNome() {
    return this.nome;
  }

  setNome(nome) {
    this.nome = value;
  }

  getTipoes() {
    return this.tipoes;
  }

  setTipo(tipoes) {
    this.tipoes = tipoes;
  }

  getMagnitude() {
    return this.magnitude;
  }

  setMagnitude(magnitude) {
    this.magnitude = magnitude;
  }

  getIdade() {
    return this.idade;
  }

  setIdade(idade) {
    this.idade = idade;
  }
  getIdade() {
      return this.idade;
    }
  
  setIdade(idade) {
      this.idade = idade;
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

  constructor(id, nome, tipoes, magnitude, idade, dstterra, foto01, foto02) {
    this.id = id;
    this.nome = nome;
    this.tipoes = tipoes;
    this.magnitude = magnitude;
    this.idade = idade;
    this.dstterra = dstterra;
    this.foto01 = foto01;
    this.foto02 = foto02;
  }

  toJson(){
    return {
        "id": this.id,
        "nome": this.nome,
        "tipoes":this.tipoes,
        "magnitude":this.magnitude,
        "idade":this.idade,
        "dstterra":this.dstterra,
        "foto01":this.foto01,
        "foto02":this.foto02
    }
  }
}


module.exports = Estrela