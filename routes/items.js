var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/items')
var items = db.get('items')
var request = require('supertest')

router.post('/', function (req, res, next){
  items.insert(req.body, function (err, item){
    if (err) {
      res.send(err);
    }
    res.status(201).json(item);
  });
});

router.put('/:id', function (req, res, next){
  items.findAndModify({_id: req.params.id}, req.body, function(err, item){
    if (err) {
      throw err
    }
    res.json(req.body);
  })
})

router.get('/:id', function (req, res, next){
  items.findOne({_id: req.params.id}, function (err, item){
    if (err) {
      res.send(err);
    }
    res.status(200).json(item);
  });
});

module.exports = router;
