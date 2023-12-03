const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path')
const cookieParser = require('cookie-parser');

dotenv.config();

const routes = require('./routes/index');
const mongoUrl = process.env.MONGO_URL; //mongodb+srv://josejdiaz:1@cluster0.xpjr6lo.mongodb.net/PID?retryWrites=true&w=majority
const port = process.env.PORT || 3001 ; //3000
const secretKey = process.env.SECRET_KEY; //helloworld
const app = express();

app.get('/login',(req, res) /* importa el orden */ =>{
    res.sendFile(path.join(__dirname,'public','index.html'))
    console.log("Hubo un get a localhost");
})


app.get('/register',(req, res) /* importa el orden */ =>{
    res.sendFile(path.join(__dirname,'public','register.html'))
    console.log("Hubo un get a localhost");
})




app.use('/assets',express.static('public'));
//app.use('/uploads',express.static('uploads'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use('', routes); /* apartir de localhost:3000 */

mongoose.connect(mongoUrl).then(client =>{
    app.listen(port,() =>{ //CONECTARSE AL PUERTO 3000
        console.log('App is running.....');
        console.log("port is "+ port);
    });
}).catch(err=>{
    console.log('No se pudo conectar a la base de datos',err);
  
})