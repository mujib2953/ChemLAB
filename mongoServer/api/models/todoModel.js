/*
* @Author: mujibur
* @Date:   2017-05-10 14:12:52
* @Last Modified by:   mujibur
* @Last Modified time: 2017-05-10 15:18:24
*/

'use strict';
// var mongoose = require( 'mongoose' );

// var Schema = mongoose.Schema;

// var TaskSchema = new Schema({
// 	name: {
// 		type: String,
// 		Required: 'Kindly enter the name of task.'
// 	},
// 	createdDate: {
// 		type: Date,
// 		default: Date.now
// 	},
// 	status: {
// 		type: [{
// 			type: String,
// 			enum: [ 'pending', 'ongoing', 'completed' ]
// 		}],
// 		default: 'pending'
// 	}
// });

// module.exports = mongoose.model( 'Task', TaskSchema );

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TaskSchema = new Schema({
  name: {
    type: String,
    Required: 'Kindly enter the name of the task'
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: [{
      type: String,
      enum: ['pending', 'ongoing', 'completed']
    }],
    default: ['pending']
  }
});

module.exports = mongoose.model('Tasks', TaskSchema);