// Conexão com MySQL
const mysql = require('mysql2');
const conexao = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tarefas'
});
module.exports = conexao;