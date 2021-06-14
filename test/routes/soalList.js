const express = require('express');
const router = express.Router();
var connection = require('../lib/db');

router.get('/(:test)',function(req,res, next){
    //res.render('pages/Soal/testList');
    connection.query('SELECT * FROM test.tests WHERE idtests =' + req.params.test, function(err, d1){
        if(err){
            console.log(err);
            throw err;
            
        }
        connection.query('SELECT * FROM test.soal WHERE test =' + req.params.test, function(err, d2){
            if(err){
                console.log(err);
                throw err;
                
            }
            res.render('pages/Soal/soalList', {data: d2, t:d1});
        });
    });
});

router.get('/(:test)/delete/(:soal)',function(req,res,next){
    connection.query('DELETE FROM test.soal WHERE idsoal = '+ req.params.soal,function(err,result){
        if(err){
            throw err;
            console.log(err);
        }
        console.log('deleted')
        res.redirect('../')
    });
});

module.exports = router;