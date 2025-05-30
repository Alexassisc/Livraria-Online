const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    titulo: {type: String, require: true},
    autor: {type: String, require: false},
    disponivel: {type: Boolean, default: true}
});

module.exports = mongoose.model('Book', BookSchema);