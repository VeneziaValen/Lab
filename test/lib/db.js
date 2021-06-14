var mysql=require('mysql2');
var connection=mysql.createConnection({
   host:'localhost',
   user:'root',
   password:'Venezia1402',
   database:'test',
   multipleStatements: true
 });
connection.connect(function(error){
   if(!!error){
     console.log(error);
   }else{
     console.log('Connected!:)');
   }
 });  
module.exports = connection; 