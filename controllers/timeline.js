const express = require('express');
const mongoose = require('mongoose');

const db = require('../models');
const router = express.Router();

//pull data from data base for timeline
//HOW DO I DO THISS???????

//post route for array of oblects for timeline
router.post('/', (req, res) => {
	console.log(req.body);

	req.body.forEach((element) => {
		db.Task.create(element)
    .then((createdTask) => {
      console.log('created task:', createdTask);
    })
    .catch((err) => {
      console.log('err', err);
      res.status(500).send('Could not create task in DB');
    });
});

//edit tasks
router.put('/', (req, res) => {
	// This would likely be inside of a PUT request, since we're updating an existing document, hence the req.params.todoId.
	// Find the existing resource by ID
	db.Task.findByIdAndUpdate(
    // the id of the item to find
    req.params.taskId,
    
    // the change to be made. Mongoose will smartly combine your existing 
    // document with this change, which allows for partial updates too
    req.body,
    
    // an option that asks mongoose to return the updated version 
    // of the document instead of the pre-updated one.
    {new: true},
    
    // the callback function
    (err, todo) => {
    // Handle any possible database errors
        if (err) return res.status(500).send(err);
        return res.send(todo);
    });
});

//delete tasks
router.delete('/', (req, res) => {
		db.Task.findByIdAndRemove(req.params.taskId, (err, task) => {
    // As always, handle any potential errors:
    if (err) return res.status(500).send(err);
    // We'll create a simple object to send back with a message and the id of the document that was removed
    // You can really do this however you want, though.
    const response = {
        message: "Todo successfully deleted",
        id: task._id
    };
    return res.status(200).send(response);
});
});