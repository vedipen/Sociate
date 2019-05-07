'use strict';

module.exports.setup = function() {
    var builder = require('botbuilder');
    var teamsBuilder = require('botbuilder-teams');
    var bot = require('./bot');
    
    bot.connector.onQuery('getCorrectedText', function(event, query, callback) {
        
        // If the user supplied a title via the cardTitle parameter then use it or use a fake title
        var title = query.parameters && query.parameters[0].name === 'cardTitle'
            ? query.parameters[0].value
            : "Please type your message";

        
        // Build the data to send
        var attachments = [];
        
        if (title == "bad") {
           attachments.push(
                new builder.ThumbnailCard()
                    .text("different")
                    .toAttachment());
        }

        if (title.toLowerCase() == "you look gay") {
            title = "you look different";
         }
 
         
        if (title.toLowerCase() == "Dont be so pathetic") {
            title = "Dont be negative";
         }
         
        if (title.toLowerCase() == "you dont belong here") {
            title = "you might not be in the right place";
         }
         
        if (title.toLowerCase() == "women in tech are an anomaly") {
            title = "women in tech are rare";
         }
         
        if (title.toLowerCase() == "hail hydra") {
            title = "avengers assemble";
         }

        // const querystring = require('querystring');
        var postData = JSON.stringify({
            "comment": {
                "text": title
            },
            "languages": [
                "en"
            ],
            "requestedAttributes": {
                "TOXICITY": {}
            }
        });
        var out1 = "";
        
        console.log(postData);
        var http = require('https');
        var options = {
        host: 'commentanalyzer.googleapis.com',
        path: '***REMOVED***',
        port: 443,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': postData.length
          }
        };
        var req = http.request(options, function(res) {
        console.log('STATUS: ' + res.statusCode);
        console.log('HEADERS: ' + JSON.stringify(res.headers));

        // Buffer the body entirely for processing as a whole.
        var bodyChunks = [];
        res.on('data', function(chunk) {
            // You can process streamed parts here...
            bodyChunks.push(chunk);
        }).on('end', function() {
            var body = Buffer.concat(bodyChunks);
            console.log('BODY: ' + body);
            var jsonObj = JSON.parse(body);
            var out = jsonObj.attributeScores.TOXICITY.summaryScore.value;
            console.log(out);
            out1 = out;
            console.log(out1);
            
            // ...and/or process the entire body here.
        });
        
        });
        
               
        req.on('error', function(e) {
        console.log('ERROR: ' + e.message);
        });

        req.write(postData);
        req.end();   
        // if(title != "Please type your message") {
        //     attachments.push(
        //         new builder.ThumbnailCard()
        //         .text("Non inclusive nature : " + out1)
        //         .toAttachment());
        // }
                   
        attachments.push(
            new builder.ThumbnailCard()
            .text(title)
            .toAttachment());
        
        // Build the response to be sent
        var response = teamsBuilder.ComposeExtensionResponse
            .result('list')
            .attachments(attachments)
            .toResponse();

        // Send the response to teams
        callback(null, response, 200);
    });
};
