const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var path = require('path');

//Middleware
app.use(express.static(__dirname + '/public'));

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false}));

//parse application/json
app.use(bodyParser.json());

app.listen(3000, function() {
    console.log("listening on port 3000");
})

app.post('/', function(req, res) {
    addEmailToMailChimp(req.body.email);
    console.log(req.body.email);
    res.sendfile('public/output.html');
});

function addEmailToMailChimp(email) {
    var request = require("request");

    var options = { method: 'POST',
      url: 'https://us7.api.mailchimp.com/3.0/lists/7b0d641224/members',
      headers: 
       { 'Postman-Token': '123be29c-9165-44dd-8eba-3c763c785bab',
         'Cache-Control': 'no-cache',
         Authorization: 'Basic YW55c3RyaW5nOmQzYjhkZDc2MmIyNzg4YjliZTZhMjEyMmFkMjBlZDdkLXVzNw==',
         'Content-Type': 'application/json' },
      body: 
       { email_address: email,
         status: 'subscribed' },
      json: true };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);

      console.log(body);
    });
};
