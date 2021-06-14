const express = require('express');
var connection = require('../lib/db');
const router = express.Router();

router.get('/(:test)',function(req,res, next){
    //res.render('pages/Soal/soal');
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
            res.render('pages/Soal/soalAdd', {data: d2, t:d1});
        });
    });
});
 
router.post('/add/(:test)', function(req,res,next){
    let test = req.params.test
    let soal = req.body.soal; 
    let tipe = req.body.tipe;

    connection.query('INSERT INTO test.soal(soal,tipe,test) VALUES(?, ?, ?);',[soal,tipe,test], function(err, result){
        if(err){
            console.log(err);
            throw err;
        } 
        res.redirect('../../soalList/'+test);
        console.log('Added');
    });
});

module.exports = router;