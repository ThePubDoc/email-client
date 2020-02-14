var AWS = require('aws-sdk');


AWS.config.loadFromPath(__dirname + '/aws.json');

var templatePromise = new AWS.SES({apiVersion: '2010-12-01'}).getTemplate({TemplateName: 'test1'}).promise();

// Handle promise's fulfilled/rejected states
templatePromise.then(
  function(data) {
    console.log(data.SubjectPart);
  }).catch(
    function(err) {
    console.error(err, err.stack);
  });
  