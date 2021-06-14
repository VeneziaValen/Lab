const express = require('express');
var connection = require('../lib/db');
const router = express.Router();

router.get('/(:soal)',function(req,res, next){
    //res.render('pages/Soal/soal');
    connection.query('SELECT * FROM test.jawabpg WHERE soal =' + req.params.soal, function(err, d1){
        if(err){
            console.log(err);
            throw err;
            
        }
        connection.query('SELECT * FROM test.soal WHERE idsoal =' + req.params.soal, function(err, d2){
            if(err){
                console.log(err);
                throw err;
                
            }
            res.render('pages/Soal/soalPilihan', {data: d1, t:d2});
        });
    });
});
router.post('/(:soal)/check/(:pil)', function(req,res,next){
    var soal = req.params.soal;
    var pil = req.params.pil;
    connection.query('UPDATE test.jawabpg SET benar = CASE WHEN idjawabpg = ? THEN 1 ELSE 0 END WHERE soal = ' + soal, [pil], function(err, dd1){
        if(err){
            console.log(err);
            throw err;
            
        }
        console.log('updated');
        res.redirect('../');
    });
});
router.post('/(:soal)/add', function(req,res,next){
    var soal = req.params.soal;
    var jawab = req.body.pilihan;
    connection.query('INSERT INTO test.jawabpg(soal, jawab) VALUES(?, ?);',[soal,jawab], function(err, result){
        if(err){
            console.log(err);
            throw err;
            
        }
        console.log('added');
        res.redirect('./');
    });
});

router.get('/(:soal)/delete/(:pil)',function(req,res,next){
    connection.query('DELETE FROM test.jawabpg WHERE idjawabpg = '+ req.params.pil,function(err,result){
        if(err){
            throw err;
            console.log(err);
        }
        console.log('deleted')
        res.redirect('../')
    });
});

module.exports = router;