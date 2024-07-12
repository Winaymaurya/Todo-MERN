import express  from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import cors from 'cors'




const app=express();
dotenv.config()
app.use(express.json());
app.use(cors()) ;


// Connecting DataBase
const db= async()=>{
    try {
        await mongoose.connect(process.env.CLUSTER)
        console.log(`db is connected`);
    } catch (error) {
        console.log(`Error in mongodb${error}`);
    }
}
db();
import taskRoutes from './routes/taskRoutes.js'
app.use('/api/v1/task',taskRoutes);




// Port
const PORT=process.env.PORT || 8080
app.listen(PORT,()=>{
    console.log(`Server Running on ${PORT}`) 
})