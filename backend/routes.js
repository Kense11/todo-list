let express = require('express');
let router = express.Router();
let Task = require('./models/task');
let Desk = require('./models/desk');


router.get('/', (req, res) => {
  Desk.create({ name: 'small' }, (err, desk) => (
    Desk.find(function(err, desks) {
      if (err)
        res.send(err);
      res.json(desks);
    })
  ));
});

router.get('/api/desks', function(req, res) {
  Desk.find(function(err, desks) {
    if (err)
      res.send(err);
    res.json(desks);
  });
});

router.get('/api/tasks', function(req, res) {
  Task.find(function(err, tasks) {
    if (err)
      res.send(err);
    res.json(tasks);
  });
});

router.post('/api/desks', function(req, res) {
  Desk.create(req.body, function(err, desks) {
    if (err)
      res.send(err);
    Desk.find(function(err, desks) {
      if (err)
        res.send(err);
      res.json(desks);
    });
  });

});

router.delete('/api/desks/:_id', function(req, res) {
  Desk.remove({
    _id : req.params._id
  }, function(err, desks) {
    if (err)
      res.send(err);
    Desk.find(function(err, desks) {
      if (err)
        res.send(err);
      res.json(desks);
    });
  });
});

module.exports = router;
