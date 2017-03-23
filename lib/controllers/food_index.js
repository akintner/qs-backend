const Food = require('../models/quantified_self')

module.exports = {
  index: (request, response) => {
    Food.findAllFood()
    .then((foods) => {
      if(!foods.rowCount){
        return response.status(404).send({
          error: "There are no loaded foods in the database at this moment."
        })
      }
      response.status(200).json(foods.rows)
    })
  }
}