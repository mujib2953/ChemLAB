/*
* @Author: mujibur
* @Date:   2017-05-10 14:12:36
* @Last Modified by:   mujibur
* @Last Modified time: 2017-05-11 14:35:19
*/

'use strict';
var mongoose = require('mongoose'),
	Task = mongoose.model('Tasks');


exports.list_all_tasks = function(req, res) {
	Task.find({}, function(err, task) {
		if (err)
			res.send(err);
		res.json(task);
	});
};




exports.create_a_task = function(req, res) {
	console.log( req.body );
	var new_task = new Task(req.body);
	new_task.save(function(err, task) {
		if (err)
			res.send(err);
		res.json(task);
	});
};


exports.read_a_task = function(req, res) {
	Task.findById(req.params.taskId, function(err, task) {
		if (err)
			res.send(err);
		res.json(task);
	});
};


exports.update_a_task = function(req, res) {
	Task.findOneAndUpdate(req.params.taskId, req.body, {new: true}, function(err, task) {
		if (err)
			res.send(err);
		res.json(task);
	});
};


exports.delete_a_task = function(req, res) {

	Task.remove({
		_id: req.params.taskId
	}, function(err, task) {
		if (err)
			res.send(err);
		res.json({ message: 'Task successfully deleted' });
	});
};