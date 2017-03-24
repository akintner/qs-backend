const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../knexfile')[environment]
const database = require('knex')(configuration)

function clearFoods(){
  return database.raw('TRUNCATE quantified_self RESTART IDENTITY');
}

function createFood(food, created_at){
  return database.raw(
    'INSERT INTO quantified_self (food, created_at) VALUES (?, ?) RETURNING *',
    [food, new Date])
}

function updateFood(food, id) {
  return database.raw('UPDATE quantified_self SET food = ? WHERE id = ? RETURNING *', 
    [food, id])
}

function findFood(id){
  return database.raw('SELECT * FROM quantified_self WHERE id=?', [id])
}

function findAllFood(){
  return database.raw('SELECT * FROM quantified_self')
}

function deleteFood(id){
  return database.raw('DELETE FROM quantified_self WHERE id =?', [id])
}

module.exports = {
  clearFoods: clearFoods,
  createFood: createFood,
  findFood: findFood,
  findAllFood: findAllFood,
  deleteFood: deleteFood,
  updateFood: updateFood,
}