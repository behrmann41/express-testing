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

describe('GET api/items', function (){
  it('gets all items', function (done){
    request(app)
      .get('/api/items')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err, res){
        if (err) {
          return done(err)
        }
        done();
      })
  })
})

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

describe('PUT api/items/:id', function () {
  it('updates a resource', function (done){
    request(app)
      .put('/api/items/55c050595ae876b6b79ad318')
      .send({title: 'from test'})
      .expect(200)
      .end(function(err, res) {
        if (err) {
          throw err;
        } else {
          assert.equal(res.body.title, 'from test')
          done()
        }
      });
  });
});

describe('GET api/items/:id', function (){
  it('responds with item', function (done){
    request(app)
      .get('/api/items/55c050595ae876b6b79ad318')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function (err, res){
        if (err) {
          return done(err);
        }
        done()
      })
  })
})

describe('DELETE api/items/:id', function(){
  it('deletes an item', function (done){
    request(app)
      .del('/api/items/55c050595ae876b6b79ad318')
      .expect(200)
      .end(function (err, res){
        if (err) {
          return done(err);
        }
        done();
      })
  })
})