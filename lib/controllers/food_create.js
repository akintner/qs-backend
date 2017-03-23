const Food = require('../models/quantified_self')

module.exports = {
  create: (request, response) => {
    const created_at = new Date
    const food = request.body.food
    if (!food) {
      return response.status(422).send({
        error: 'No food properties provided. Please attach a food with a post request.'
      })
    }
    Food.createFood(food)
    .then((data) => {
      let newFood = data.rows[0]
      response.sendStatus(200).json(newFood)
    }).catch(console.log)
  }
}