const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://myUser:jayrishika1819@cluster0.hpplq.mongodb.net/signApp?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.log('MongoDB connection error:', err));

const userSchema = new mongoose.Schema({
  name: String,
  mobile: String,
  email: String,
  address: String,
  dob: String,
  gender: String,
  username: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

app.post('/signup', (req, res) => {
  const { name, mobile, email, address, dob, gender, username, password } = req.body;

  if (!name || !mobile || !email || !address || !dob || !gender || !username || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const newUser = new User({ name, mobile, email, address, dob, gender, username, password });

  newUser.save()
    .then(() => res.status(200).json({ message: 'User successfully registered' }))
    .catch((err) => res.status(500).json({ message: 'Error registering user', error: err }));
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
