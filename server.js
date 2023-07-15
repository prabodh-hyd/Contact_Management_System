const express = require('express');
const cross = require('cors');
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Registeruser = require('./models/User');
const Contactcreate = require('./models/Create');
const middleware = require('./middleware/auth');


app.use(cross());
app.use(express.json());

mongoose.connect("mongodb+srv://desubramha99:Desu721721@dbcluster0099.xm0rkdy.mongodb.net/?retryWrites=true&w=majority", {
  useUnifiedTopology: true,
  useNewUrlParser: true
}).then(
    () => console.log("DB Connection Established")
)

app.post('/register', async(req, res) =>{
    try{
         const {name,email,password,confirmpassword} = req.body;
         let exist = await Registeruser.findOne({email:email});

         if(exist){
            return res.status(400).send("User Already Exists")
         }

         if(password !== confirmpassword){
            return res.status(400).send("Password are not matching");
         }

         let newUser = new Registeruser({
            name,
            email,
            password,
            confirmpassword
         });
         await newUser.save();
         res.status(200).send("Registered Successfully")
    }
    catch(err){
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
});

app.post('/login', async (req, res) =>{
    try{
         const {email,password} = req.body;
        //  console.log('Test',req);
         let exist = await Registeruser.findOne({email:email});
        //  console.log(exist);

         if(!exist){
            return res.status(404).send("User Not Found");
         }

         if(exist.password !== password){
            return res.status(400).send("Invalid Credentials");
         }

         let payload = {
            user:{
                id :exist.id
            }
         }

         jwt.sign(payload,'jwtSecret',{expiresIn: 10000},(err, token) =>{
             if(err){
                throw err;
             }
             return res.json({token});
         })
    }
    catch(err){
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
});

app.get('/Dashboard', middleware, async(req, res) =>{
    try{
         let exist = await Registeruser.findById(req.user.id);

         if(!exist){
            return res.status(400).send("User Not Found");
         }
         res.json(exist);
    }
    catch(err){
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
});

app.get('/getAllData', async(req, res) =>{
    try {
        const contactAllData = await Contactcreate.find();
        res.json(contactAllData);
    }
     catch (err) {
        console.log(err);
    }
});

app.post('/create', async (req, res) =>{
    try{
        const {firstname, lastname, email, phone, address} = req.body;
        let exist = await Contactcreate.findOne({phone:phone});
        if(exist){
            return res.status(400).send("User Already Exists")
         };

         let newContact = new Contactcreate({
            firstname,
            lastname,
            email,
            phone,
            address
         });
         await newContact.save();
         res.status(200).send("New User Successfully Added")

    }
    catch(err){
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
});

app.patch('/update/:id', async(req, res) =>{
    try{
         const id = req.params.id;
         const updateData = req.body;
         console.log(updateData);

         const contactUpdate = await Contactcreate.findByIdAndUpdate(
            id, updateData
         )
         await contactUpdate.save();
         res.status(200).send("Updated Successfully");
    }
    catch(err){
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
});

app.delete('/delete/:id', async(req, res) =>{
    try{
        const id = req.params.id;
        const contactDelete = await Contactcreate.findByIdAndDelete(id);
        res.status(200).send(`${contactDelete.phone} has been Deleted..`);
    }
    catch(err){
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
});


app.get('/', (req, res) =>{
    res.json({message: "Hello, This is the server side."})
});

app.listen(8000, ()=>{
    console.log('Server is running on port 8000')
});