const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/recipeSharing', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));


const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});


const recipeSchema = new mongoose.Schema({
  title: String,
  description: String,
  ingredients: [String],
  instructions: [String],
  images: [String],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
});


const User = mongoose.model('User', userSchema);
const Recipe = mongoose.model('Recipe', recipeSchema);


app.listen(3000, () => console.log('Server running on port 3000'));
