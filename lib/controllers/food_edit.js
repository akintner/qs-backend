const Food = require('../models/quantified_self')

module.exports = {
  edit: (request, response) => {
    return Food.updateFood(request.body.food, request.params.id)
    .then((data) => {
      if (!data.rowCount) {
        response.sendStatus(422);
      }
      response.status(202).json(data.rows[0])
    })
  }
}