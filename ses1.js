var AWS = require("aws-sdk");

AWS.config.loadFromPath(__dirname + '/aws.json');

var ses_mail = "From: <" + "admin@konfinity.com" + ">\n";
    ses_mail = ses_mail + "To: " + "aayush9152@gmail.com" + "\n";
    ses_mail = ses_mail + "Subject: AWS SES Attachment Example\n";
    ses_mail = ses_mail + "MIME-Version: 1.0\n";
    ses_mail = ses_mail + "Content-Type: multipart/mixed; boundary=\"NextPart\"\n\n";
    ses_mail = ses_mail + "--NextPart\n";
    ses_mail = ses_mail + "Content-Type: text/html; charset=us-ascii\n\n";
    ses_mail = ses_mail + "This is the body of the email.\n\n";
    ses_mail = ses_mail + "--NextPart\n";
    ses_mail = ses_mail + "--NextPart--";
    
    var params = {
        RawMessage: { Data: new Buffer(ses_mail) },
        Destinations: [ "aayush9152@gmail.com" ],
        Source: "<" + "admin@konfinity.com" + ">'"
    };
    

  var sendPromise = new AWS.SES({apiVersion: '2010-12-01'}).sendRawEmail(params).promise();

// Handle promise's fulfilled/rejected states
sendPromise.then(
  function(data) {
    console.log(data.MessageId);
  }).catch(
    function(err) {
    console.error(err, err.stack);
  });