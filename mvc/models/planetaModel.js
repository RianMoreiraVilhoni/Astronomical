class Planeta {
    
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

  getMassa() {
    return this.massa;
  }

  setMassa(massa) {
    this.massa = massa;
  }

  getRaio() {
    return this.raio;
  }

  setRaio(raio) {
    this.raio = raio;
  }

  getPOrbita() {
    return this.porbita;
  }

  setPOrbita(porbita) {
    this.porbita = porbita;
  }

  getDstSol() {
      return this.dstsol;
    }
  
    setPOrbita(dstsol) {
      this.dstsol = dstsol;
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

  constructor(id, nome, tipo, raio, porbita, dstsol, foto01, foto02) {
    this.id = id;
    this.nome = nome;
    this.tipo = tipo;
    this.raio = raio;
    this.dstsol = dstsol;
    this.porbita = porbita;
    this.foto01 = foto01;
    this.foto02 = foto02;
  }

  toJson(){
    return {
        "id": this.id,
        "nome": this.nome,
        "tipo":this.tipo,
        "raio":this.raio,
        "porbita":this.porbita,
        "dstsol":this.dstsol,
        "foto01":this.foto01,
        "foto02":this.foto02
    }
  }
}


module.exports = Planeta