const mongoose = require("mongoose"); 

// it is an abstration layer so tha we can deal with the database.
// we can read, delete, update the data.It is also allows to create models.

const config = require("config");
const db = config.get("mongoURI");

const connectDB = async () => {
  try {
   await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });

    console.log("MongoDB Connected");

  } catch (err) {
    console.error(`${err.message}`);
    process.exit(1);
  }
  
};

module.exports = connectDB;
