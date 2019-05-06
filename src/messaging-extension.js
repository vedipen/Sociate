'use strict';

module.exports.setup = function() {
    var builder = require('botbuilder');
    var teamsBuilder = require('botbuilder-teams');
    var bot = require('./bot');

    bot.connector.onQuery('getCorrectedText', function(event, query, callback) {
        var faker = require('faker');

        // If the user supplied a title via the cardTitle parameter then use it or use a fake title
        var title = query.parameters && query.parameters[0].name === 'cardTitle'
            ? query.parameters[0].value
            : faker.lorem.paragraph();

        
        // Build the data to send
        var attachments = [];
        
        if (title == "bad") {
           attachments.push(
                new builder.ThumbnailCard()
                    .text("different")
                    .toAttachment());
        }

        // Generate 5 results to send with fake text and fake images
        for (var i = 0; i < 3; i++) {
            attachments.push(
                new builder.ThumbnailCard()
                    .text(faker.lorem.sentence())
                    .toAttachment());
        }

        for (var i = 0; i < 2; i++) {
            attachments.push(
                new builder.ThumbnailCard()
                    .text(title)
                    .toAttachment());
        }

        // Build the response to be sent
        var response = teamsBuilder.ComposeExtensionResponse
            .result('list')
            .attachments(attachments)
            .toResponse();

        // Send the response to teams
        callback(null, response, 200);
    });
};
