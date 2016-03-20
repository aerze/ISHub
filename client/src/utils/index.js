

var utils = {
  requireRoutes: function () {
    var context = require.context('../routes/', true, /\.js$/);
    var keys = context.keys();
    var modules = {};
    var i = 0;

    for (i = 0; i < keys.length; i++) {
      var key = keys[i].split('.')[1];

      console.log(key);

    }
  }
};

module.exports = utils;