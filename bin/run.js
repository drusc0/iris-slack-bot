'use strict';

const token = require('../tokenb'); 
const slackClient = require("../server/slackclient");
const service = require("../server/service");
const http = require('http');

const server = http.createServer(service);

const slacktoken = token.token;
const slackLogLevel = 'info';

const rtm = slackClient.init(slacktoken, slackLogLevel)
rtm.start()

slackClient.addAuthenticatedHandler(rtm, () => server.listen(3000));

server.on("listening", function() {
    console.log(`IRIS is listening on ${server.address().port} in ${service.get('env')} mode.`)
});