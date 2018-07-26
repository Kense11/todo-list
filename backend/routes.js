let express = require('express');
let router = express.Router();
let Task = require('./models/task');
let Desk = require('./models/desk');


router.get('/api/desks', function(req, res) {
  Desk.find(function(err, allDesks) {
    if (err)
      res.send(err);
    res.json(allDesks);
  });
});

router.post('/api/desks', function(req, res) {
  Desk.create(req.body, function(err, newDesk) {
    if (err)
      res.send(err);
    res.json(newDesk);
  });
});

router.put('/api/desks/:_id', function(req, res) {
  Desk.findByIdAndUpdate(req.params._id, req.body, {new: true}, function (err, updDesk) {
    if (err)
      res.send(err);
    res.json(updDesk);
  });
});

router.delete('/api/desks/:_id', function(req, res) {
  Desk.findByIdAndDelete(req.params._id, function (err, delDesk) {
    if (err)
      res.send(err);
    res.json(delDesk);
  });
});

router.get('/api/tasks', function(req, res) {
  Task.find(function(err, allTasks) {
    if (err)
      res.send(err);
    res.json(allTasks);
  });
});

router.post('/api/tasks', function(req, res) {
  Task.create(req.body, function(err, newTask) {
    if (err)
      res.send(err);
    res.json(newTask);
  });
});

router.put('/api/tasks/:_id', function(req, res) {
  Task.findByIdAndUpdate(req.params._id, req.body, {new: true}, function (err, updTask) {
    if (err)
      res.send(err);
    res.json(updTask);
  });
});

router.delete('/api/tasks/:_id', function(req, res) {
  Task.findByIdAndDelete(req.params._id, function (err, delTask) {
    if (err)
      res.send(err);
    res.json(delTask);
  });
});

router.delete('/api/tasks/many/:deskId', function(req, res) {
  Task.deleteMany({ deskId: req.params.deskId}, function (err, resp) {
    if (err)
      res.send(err);
    res.json(resp);
  });
});


module.exports = router;
