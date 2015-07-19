var Moment = require('moment');

module.exports = {
  calculateTabAge: function(createdAt) {
    return Moment(createdAt).fromNow();
  }
}
