# README

### This is a simple RESTful API, QS-Express, which represents my introduction and first attempt creating a backend using Node.js and Express. 


* Node version: 6.9.2

* Express version: 1.0.0

* System dependencies: This app requires postgresql as a database. All other dependencies are listed in package.json and can be loaded onto your machine by cloning this repo and running `npm install` from the command line.

* Database Configuration: once you have cloned the repo and updated for all packages, you will have to set up the database on your local machine. To do this, please run the following commands from your terminal in order:  
`npm install knex -g` (this will give you global access to the knex keyword from the command line) 
`knex migrate:latest` (this will create the database needed to run the project from the migrations)    
`knex seed:run` (this will load fake seed data into the database for each model)  

* How to run the program from your local browser: if you would like to run the program from your browser, please type `npm start` into the terminal and then open up a browser of your choice and type in the following basic URL `localhost:3000` or `http://127.0.0.1:3000`. The app is up in production on heroku and available at https://qs-backend.herokuapp.com 

* The following extra paths are also available from localhost or from production on heroku: 

#### Database Endpoints
`/api/foods` returns a list of all foods in the database  
`/api/foods/:id`  returns a specific food from the database by id number    
`/api/foods/edit/:id` edit a food from the database  

#### API Functionality
* The API also accepts POST requests to `/api/foods` to add new foods into the database and DELETE requests to `/api/foods/:id` to remove a food from the database. 


