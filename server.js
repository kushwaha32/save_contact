const express = require("express");  // Web framework that handles routing stuff
const connectDB = require('./config/db')

const app = express() // initializing the express

// Connect Database
connectDB()

// Init Middleware

app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.json({ msg: 'Welcome to the ContactKeeper API..'}));

// Define Routes

 app.use('/api/users', require('./routes/users.js'));

 app.use('/api/auth', require('./routes/auth.js'));

 app.use('/api/contacts', require('./routes/contacts.js'));





const PORT = process.env.PORT /* production */ || 5000; /* Development */ 

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
