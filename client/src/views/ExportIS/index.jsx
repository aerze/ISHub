var React = require('react');
var fs = pull('fs');

console.log('------------------------------------');
console.log(fs);
console.log('------------------------------------');

var ExportISView = React.createClass({
    displayName: 'ExportISView',
    render() {
        return (
            <div>ExportISView</div>
        );
    }
});

module.exports = ExportISView;