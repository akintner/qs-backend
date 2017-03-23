const Food = require('../models/quantified_self')

module.exports = {
  show: (request, response) => {
    Food.findFood(request.params.id)
    .then((food) => {
      if(!food.rowCount) {
        return response.sendStatus(422).send({
          error: 'Specified food does not exist in database.'
        })
      }
      response.json(food.rows[0])
    })
  }
}