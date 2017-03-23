const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../knexfile')[environment]
const database = require('knex')(configuration)

function clearFoods(){
  return database.raw('TRUNCATE quantified_self RESTART IDENTITY');
}

function createFood(food){
  return database.raw(
    'INSERT INTO quantified_self (food, created_at) VALUES (?, ?)',
    [food, new Date])
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
}