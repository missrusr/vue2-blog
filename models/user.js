"use strict"

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;
var moment = require('moment');
moment.locale('zh-cn');

var UserSchema = new Schema({
	username: { type: String, required: true },
	password: { type: String, required: true },
	joinDate: { type: Date, default: Date.now }
});

// UserSchema.virtual('joinDateView').get(function () {
// 	return moment(this.joinDate).format('YYYY-MM-DD');
// });

mongoose.model('User', UserSchema);