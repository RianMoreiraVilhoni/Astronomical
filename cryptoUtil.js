const crypto = require('crypto');

function criptografarSenha(senha) {

    const hash = crypto.createHash('sha256');
    hash.update(senha);
    const senhaCriptografada = hash.digest('hex');
    return senhaCriptografada;
    
}

module.exports = criptografarSenha;