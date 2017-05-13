/*
* @Author: mujibur
* @Date:   2017-05-10 14:13:10
* @Last Modified by:   mujibur
* @Last Modified time: 2017-05-10 17:08:22
*/

'use strict';
module.exports = function( app ) {
	
	var todoList = require( '../controllers/todoController' );


	app.route( '/tasks' )
		.get( todoList.list_all_tasks )
		.post( todoList.create_a_task );

	app.route( '/tasks/:taskId' )
	    .get( todoList.read_a_task )
	    .put( todoList.update_a_task )
	    .delete( todoList.delete_a_task );

	app.use(function(req, res) {
		res.status(404).send({url: req.originalUrl + ' not found'})
	});
}