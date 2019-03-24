var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var clienteSchema = new Schema({
    usuario_id: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
    email: { type: String, required: [true, 'El correo es Necesario'] }
}, { collections: 'clientes' });

module.exports = mongoose.model('Cliente', clienteSchema);