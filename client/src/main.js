
var ReactDOM = require('react-dom');
// var page = require('page'); // load routes
var ISHClient = require('./components/ISHClient');



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

// require('./ui');
