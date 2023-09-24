const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://beardbaba:king000@cluster0.t2vhspc.mongodb.net/cloudnotes"; // Replace 'your-database-name' with your actual database name

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB Successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = connectToMongo;
