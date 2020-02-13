// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region 
// const credentials = require("./aws.json");

// AWS.config.update = credentials;
// AWS.config.update({region : "ap-south-1"});

AWS.config.loadFromPath('./aws.json');
// console.log(credentials)


var params = {
  Template: { 
    TemplateName: 'test1', /* required */
    HtmlPart: '<!DOCTYPE html>'+
              '<html>'+
              '<body>'+
              '<h1>This text should be large, because it is formatted as a header in HTML.</h1>'+
              '<p>Here is a formatted link: <a href="https://docs.aws.amazon.com/ses/latest/DeveloperGuide/Welcome.html">Amazon Simple Email Service Developer Guide</a>.</p>'+
              '</body>'+
              '</html>',
    SubjectPart: 'SUBJECT_LINE',
    TextPart: 'TEXT_CONTENT'
  }
};

// Create the promise and SES service object
var templatePromise = new AWS.SES({apiVersion: '2010-12-01'}).createTemplate(params).promise();

// Handle promise's fulfilled/rejected states
templatePromise.then(
  function(data) {
    console.log(data);
  }).catch(
    function(err) {
    console.error(err, err.stack);
  });