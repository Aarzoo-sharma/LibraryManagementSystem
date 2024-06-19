const mysql  = require('mysql');
const conn = mysql.createConnection(
{
    host:'localhost',            
    user:'root',              
    password: 'mysqli',
    database:'library',
    multipleStatements: true   
});

module.exports=conn;