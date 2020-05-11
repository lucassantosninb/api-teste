var mongoose = require('mongoose');

const url = `mongodb://db/api-carro`;

mongoose.connect(url, { useNewUrlParser: true });

var carroSchema = new mongoose.Schema({
  Cor: {
    type: String,
    minlength: [3, 'O campo deve conter 3 letras'],
    maxlength: [3, 'O campo deve conter 3 letras'],
    match: [/^[A-Za-z]{3}/, 'O campo deve conter 3 letras'],
    required: [true, 'O campo é obrigatório!']
  },
  Placa: {
    type: String,
    minlength: [9, 'O campo deve conter o formato XXXX-XXXX'],
    maxlength: [9, 'O campo deve conter o formato XXXX-XXXX'],
    match: [/\w{4}-\w{4}/, 'O campo deve conter o formato XXXX-XXXX'],
    required: [true, 'O campo é obrigatório!'],
    unique: true
  },
  Ano: {
    type: Number,
    min: [1900, 'O campo deve conter um valor entre 1886 e 2020'],
    max: [2020, 'O campo deve conter um valor entre 1886 e 2020'],
    required: [true, 'O campo é obrigatório!']
  },
  Modelo: {
    type: Number,
    min: [1900, 'O campo deve conter um valor entre 1886 e 2020'],
    max: [2020, 'O campo deve conter um valor entre 1886 e 2020'],
    required: [true, 'O campo é obrigatório!']
  }
}, { collection: 'carros'}
);

module.exports = { Mongoose: mongoose, CarroSchema: carroSchema }