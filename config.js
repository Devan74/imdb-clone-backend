require('dotenv').config();
module.exports = {
  databaseURI:process.env.MONGO_URL,
  jwtSecret:process.env.SECRET_KEY ,
};
