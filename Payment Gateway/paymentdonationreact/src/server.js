const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const fs=require('fs')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// connection configurations
const mc = mysql.createConnection({
    host: 'db4free.net',
    user: 'paymentdonation',
    password: 'paymentdonation',
    database: 'paymentdonation',
    //socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
});

// connect to database
mc.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
   
    console.log('Connected to the MySQL server.');
  });

// default route
// app.get('/', function (req, res) {
//     return res.send({ error: true, message: 'hello' })
// });

// Here where I'm calling in the client side

// Search for todos with ‘bug’ in their name
// app.get('/todos/search/:keyword', function (req, res) {
//   var mensaje = 'Todos search list.';
//     let keyword = req.params.keyword;
//     mc.query("SELECT * FROM tasks WHERE task LIKE ? ", ['%' + keyword + '%'], function (error, results, fields) {
//         if (error) throw error;
//         return res.send({ error: false, data: results, message: mensaje});
//     });
// });

// Retrieve todo with id
// app.get('/todo/:id', function (req, res) {

//     let task_id = req.params.id;

//     if (!task_id) {
//         return res.status(400).send({ error: true, message: 'Please provide task_id' });
//     }

//     mc.query('SELECT * FROM tasks where id=?', task_id, function (error, results, fields) {
//         if (error) throw error;
//         return res.send({ error: false, data: results[0], message: 'Todos list.' });
//     });

// });

// Add a new todo
app.post('/data', function (req, res) {

    let name = req.body.name;
    let status=req.body.status;

    if (!name && !status) {
        return res.status(400).send({ error:true, message: 'Please provide task' });
    }

    //var task = req.body.task;

    var query = mc.query("INSERT INTO `payment` VALUES (?,?)", [status.toString(),name.toString()], function (error, results, fields) {
        if (error) throw error;
        console.log(name);
        return res.send({ error: false, data: results, message: 'New task has been created successfully.' });
    });
});

// all other requests redirect to 404
app.all("*", function (req, res, next) {
    // return res.sendFile(path.join(__dirname+'/index.js'));
    res.writeHead(200,{'Content-Type':'text/javascript'});
    // res.render("index");
    fs.readFile("./index.js",null,function(error,data){
        if(error){
            res.writeHead(404);
            res.write("File Not Found")
        }
        else{
            res.write(data);
        }
    });
    next();
});

// port must be set to 8080 because incoming http requests are routed from port 80 to port 8080
app.listen(3000, function () {
    console.log('Server Started on Port 3000');
});

// allows "grunt dev" to create a development server with livereload
module.exports = app;