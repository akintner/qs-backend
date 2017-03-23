const Food = require('../models/quantified_self')

module.exports = {
  edit: (request, response) => {
    const id = request.params.id
    const newFood = request.body.food
    if (!newFood) {
      return response.status(422).send({
        error: 'No food properties updated. Please attach an edited food with a put request.'
      })
    }
    Food.findFood(id)
    .then(() => {
      response.sendStatus(200)
    }).catch(console.log)
  }
}