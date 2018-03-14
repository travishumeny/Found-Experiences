const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Places = require('../models/Places.js');

/* GET /todos listing. */
router.get('/', (req, res, next) => {
  Places.find().sort({ updatedAt: -1 }).exec((err, todos) => {
    if (err) return next(err);
    res.json(todos);
  });
});

/* POST /todos */
router.post('/', (req, res, next) => {
  Places.create(req.body,  (err, todo) => {
    if (err) return next(err);
    console.log('New Places created:');
    console.log(todo);
    res.json(todo);
  });
});

/* GET /todos/id */
router.get('/:id', (req, res, next) => {
  Places.findById(req.params.id, (err, todo) => {
    if (err) return next(err);
    res.json(todo);
  });
});

/* PUT /todos/:id */
router.put('/:id', (req, res, next) => {
  Places.findByIdAndUpdate(req.params.id, req.body, (err, todo) => {
    if (err) return next(err);
    res.json(todo);
  });
});

/* DELETE /todos/:id */
router.delete('/:id', (req, res, next) => {
  Places.findByIdAndRemove(req.params.id, req.body, (err, todo) => {
    if (err) return next(err);
    console.log('Places deleted:');
    console.log(todo);
    res.json(todo);
  });
});

module.exports = router;
