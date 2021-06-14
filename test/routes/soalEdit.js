const express = require('express');
var connection = require('../lib/db');
const router = express.Router();

router.get('/(:test)',function(req,res, next){
    //res.render('pages/Soal/soal');
    connection.query('SELECT * FROM test.soal WHERE idsoal =' + req.params.test, function(err, d1){
        if(err){
            console.log(err);
            throw err;
            
        }
        res.render('pages/Soal/soalEdit', {t:d1});
    });
});
 
router.post('/(:test)/edit/(:idsoal)', function(req,res,next){
    let soal = req.body.soal; 
    let tipe = req.body.tipe;
    var idsoal = req.params.idsoal;
    var test = req.params.test;
    connection.query('UPDATE test.soal SET soal = ?, tipe = ? WHERE idsoal = ' + idsoal,[soal,tipe], function(err, result){
        if(err){
            console.log(err);
            throw err;
        } 
        res.redirect('../../../soalList/'+test);
        console.log('updated');
    });
});

module.exports = router;