const path = require('path')

function verificarAutenticacao(req, res, next) {
    // Verifica se o usuário está autenticado
    if (req.session.user && req.session.user.email) {
        // Se estiver autenticado, prossiga para a próxima middleware
        next();
    } else {
        // Se não estiver autenticado, redirecione para a página de login
        res.redirect('/admin');
    }
}
module.exports = (app) => {
app.get("/", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin","*")
    res.sendFile(path.resolve('mvc/views/public/principal.html'));
});

app.get("/Pindex", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin","*")
    res.sendFile(path.resolve('mvc/views/public/pindex.html'));
});


// app.get("/index", (req, res) => {
//     res.setHeader("Access-Control-Allow-Origin","*")

//     res.sendFile(path.resolve('mvc/views/public/index.html'));
// });


}