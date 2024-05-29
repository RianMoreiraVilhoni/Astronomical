class Astronauta {

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
  
    getIdade() {
      return this.idade;
    }
  
    setIdade(idade) {
      this.idade = idade;
    }
  
    getNacionalidade() {
      return this.nacionalidade;
    }
  
    setNacionalidade(nacionalidade) {
      this.nacionalidade = nacionalidade;
    }

    getSexo() {
        return this.sexo;
    }
    
    setSexo(sexo) {
        this.sexo = sexo;
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

    constructor(id, nome, idade, sexo, foto01, foto02) {
      this.id = id;
      this.nome = nome;
      this.idade = idade;
      this.sexo = sexo;
      this.foto01 = foto01;
      this.foto02 = foto02;
    }

    toJson(){
      return {
          "id": this.#id,
          "nome": this.nome,
          "idade":this.idade,
          "sexo":this.sexo,
          "foto01":this.foto01,
          "foto02":this.foto02
      }
    }
}


module.exports = Astronauta
