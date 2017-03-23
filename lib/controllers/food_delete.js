const Food = require('../models/quantified_self')

module.exports = {
  deletes: (request, response) => {
    const id = request.params.id
    if (!id){
      return response.status(503).send({
        error: 'Please select the id of a food to delete'
      })
    }
    Food.deleteFood(id)
    .then(() => {
      response.status(204).json({
        message: 'Selected food was deleted.'
      })
    })
  }
}