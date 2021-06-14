const express = require('express');
const router = express.Router();
var connection = require('../lib/db');

router.get('/',function(req,res, next){
    //res.render('pages/Soal/testList');
    connection.query('SELECT t.idtests, t.nama_test, sf.semester, m.nama_matkul, t.waktu FROM test.tests AS t LEFT OUTER JOIN test.semesterf AS sf ON t.id_semester = sf.idsemesterF LEFT OUTER JOIN test.matakuliah AS m ON t.id_matkul = m.idmatakuliah;', function(err, rows){
        if(err){
            throw err;
            console.log(err);
        }
        res.render('pages/Soal/testList', {data: rows});
    });
});

router.get('/delete/(:test)',function(req,res,next){
    connection.query('DELETE FROM test.tests WHERE idtests = '+ req.params.test,function(err,result){
        if(err){
            throw err;
            console.log(err);
        }
        console.log('deleted')
        res.redirect('../')
    });
});

module.exports = router;