import express from "express";
import mongoose from "mongoose";
const cookieParser = require('cookie-parser');


import Places from "./model/placesModel";

require('dotenv').config()



const app = express();
const port = process.env.PORT || 3050;
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());



const uri=process.env.MONGODB_URI;

    //-----for mongo contact shani for access





mongoose
  .connect(
    uri
  )
  .then((result) => {
    console.log("connected to db");
    Places.find({})
      .then((res) => {
        
      })
      .catch((err) => {
        console.log(err.message);
      });
  })
  .catch((err) => {
    console.log(err.message);
  });








import placesRoutes from './routes/placesRoutes'
app.use('/places', placesRoutes)

import usersRoutes from './routes/usersRoutes'
app.use('/users', usersRoutes)

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
