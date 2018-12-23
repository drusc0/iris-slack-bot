'use strict';

const { RTMClient, CLIENT_EVENTS } = require("@slack/client");
let rtm = null;

function handleOnAuthenticated(rtmStartData) {
    console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}, but not yet connected to the channel.`);
}


function handleOnMessage(message) {
    console.log(message);

    rtm.sendMessage("Hello back, I am dumb", message.channel, function messageSent() {
        
    });
}


function addAuthenticatedHandler(rtm, handler) {
    rtm.on('authenticated', handler);
}


module.exports.init = function slackClient(token, loglevel) {
    rtm = new RTMClient(token, {logLevel: loglevel});
    addAuthenticatedHandler(rtm, handleOnAuthenticated);
    rtm.on('message', handleOnMessage);
    return rtm;
}

module.exports.addAuthenticatedHandler = addAuthenticatedHandler;