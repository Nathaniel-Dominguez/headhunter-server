const express = require('express');
const mongoose = require('mongoose');

const db = require('../models');
const router = express.Router();

//post route for array of oblects for timeline
router.post('/', (req, res) => {
	console.log(req.body);

	req.body.forEach((e) => {
		db.Task.create(e)
    .then((createdTask) => {
      console.log('created task', createdTask);
    })
    .catch((err) => {
      console.log('err', err);
      res.status(500).send('Could not create task in DB');
    });
  res.send({ tasks: req.body });
});