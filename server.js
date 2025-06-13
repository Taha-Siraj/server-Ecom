import express from "express";
import db from "./db.js";
import bcrypt from 'bcryptjs';
// import cors from "cors";

const app = express();
// app.use(cors());
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
    let values = [email]
    try {
    let result = await db.query(query , values) 
    if(result.rows?.length){
        res.status(400).send({message: "User alreay Exits With This Email"})
        return
    };
    let addQurey = "INSERT INTO users(first_name, last_name, email, password) VALUES($1, $2, $3, $4)"
    let addValues = [firstName , lastName , email, password]
    // let addUsers = await db.query(addQurey, addValues) 
    const salt = bcrypt.genSaltSync(10);
    console.log(salt)
    // res.status(200).send({message: "testing", results: addUsers})
    } catch (error) {
        res.status(400).send({message: "internel server error"})
        console.log(error)
    }
});

app.listen(5004, () => {
    console.log("server Is running 5004")
})