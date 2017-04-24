"use strict"

const router = require('koa-router')();
const sha1 = require('sha1');

const User = require('mongoose').model('User');

module.exports = function (app) {
	router.get('/login', function* (next) {
		this.body = 'name use'
	})

	router.post('/regedit', function* (next) {
		var ctx = this;
		var username = ctx.request.body.foo;

		console.log('success');
	})

	app.use(router.routes())
}