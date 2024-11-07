const express=require('express');
const app=express();
const connectToMongoDb=require('./connect.js');
const router=require('./routes/router.js')
const path=require('path')
const dotenv=require('dotenv');
dotenv.config();

connectToMongoDb(process.env.DB_URL)
.then(()=>console.log("connected to mongodb"))
.catch((err)=>console.log(err))


app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views')); 

app.use(express.urlencoded({extended:false}));
app.use(express.json())
app.use(express.static(path.join(__dirname,'public')));
app.use('/',router)

const port=process.env.PORT || 8000;

app.listen(port,()=>console.log("server listening on port "+port))
