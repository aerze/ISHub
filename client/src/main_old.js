
var ReactDOM = require('react-dom');
var ISHClient = require('./components/ISHClient');

// var page = require('page'); // load routes



// var utils = require('./utils');


// var test = {
//     root: function (context, next) {
//         console.log('context', context);
//     }
// }

// var routes = utils.requireRoutes();

// page('/', test.root);
// page();


ReactDOM.render(<ISHClient/>, document.getElementById('app'));

