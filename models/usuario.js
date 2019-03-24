var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var usuarioSchema = new Schema({
    nombre: { type: String, required: [true, 'El nombre es requerido'] },
    equipo_id: { type: Schema.Types.ObjectId, ref: 'Equipo' }
}, { collections: 'usuarios' });

module.exports = mongoose.model('Usuario', usuarioSchema);