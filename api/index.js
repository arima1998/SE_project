import mongoose from 'mongoose';
import dotenv from 'dotenv';
import express from 'express';


dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('MongoDb is connected');
  })
  .catch((err) => {
    console.log(err);
  });

const app=express();
app.listen(3000,()=>{
    console.log('server running on port 3000!!');
})