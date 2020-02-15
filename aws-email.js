var AWS = require("aws-sdk");

AWS.config.loadFromPath(__dirname + '/aws.json');

var params = {
    Destination: { /* required */
      CcAddresses: [
        'admin@konfinity.com',
        /* more items */
      ],
      ToAddresses: [
        'aayush9152@gmail.com',
        'aayushsas@gmail.com'
        /* more items */
      ]
    },
    Message: { /* required */
      Body: { /* required */
        Html: {
         Charset: "UTF-8",
         Data: "<!DOCTYPE html>"+
                "<head>"+
                    
                    "<title>Document</title>"+
                "</head>"+
                "<body>"+
                    "<p>Hello there</p>"+
                "</body>"+
                "</html>"
        },
        Text: {
         Charset: "UTF-8",
         Data: "TEXT_FORMAT_BODY"
        }
       },
       Subject: {
        Charset: 'UTF-8',
        Data: 'Test email'
       }
      },
    Source: 'admin@konfinity.com', /* required */
    ReplyToAddresses: [
       'noreply@konfinity.com',
      /* more items */
    ],
  };
  
  // Create the promise and SES service object
  var sendPromise = new AWS.SES({apiVersion: '2010-12-01'}).sendEmail(params).promise();
  
  // Handle promise's fulfilled/rejected states
  sendPromise.then(
    function(data) {
      console.log(data.MessageId);
    }).catch(
      function(err) {
      console.error(err, err.stack);
    });