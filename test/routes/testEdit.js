const express = require('express');
var connection = require('../lib/db');
const router = express.Router();

var selObjS;
var selValueS;

var selObjM;
var selValueM;

function singleSelectChangeValueS() {
    //Getting Value
    //var selValue = document.getElementById("singleSelectDD").value;
    selObjS = document.getElementById("semesterf");
    selValueS = selObj.options[selObj.selectedIndex].value;
    //Setting Value
}

function singleSelectChangeValueM() {
    //Getting Value
    //var selValue = document.getElementById("singleSelectDD").value;
    selObjM = document.getElementById("matkul");
    selValueM = selObj.options[selObj.selectedIndex].value;
    //Setting Value
}

/*
var queries = [
    "SELECT nama_matkul FROM test.matakuliah",
    "SELECT semester FROM test.semesterf"
];
*/

router.get('/(:test)',function(req,res, next){
    //res.render('pages/Soal/soal');
    connection.query('SELECT * FROM test.matakuliah;', function(err, dd1){
        if(err){
            throw err;
            console.log(err);
        }
        connection.query('SELECT * FROM test.semesterf;', function(err, dd2){
            if(err){
                console.log(err);
                throw err;
            }
            connection.query('SELECT * FROM test.tests WHERE idtests = ' + req.params.test, function(err, dd3){
                if(err){
                    console.log(err);
                    throw err;
                }
                res.render('pages/Soal/testEdit', {matkul: dd1,semester: dd2,test:dd3[0]});
            });
            
        });
    });
}); 

router.post('/update/(:test)', function(req,res,next){
    var nama_test = req.body.testName;
    let semester = req.body.semesterf; 
    let matkul = req.body.matkul;
    let waktu = req.body.time;

    connection.query('UPDATE test.tests SET nama_test = ?, id_semester = ?, id_matkul = ?, waktu = ? WHERE idtests = '+ req.params.test ,[nama_test,semester,matkul,waktu], function(err, test){
        if(err){
            console.log(err);
            throw err;
        }
        console.log('updated');
        res.redirect('../../testList');
        
    });
});

module.exports = router;