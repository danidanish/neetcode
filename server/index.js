const express = require('express')
const parser = require('body-parser')
const session = require('express-session')
const {auth} = require('./middleware')
const jwt = require('jsonwebtoken')
const app = express()
const JWT_SECRET = 'secret'
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const amqplib = require('amqplib');
const queue = 'tasks';
var USER_ID_COUNTER=1;
app.use(parser.json())
const cors = require('cors');
const axios = require('axios')
app.use(cors());
app.use(session({
  secret: 'someSecretKey',
  resave: false,
  saveUninitialized: false
}));
const port = 3001

function isAdmin(req,res,next){
  if(req.session && req.session.email=='admin'){
    next();
  }
  else{
    res.status(400).send('Only accessible by admin!');
  }
}

const SUBMISSION = [];

app.post('/signup', async (req, res)=> {
  try 
  {
    if(req.body.email!==undefined){
      const email = req.body.email;
    const password = req.body.password;
      const users = await prisma.users.findFirst({
        where:{
          email:email
        }
      })
    if(!users){
      const a = await prisma.users.create({
        data:{
          email:email,
          password:password
        }
      });
    res.status(200).send({ msg: `${email} added!` });
  }
  else{
    res.status(200).send({msg:'User Exists!'})
  }
  }
  else{
    res.status(403).send({msg:'Fill the fields.'})
  }
    }
     catch (error) {
    res.status(404).send({msg:`Error: ${error}`})
  }
  
})

app.post('/login', async (req, res)=> {
  // Add logic to decode body
  // body should have email and password
  try {
    const email = req.body.email
  const password = req.body.password
  const user = await prisma.users.findFirst({
    where:{
      email:email
    }
  })
  if(user==null){
    res.status(401).send({msg:"User doesn't exist. Please sign up!"})
  }
  else if(user.password===password){
    const token = jwt.sign({id:user.id},JWT_SECRET);
    req.session.email = email;
    res.status(200).send({msg:`You have successfully logged in!`,token:`${token}`})
  }
  else if(user.password!==password){
    res.status(401).send({msg:'Incorrect password! Try again'})
  }
  } catch (error) {
    res.status(404).send({msg:`Error: ${error}`})
  }
})

app.post('/questions', async (req, res)=> {
  const endId = req.body.page*5
  const startId = endId-5       //5 problems per page
  const results = await prisma.questions.findMany({
    skip: startId,
    take: 5,
  })
  res.status(200).json(results)
})

//future implementation: connect submissions and questions table using userid and retreive all the submissions done by the user for a specific question.

app.post('/getspecificquestion', async (req, res)=> {
  const results = await prisma.questions.findFirst({
    where:{
      problemid:req.body.problemid
    }
  })
  res.status(200).json(results)
})

app.get("/submissions",auth, async (req, res)=> {
  try {
    const result = await prisma.submissions.findMany({
      where:{
        userid:req.userId
      }
     })
     res.status(200).json(result)
  } catch (error) {
    console.log({error})
  }
  
});
app.get('/getUsersList',isAdmin,auth,async (req,res)=>{
 res.status(200).send(await prisma.users.findMany());
});

app.post("/submissions",auth, async(req, res) =>{
   if(req && req.body){
    const rand = Math.random()*10
    if(rand>5){
      await prisma.submissions.create({
        data:{
          userid:req.userId,
          questionid:req.body.questionid,
          submittedsolution:req.body.submission,
          status:true
        }
      })
      res.status(200).send({msg:'Your submission got accepted!'})
    }
   else{
    await prisma.submissions.create({
      data:{
        userid:req.userId,
          questionid:req.body.questionid,
          submittedsolution:req.body.submission,
        status:false
      }
    })
    res.status(404).send({msg:'Your submission got rejected! Try again'})
   }
  }
});

//future implementation
app.post('/newquestions',isAdmin,auth,(req,res)=>{
try {
    const [{title,description,testCases:[{input,output}]}] = req.body;
    //insert into db 
    res.status(200).send('Question added successfully!');
  } catch (error) {
  res.status(400).send(`Error: ${error}`);
}

});

app.post('/runsolution',async (req,res)=>{
  try {
      const connection = await amqplib.connect('amqp://localhost')
      const channel = await connection.createChannel();
      await channel.assertQueue(queue);
      channel.sendToQueue(queue,Buffer.from(req.body.solution))
      channel.close();
      res.status(200).send({msg:'Solution sent to queue!'});
    } catch (error) {
    res.status(400).send({msg:`Error: ${error}`});
  }
  });

app.get('/getLanguages',async(req,res)=>{
  try {
    const languages = await axios.get('https://ce.judge0.com/languages/')
    console.log(languages.data)
    res.status(200).send(languages.data);
  } catch (error) {
    res.status(400).send({msg:`Error: ${error}`});
  }
})

app.listen(port, function() {
  console.log(`Example app listening on port ${port}`)
})