const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const CreateController = require('./lib/controllers/food_create')
const IndexController = require('./lib/controllers/food_index')
const ShowController = require('./lib/controllers/food_show')
const DeleteController = require('./lib/controllers/food_delete')
const EditController = require('./lib/controllers/food_edit')

var corsOptions = {
  origin: '*',
  optionSuccessStatus: 200
}

app.set('port', process.env.PORT || 3000)
app.locals.title = 'quantified self'
app.locals.foods = []

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true})) //this is the syntax to include for parsing HTML forms, but we won't user this here. It allows us to parse data sent to us. 
app.use(cors(corsOptions))
app.options('*', cors(corsOptions))

app.get('/', (request, response) => {
  response.send(`Welcome to ${app.locals.title}.`)
})

app.get('/api/foods', IndexController.index)
app.get('/api/foods/:id', ShowController.show)
app.delete('/api/foods/:id', DeleteController.deletes) 
app.post('/api/foods', CreateController.create)
app.put('/api/foods/edit/:id', EditController.edit)


// this encapsulates the listen so that it doesn't run in the test environment 
if(!module.parent) {
  app.listen(app.get('port'), () => {
    console.log(`${app.locals.title} is running on ${app.get('port')}.`)
  })
}

module.exports = app