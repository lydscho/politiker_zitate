// 1. Text strings

var speechOutput;
var reprompt;
var welcomeOutput = 'Willkommen. Willst du ein Politiker Zitat hören?';
var welcomeReprompt = 'Sag einfach Gib mir ein Politiker Zitat.';

var SKILL_NAME = 'politiker zitate';
var GET_QUOTE_MESSAGE = 'Hier ist ein Zitat von ';
var STOP_MESSAGE = 'Ok, bis bald!';


const data = [ 
    'Angela Merkel. bla bla. ',
    'Horst Seehofer. bla bla. ',
    'Wolfgang Schäuble. bla bla. ',
    'Alexander Gauland. bla bla. ',
    'Andreas Scheuer. bla bla. ',
    'Christian Lindner. bla bla. ',
    'Helmut Schmidt. bla bla. ',
];


// 2. Skill Code

'use strict';
var Alexa = require('alexa-sdk'); 

var APP_ID = 'amzn1.ask.skill.4802d143-7974-4aa1-853c-51ae9d3b1515';

var handlers = {
    'LaunchRequest': function () {        
        this.emit(':ask', welcomeOutput, welcomeReprompt);
    },
    
    'GetNewQuoteIntent': function () {  		
		const factArr = data;
        const factIndex = Math.floor(Math.random() * factArr.length);
        const randomFact = factArr[factIndex];
        const speechOutput = GET_QUOTE_MESSAGE + randomFact;
        
        this.attributes.lastSpeech = randomFact; 
        this.response.cardRenderer(SKILL_NAME, randomFact); 
        this.response.speak(speechOutput + "Willst du noch ein Zitat hören?").listen("Willst du noch ein Zitat hören?"); 
        this.emit(':responseReady');         
    },
        
    'AMAZON.RepeatIntent': function () {
        this.response.speak(this.attributes.lastSpeech + "Willst du noch ein Zitat hören?").listen("Willst du noch ein Zitat hören?"); 
        this.emit(':responseReady'); 
     },
    
    'AMAZON.YesIntent': function () { 
        this.emit("GetNewQuoteIntent"); 
    }, 
    
    'AMAZON.NoIntent': function () { 
        this.response.speak(STOP_MESSAGE); 
        this.emit(':responseReady'); 
    }, 
    
    'AMAZON.HelpIntent': function () { 
        
        speechOutput = 'Sag einfach: Gib mir ein Politiker Zitat.';
        reprompt = 'Oder sage: Wiederhole das Zitat.';
        this.emit(':ask', speechOutput, reprompt);      
    },
    
    'AMAZON.CancelIntent': function () {
        
        speechOutput = 'Der Skill wird abgebrochen';
        this.emit(':tell', speechOutput);    
    },
    
    'AMAZON.StopIntent': function () {
        
        speechOutput = 'Bis bald.';
        this.emit(':tell', speechOutput);
    },
    
};


exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
