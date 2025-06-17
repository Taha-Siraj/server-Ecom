import express from "express";
import db from "./db.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

app.use(cors({
  origin: 'https://e-com-phi-nine.vercel.app', 
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());
let SECRET = process.env.SECRET_key; 

app.get("/", async (req, res) => {
    try { 
        res.status(200).send({message: "Login Signup / Api"});
    } catch (error) {
        res.status(500).send({message: "internel server error"})
    }
})

// Signup api
app.post('/signup',async (req , res) => {
    let {firstName , lastName , email , password} = req.body;
    if(!firstName || !lastName || !email || !password){
     res.status(400).send({message: "All field Requried"});
     return;
    };
    email = email.toLowerCase();
    let query = "SELECT * FROM users WHERE email = $1"
    let values = [email];
    console.log("query", query);
    try {
    let result = await db.query(query , values) 
    if(result.rows?.length){
        res.status(400).send({message: "User alreay Exits With This Email"})
        console.log(result.rows?.length)
        return;
    };
    let addQurey = "INSERT INTO users(first_name, last_name, email, password) VALUES($1, $2, $3, $4)"
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    let addValues = [firstName , lastName , email, hash]
    let addUsers = await db.query(addQurey, addValues) 
    res.status(200).send({message: "User Created", users: addUsers})
    } catch (error) {
        res.status(400).send({message: "internel server error"})
        console.log(error)
    }
});

//login Api
app.post('/login', async (req , res) => {
    let {email , password} = req.body;
    if(!email || !password){
     res.status(400).send({message: "All Field Requried"});
      return;
    }
    email = email.toLowerCase();
    try {
     let qurey = "SELECT * FROM users WHERE email = $1";
     let value =  [email]
     let result = await db.query(qurey , value);
     if(!result.rows.length){
        res.status(404).send({message: "User not found"})
        return
     }
     let isMatched = bcrypt.compareSync(password, result.rows[0].password); 
     if(!isMatched){
        res.status(401).send({message: "Wrong password"});
        return;
     };
     let token = jwt.sign({ 
        id: result.rows[0].user_id,
        first_name: result.rows[0].first_name,
        last_name: result.rows[0].last_name,
        email: result.rows[0].email,
        user_role: result.rows[0].user_role,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000 ) + (60 * 60 * 24)  
      }, SECRET);
      res.cookie('Token', token, {
        maxAge: 86400 * 1000, 
        httpOnly: true,
        secure: true,
      })
     const {password: _p, ...users } = result.rows[0];
     res.status(200).send({ message: "Login successful", user: users });
    } catch (error) {
      console.error("Login Error:", error.message);
      res.status(500).send({ message: "Server error" });
    }
    
});

app.listen(5004, () => {
    console.log("server Is running 5004")
})