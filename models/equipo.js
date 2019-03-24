var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var uniqueValidator = require("mongoose-unique-validator");

var equipoSchema = new Schema({
    nombre: { type: String, required: [true, 'El nombre es necesario'] }
}, { collections: 'equipos' });

equipoSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser unico' });
module.exports = mongoose.model('Equipo', equipoSchema);