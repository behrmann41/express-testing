var app = require('./../app.js');
var db = require('monk')('localhost/items')
var items = db.get('items')
var assert = require('assert')
var request = require('supertest')

before(function(done) {
  items.remove({}, function() {
    items.insert({title: 'Master Sword', _id: '55c050595ae876b6b79ad318'}, function() {
      done();
    });
  });
});

describe('POST api/items', function (){
  it('creates a new resource', function (done){
    request(app)
      .post('/api/items')
      .send({title: 'from test'})
      .expect(201)
      .end(function(err, res){
        if (err) {
          throw err
        } else {
          done();
        }
      });
  });
});