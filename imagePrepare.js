var images = require("images");
var mongoose = require('mongoose');
var Jimp = require("jimp");
images("dummpy.png").draw(images("qrCodes/TWVydHxLxLFyxLFtZ2VyaXwxNDAyMTcwMDh8MDUzNzIyNDY3Mjk=.png").resize(100,100), 300,100).save("output.jpg");
var Jimp = require("jimp");

var fileName = 'output.jpg';
var imageCaption = 'Image caption';
var loadedImage;

Jimp.read(fileName)
    .then(function (image) {
        loadedImage = image;
        return Jimp.loadFont(Jimp.FONT_SANS_16_BLACK);
    })
    .then(function (font) {
        loadedImage.print(font, 10, 10, imageCaption)
                   .write(fileName);
    })
    .catch(function (err) {
        console.error(err);
    });