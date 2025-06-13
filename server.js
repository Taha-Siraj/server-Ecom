import express from "express";
import db from "./db.js";
import bcrypt from 'bcryptjs';
// import cors from "cors";

// app.use(cors());
const app = express();
app.use(express.json());


app.get("/", async (req, res) => {
    try {
        let result = await db.query("SELECT * FROM users")
        res.status(200).send({message: result});
        console.log(result)
    } catch (error) {
        console.log(error);
        res.status(500).send({message: "internel server error"})
    }
})

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
    // console.log(salt, hash)
    } catch (error) {
        res.status(400).send({message: "internel server error"})
        console.log(error)
    }
});


app.post('/login', async (req , res) => {
    let {email , password} = req.body;
    if(!email || !password){
        res.status(400).send({message: "All Field Requried"});
      return;
    }
    email = email.toLowerCase();
    try {
     let qurey = "SELECT * FROM users email = &1";
     let value =  [email]
     let result = await db.query(qurey , value);
     if(!result.rows.length){
        res.send(400).send({message: "User Already Created Account with this email"})
        return;
     }
     let isMatched = bcrypt.compareSync(password, result.rows[0].password); // true
     if(!isMatched){
        res.status(401).send({message: "Wrong password"});
     };
    } catch (error) {
        
    }
    
})


app.listen(5004, () => {
    console.log("server Is running 5004")
})