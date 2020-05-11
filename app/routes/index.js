var express = require('express');
var router = express.Router();

// GET home API
router.get('/', function(req, res, next) {
  res.render('index', { title: 'API Carros' });
});

// GET todos os carros
router.get('/api/carros', function (req, res, next) {
  var db = require('../db');
  var Carro = db.Mongoose.model('carros', db.CarroSchema, 'carros');
  Carro.find({}).lean().exec(function(e, docs){
    res.json(docs);
    res.end();
  });
});

// GET carro por id
router.get('/api/carros/:id', function (req, res, next){
  var db = require('../db');
  var Carro = db.Mongoose.model('carros', db.CarroSchema, 'carros');
  Carro.find({ _id: req.params.id }).lean().exec(function (e, docs) {
    res.json(docs);
    res.end();
  });
});

// POST cadastra carro
router.post('/api/carros/', function (req, res, next) {  
  var db = require('../db');
  var Carro = db.Mongoose.model('carros', db.CarroSchema, 'carros');
  var novocarro = new Carro({ Cor: req.body.Cor, Placa: req.body.Placa, Ano: req.body.Ano, Modelo: req.body.Modelo });
  novocarro.save(function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
      res.end();
      return;
    }
    res.json({ id: novocarro.id });
    res.end();
  });
});


// PUT altera carro
router.put('/api/carros/:id', function (req, res, next) {
  var db = require('../db');
  var Carro = db.Mongoose.model('carros', db.CarroSchema, 'carros');
  Carro.findOneAndUpdate({ _id: req.params.id }, req.body, { upsert: true }, function (err, doc) {
    if (err) {
      res.status(400).json({ error: err.message });
      res.end();
      return;
    }
    res.json(req.body);
    res.end();
  });
});


// DELETE um carro
router.delete('/api/carros/:id', function (req, res, next) {
  var db = require('../db');
  var Carro = db.Mongoose.model('carros', db.CarroSchema, 'carros');
  Carro.find({ _id: req.params.id }).remove( function(err){
    if (err) {
      res.status(400).json({ error: err.message });
      res.end();
      return;
    }
    res.json({ success: true })
    res.end();
  });
});


module.exports = router;
