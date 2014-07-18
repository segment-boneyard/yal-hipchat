
var request = require('superagent');
var levels = require('yal').levels;
var pretty = require('prettyjson');
var fmt = require('util').format;
var assert = require('assert');

/**
 * Initialize the Hipchat plugin with `options`.
 *
 * @param {Object} options
 *
 *   - key {String} a hipchat v2 api key
 *   - level {String} the minimum level to log at ("error")
 *   - rooms {Array}
 *
 * @return {Function} plugin
 */

module.exports = function(options){
  assert(options, 'options required');
  assert(options.key, '.key required');
  options.level = options.level || 'error';
  assert(levels[options.level] != null, 'must have a valid .level');

  var client = new Client(options);
  return function(server){
    server.on('message', function(msg){
      if (levels[msg.level] < levels[options.level]) return;
      client.send(msg);
    });
  };
};

/**
 * Create a new hipchat client from `options`.
 *
 * @param {Object} options
 *
 *   - key {String} the api key
 *   - rooms {Array} a list of room names
 */

function Client(options){
  this.rooms = options.rooms || [];
  this.key = options.key;
}

/**
 * Sent the `msg` to each of the enabled rooms
 *
 * @param {Object} msg
 */

Client.prototype.send = function(msg){
  var self = this;
  this.rooms.forEach(function(room){
    self.notify(msg, room);
  });
}

/**
 * Notify a particular room of the message
 *
 * @param {Object} msg
 * @param {String} room the name of the room
 */

Client.prototype.notify = function(msg, room){
  var url = fmt('https://api.hipchat.com/v2/room/%s/notification', room);
  var key = this.key;
  request
    .post(url)
    .query({ auth_token: key })
    .send({ color: 'red' })
    .send({ message: format(msg) })
    .send({ message_format: 'html' })
    .end(function(err, res){
      if (err) return console.error('error sending to hipchat', err);
      if (!res.ok) return console.warn('received invalid hipchat response: %d', res.status);
    });
}

/**
 * Format the message a bit more nicely for hipchat
 *
 * @param {Object} msg
 * @return {String}
 */

function format(msg){
  var rendered = pretty.render(msg, { noColor: true });
  return fmt('<b>%s:</b><pre>\n%s\n</pre>', msg.level, rendered);
};