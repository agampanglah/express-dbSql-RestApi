var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// default route
app.get('/' ,function(req, res){
    return res.send({error : true,  message: 'hello'
    })
});

// connection configurations
var dbConfig = mysql.createConnection({
    host: 'localhost',// nama host
    user: 'root', // etc
    password:'', // etc
    database:'node_js' // nama db di my sql
});
//db conect
dbConfig.connect();

// get all users
app.get('/users', function(req, res){
    dbConfig.query('SELECT * FROM users', function(error, results, fields){
        if (error) throw error;
        return res.send({error: false, data: results , message:'users list'});
    })
})

// get users by id
app.get('/users/:id', function(req, res){
    let user_id = req.params.id;
    if(!user_id) {
        return res.status(400).send({error: true, message:'please provide user_id'});
    }
    dbConfig.query('SELECT * FROM users where id=?', user_id, function(error, result, fields){
        return res.send({error:false,  data: results[0], message:'user list.'});
    })

})

// create new user
app.post('/user', function(req, res){
    let user = req.body.user;
    if(!user){
        return res.status(400).send({error:true,  message: 'please provide user'});
    }
    dbConfig.query("INSERT INTO users SET ?", {user:user}, function(error, result, fields){
        if(error) throw error;
        return res.send({error:false. data, result, message: " new users has been create succesfully,"});
    });
})
// update users from id
app.put('/user', function(req, res){
    let user_id = req.body.user_id;
    let user = req.body.user;

    if(!user_idb|| !user){
        return res.status(400).send({error:user, message:'please provide user and user_id'});
    }
        dbConfig.query("UPDATE users SET user = ? WHERE id = ?", [user, user_id], function(error, results, fields){
            if(error) throw error;
            return res.send({error: false, data: results, message:'user has been updated usccesfully.'});
        })
    
})


//  Delete user
app.delete('/user', function (req, res) {
  
    let user_id = req.body.user_id;
  
    if (!user_id) {
        return res.status(400).send({ error: true, message: 'Please provide user_id' });
    }
    dbConfig.query('DELETE FROM users WHERE id = ?', [user_id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'User has been updated successfully.' });
    });
}); 

//
//set port

app.listen(8080, function(){
    console.log('this app is running on port 8080');
});

module.exports = app;