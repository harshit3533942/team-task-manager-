import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoute from "./routes/auth.route.js"
dotenv.config();
mongoose.connect(process.env.Mongo_URL).then(()=>{
    console.log("connected to database");
})
.catch((err)=>{
    console.log("error connecting to database",err);
});

const app = express();
//middleware to handle cors
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

//middleware to handle json object in req body
app.use(express.json());

app.listen(3000,()=>{
    console.log("server is running on port 3000");
})

app.use("/api/auth",authRoute)
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});