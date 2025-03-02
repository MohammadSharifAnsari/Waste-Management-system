
import express, { urlencoded } from "express";
import morgan from "morgan";
import cors from"cors";
import errorMiddleware from "./middleware/errorMiddleware.js";
import { configDotenv } from "dotenv";
import userroutes from "./routes/userRoutes.js";
import companyroutes from "./routes/companyRoutes.js"
import cookieParser from "cookie-parser";
import articleRoutes from "./routes/articles.routes.js";

const app=express();
configDotenv();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));
app.use(cors(
{

    origin:[process.env.FRONTEND_URL1,process.env.FRONTEND_URL2],
credentials:true//cookie set ho jaegi
}

));
app.use(cookieParser());
app.use('/api/v1/user',userroutes);
app.use('/api/v1/article',articleRoutes);
app.use('/api/v1/company',companyroutes)
app.use('ping',(req,res,next)=>{
return res.send("pong");
})

app.all('*',(req,res,next)=>{
return res.status(400).send("404 page not found");
})

app.use(errorMiddleware);

export default app;
