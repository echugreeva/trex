import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';

import path from 'path';

dotenv.config();
const app = express();
const router = express.Router();
const __dirname = path.resolve();

app.use(cors({credentials:true, origin:'http://localhost:3000'}));
// app.use(cors({credentials:true, origin:'https://lenachu-portfolio.herokuapp.com/'}));

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(router);


app.listen(process.env.PORT||8080,()=>{
    console.log(`run on ${process.env.PORT||8080}`)
})

app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});