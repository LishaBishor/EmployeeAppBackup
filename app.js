// Task1: initiate app and run server at 3000
const express=require('express');
const app=new express();
var morgan=require('morgan')
require('dotenv').config();
const PORT=process.env.PORT;

app.use(express.json())
app.use(express.urlencoded({extended: true}));
console.log(PORT)

const path=require('path');
app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));

// Task2: create mongoDB connection 
const mongoose=require('mongoose');
//mongoose.connect('mongodb://127.0.0.1:27017/moviesdb')
mongoose.connect('mongodb+srv://LishaBishor:Lisha6873@cluster0.1qb18ll.mongodb.net/dbEmployee?retryWrites=true&w=majority')
.then(()=>{
    console.log('Connected to my local DB');
})
.catch((error)=>{
    console.log('Error!!! Connection lost:',error);
})
//creating model for the collection in dbemployee
const EmployeeSchema=mongoose.Schema({
    name :String,
    location:String,
    position:String,
    salary:Number 
  });
  
  const EmpData=mongoose.model('emp',EmployeeSchema);


//Task 2 : write api with error handling and appropriate api mentioned in the TODO below

//TODO: get data from db  using api '/api/employeelist'
app.get('/api/employeelist',async(req,res)=>{
    try {
       const data= await EmpData.find();
       console.log(data);
       res.status(200).json(data);
   } catch (error) {
        res.status(400).json("Cannotget"); 
   }
})




//TODO: get single data from db  using api '/api/employeelist/:id'
app.get('/api/employeelist/:id',async(req,res)=>{
    try {
        let id=req.params.id;
        console.log(id);
       const data= await EmpData.findById({_id:id});
       console.log(data);
       res.send(data)
      // res.send('hello')
       
      // res.status(200).json(data);
   } catch (error) {
        res.status(400).json("Cannotget"); 
   }
})





//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}
//post

app.post('/api/employeelist',async(req,res)=>{  
    try {
       // const item={"Name":"Rema","Position":"Manager","OfficeLocation":"Thrissur","Salary":40000}
              

    const item=req.body;
         newitem=new EmpData(item);
         const savedata= await newitem.save();
         console.log(savedata)
        res.status(200).json('post successful')
    } catch (error) {
        console.log("failed")
        res.status(400).json("nopost");
     }
 })







//TODO: delete a employee data from db by using api '/api/employeelist/:id'
app.delete('/api/employeelist/:id',async(req,res)=>{
    try {
       let id=req.params.id;
      const deletedata=req.body
     // const updated=await EmpData.updateOne(updatedata);
      const deleted=await EmpData.findByIdAndDelete(id,deletedata)
       console.log('deleted')
      // res.status(200).json(data);
   } catch (error) {
        res.status(400).json("Cannotget"); 
   }
})





//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}
app.put('/api/employeelist',async(req,res)=>{
    try {
      // let id=req.params.id;
      const updatedata=req.body
      id=req.body._id;
      console.log(id)
     // const updated=await EmpData.updateOne(updatedata);
      const updated=await EmpData.findByIdAndUpdate(id,updatedata)
       console.log('updated')
       res.send("updated")
      // res.status(200).json(data);
   } catch (error) {
        res.status(400).json("Cannotget"); 
   }
})


//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});
app.listen(PORT,()=>{
    console.log(`The server is running at ${PORT} `)
})


