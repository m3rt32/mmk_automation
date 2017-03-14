var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app     = express();
var path    = require("path");
var fs = require("fs");
var qr = require('qr-image');
const fileUpload = require('express-fileupload');
var images = require("images");

//achieve depencies
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(fileUpload());
mongoose.connect('mongodb://mert:mert@percy.mongo.xervo.io:27017/Bon5urez');
app.set('view engine', 'ejs'); 
//define structures



//create pages
//->index
app.get('/',function(req,res){
     res.render('index',{});
});

app.post('/mmkimg',function(request,result){
    if(request.body.name.length==0 || request.body.surname.length==0 || request.body.no.length==0
    || request.body.tel.length==0){
        result.render('sonuc',{sonuc:"Lütfen Boş Alan Bırakmayınız Efenim."});
    }else if(reques.body.no.length<8){
        result.render('sonuc',{sonuc:"Girilen okul numarası geçerli değildir"});
    }else{
        var Uye = require('./app/models/uyeler');
        var yazi = request.body.name+'|'+request.body.surname+'|'+ request.body.no+'|'+request.body.tel;
        var buffered = new Buffer(yazi);
        var shifted = buffered.toString('base64');
        Uye.find({okulno:request.body.no.toString()},function(err,res){
            if(!res.length){
                result.render('resimyukleme',{data:shifted}); //her şey okeyse resim yükleme şeysini aç
            }else{
                result.render('sonuc',{sonuc:"Daha önce kayıt yapılmış!"});
            }
        });
    }
});
app.post('/mmksave', function(req, res) {
  if (!req.files)
    return res.status(400).send('No files were uploaded.');
 
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file 
  let sampleFile = req.files.sampleFile;
 
  // Use the mv() method to place the file somewhere on your server 
  sampleFile.mv(__dirname+'/tempUploads/'+req.body.data+'.jpg', function(err) {
    if (err){
      return res.status(500).send(err);
    }else{
        var Uye = require('./app/models/uyeler');
        var solver = new Buffer(req.body.data,'base64');
        var solved = solver.toString().split('|'); //converted to array
        var yeni = new Uye({isim:solved[0],soyad:solved[1],okulno:solved[2],tel:solved[3],
            hex:req.body.data.toString()});
            yeni.save(function(err,obj){
                if(err){
                    res.render('sonuc',{sonuc:"Veri Kaydında hata oluştu!"});
                }else{
                    qr_olustur(req.body.data.toString());
                    res.render('sonuc',{sonuc:"Kayıt Tamamlandı"});
                }
            });
    }
  });
  });
function qr_olustur(metin){
var qr_svg = qr.image(metin, { type: 'png' });
qr_svg.pipe(require('fs').createWriteStream('qrCodes/'+metin+ '.png'));

}
app.listen(8080, function() {
  console.log('Server running at http://127.0.0.1:8080/');
});