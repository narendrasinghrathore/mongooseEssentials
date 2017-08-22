const express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var port = 3050;
var db = 'mongodb://localhost:27017/mongooseEssential';
var User = require('./models/model').User;
mongoose.Promise = global.Promise;
mongoose.connect(db, {
    useMongoClient: true
})
app.use(bodyParser.json());

app.get('/', function (req, res) {
    User.find({}).then(function (data) {
        res.send(data);
    }).catch(function (err) {
        res.status(404).send();
    });
});
app.post('/user', function (req, res) {
    var user = new User();
    user.name = req.body.name;
    user.age = req.body.age;
    user.save().then(function (a) {
        res.send(a);
    }).catch(function (err) {
        res.status(404).send(err);
    });
});
app.put('/user', function (req, res) {
    User.findOneAndUpdate({_id: req.body.id}, {
        $set: {
            name: req.body.name,
            age: req.body.age
        }
    }, {
        upsert: true
    }, function (err, d) {
        res.status(204).send(d);
    });
});

app.listen(port, function (err) {
    console.log('App running at port:', port);
})
