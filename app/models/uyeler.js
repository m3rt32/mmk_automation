var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema 
var userSchema = new Schema({
  id:Schema.ObjectId,
  isim:String,
  soyad:String,
  okulno:String,
  tel:String,
  hex:String
});

// the schema is useless so far
// we need to create a model using it
var Uyeler = mongoose.model('Uyeler', userSchema);

// make this available to our users in our Node applications
module.exports = Uyeler;