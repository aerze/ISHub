

var IncrementStep = function (step) {
  var payload = {
    type: 'TEST_ACTION',
    step
  }

  console.log('Action Fired: ', payload.type, '\tPayload', payload);
  return payload;
};

module.exports = {
  IncrementStep
};