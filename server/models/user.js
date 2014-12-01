'use strict';

var mongoose   = require('mongoose'),
    bcrypt     = require('bcrypt'),
    request    = require('request'),
    path       = require('path'),
    AWS        = require('aws-sdk'),
    UserSchema = null,
    User       = null;

UserSchema = new mongoose.Schema({
  username:  {type: String, required: true,  validate: [usernameV, 'username length'], unique: true},
  password:  {type: String, required: true,  validate: [passwordV, 'password length']},
  avatar:    {type: String, required: true},
  socketId:  {type: String, required: false, validate: [socketV, 'socket length']},
  createdAt: {type: Date,  required: true, default: Date.now}
});

UserSchema.methods.encrypt = function(){
  this.password = bcrypt.hashSync(this.password, 10);
};

UserSchema.methods.download = function(cb){
  var s3   = new AWS.S3(),
      url  = this.avatar,
      ext  = path.extname(this.avatar),
      file = this._id + '.avatar' + ext;

  this.avatar = 'https://s3.amazonaws.com/' + process.env.AWS_BUCKET + '/' + file;

  request({url: url, encoding: null}, function(err, response, body){
    var params = {Bucket: process.env.AWS_BUCKET, Key: file, Body: body, ACL: 'public-read'};
    s3.putObject(params, cb);
  });
};

UserSchema.statics.login = function(obj, cb){
  User.findOne({username: obj.username}, function(err, user){
    if(!user){
     return cb();
    }

    var isGood = bcrypt.compareSync(obj.password, user.password);

    if(!isGood){
      return cb();
    }

    cb(user);
  });
};

function usernameV(v){
  return v.length >= 3 && v.length <= 12;
}

function passwordV(v){
  return v.length === 60;
}

function socketV(v){
  return v.length === 20;
}

User = mongoose.model('User', UserSchema);
module.exports = User;
