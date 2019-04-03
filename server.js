require('dotenv').config()
const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));

const validTypes = [`Bug`, `Dark`, `Dragon`, `Electric`, `Fairy`, `Fighting`, `Fire`, `Flying`, `Ghost`, `Grass`, `Ground`, `Ice`, `Normal`, `Poison`, `Psychich`, `Rock`, `Steel`, `Water`];

function validateBearerToken(req,res,next){
  const authToken = req.query.Authorization;
  const apiToken = process.env.API_TOKEN;
  console.log('validate bearer token middleware');
  if (typeof authToken === 'undefined' || authToken.split(' ')[1] !== apiToken){
    return res.status(401).json({error: 'Unauthorized request'})
  }
  //move to the next middleware
  next();
}

app.use(validateBearerToken);

function handleGetTypes(req,res){
  res.send('Types');
}

app.get('/types',handleGetTypes)

function handleGetPokemon(req,res){
  res.send('Hello, Pokemon');
}

app.get('/pokemon',handleGetPokemon)

const PORT = 8080;

app.listen(PORT, ()=>{
  console.log(`Server listening at http://localhost:${PORT}`)
})
