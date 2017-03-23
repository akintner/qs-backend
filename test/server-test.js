const assert = require('chai').assert
const app = require('../server')
const request = require('request')
const Food = require('../lib/models/quantified_self')

describe('server', () => {
  before((done) => {
    this.port = 9876;
    this.server = app.listen(this.port, (err, result) => {
      if (err) { done(err) }
      done();
    });
    this.request = request.defaults({
      baseUrl: 'http://localhost:9876'
    });
  });

  after(() => {
    this.server.close();
  });

  it('should exist', () => {
    assert(app)
  });

  describe('GET to root path', () => {
    it('should return a 200 when we hit the root path', (done) => {
      this.request.get('/', (err, response) => {
        if (err) { done(err) }
        assert.equal(response.statusCode, 200);
        done();
      });
    });

    it('a request to the root returns the app title', (done) => {
      this.request.get('/', (err, response) => {
        const title = app.locals.title
        if (err) { done(err) }
        assert.include(response.body, title);
        done();
      });
    });
  });

  describe('GET /api/foods/:id', () => {
    beforeEach((done) => {
      Food.createFood("{name: taco (crunchy beef), calories: 155}").then(() => done());
    });

    afterEach((done) => {
      Food.clearFoods().then(() => done());
    });

    it('returns a 422 if the resource does not exist', (done) => {
      this.request.get('/api/foods/77', (err, response) => {
        if (err) { done(err) }
        assert.equal(response.statusCode, 422)
        done()
      });
    });

    it('should return the id and food info from the resource found', (done) => {
      this.request.get('/api/foods/1', (err, response) => {
        if (err) { done(err) }

        const id = 1
        const food = "{name: taco (crunchy beef), calories: 155}"
        let parsedFood = JSON.parse(response.body)

        assert.equal(parsedFood.id, id)
        assert.equal(parsedFood.food, food)
        assert.ok(parsedFood.created_at)
        done()
      })
    })
  });

  describe('POST to /api/foods', () => {
    beforeEach((done) => {
      Food.createFood("{name: taco (crunchy beef), calories: 155}").then(() => done());
    });

    afterEach((done) => {
      Food.clearFoods().then(() => done());
    });

    it('should not return a 404', (done) => {
      this.request.post('/api/foods', (err, response) => {
        if (err) { done(err) }
        assert.notEqual(response.statusCode, 404)
        done();
      });
    });

    it('can take a POST request to add food', (done) => {
      const food = "{name: 'chocolate cake', calories: '355'}"
      this.request.post('/api/foods', {form: food}, (err, response) => {
        const name = "chocolate cake"
        const calories = "355"
        if (err) { done(err) }
        Food.findFood(request.params.id)
        .then((foods) => {
          if(!foods){
            done(err)
          }
          assert.equal(foods.rowCount, 1)
          done()
        }).catch(done)
      })
    })
  });

  describe('PUT to /api/foods/edit/:id', () => {
    beforeEach((done) => {
      Food.createFood("{name: taco (crunchy beef), calories: 155}").then(() => done());
    });

    afterEach((done) => {
      Food.clearFoods().then(() => done());
    });

    it('should return a 422 if resource is not found', (done) => {
      this.request.put('/api/foods/edit/17', (err, response) => {
        if (err) { done(err) }
        assert.equal(response.statusCode, 422);
        done();
      });
    });

    it('can take a PUT request to update a food', (done) => {
      const food = "{name: 'pizza', calories: '305'}"
      this.request.put('/api/foods/edit/1', {form: food}, (err, response) => {
        if (err) { done(err) }
        const name = 'pizza'
        const calories = '305'
        Food.findFood(request.params.id)
        .then((foods) => {
          const oldFood = foods.row[0]
          assert.include(oldFood.food, name)
          assert.include(oldFood, calories)
        }).then(() => {
          Food.findFood(request.params.id)
          .then((foods) => {
            assert.equal(foods.rows[0], undefined)
            done()
          }).catch(done)
        }).catch(done)
      })
    })
  });

  describe('DELETE /api/foods/:id', () => {
    beforeEach((done) => {
      Food.createFood("{name: taco (crunchy beef), calories: 155}").then(() => done());
    });

    it ('will delete a food', (done) => {
      this.request.delete('/api/foods/1', (err, response) => {
        if(err){done(err)}
        assert.equal(response.statusCode, 204)
        Food.findAllFood()
        .then((foods) => {
          assert.equal(foods.rows.length, 0)
          done()
        })
      })
    })
  })
});
