// 1. Text strings

var speechOutput;
var reprompt;
var welcomeOutput = "Willkommen. Wie kann ich helfen?";
var welcomeReprompt = "Sag einfach Gib mir ein Politiker Zitat.";


// 2. Skill Code

'use strict';
var Alexa = require('alexa-sdk'); // Alexa Skills Kit SDK for NodeJS

var APP_ID = 'amzn1.ask.skill.4802d143-7974-4aa1-853c-51ae9d3b1515';
//var speechOutput = ''; // is already defined

var handlers = {
    'LaunchRequest': function () {
        //This is triggered when users says "Alexa, öffne Politiker Zitate."
        
        //this.emit(':ask', 'Willkommen. Wie kann ich helfen?')
        
        this.emit(':ask', welcomeOutput, welcomeReprompt);        
    },
    
    'GetNewQuoteIntent': function () {
        //This is triggered when users say "Alexa, gib mir ein Zitat"
        
        //this.emit(':tellWithCard', 'Hello') //This will output "Hello" and close the session.
        // = equivalent 
        //this.response.speak(speechOutput).cardRenderer('Title', 'Body text') 
        //this.emit(':responseReady')	            
           
             
        //this.emit(':ask', 'Wie kann ich helfen?', 'Sag einfach...') //This will output "Wie kann ich helfen?" and wait for user input. If the user doesn't reply within a couple of seconds, it will re-prompt.
        // = equivalent
        //this.response.speak('Wie kann ich helfen?').listen('Sag einfach gib mir ein Politiker Zitat.')
		//this.emit(':responseReady')
		
		
		speechOutput = 'Hier ist ein Zitat von';
		this.emit(':ask', speechOutput, 'Soll ich das Zitat wiederholen?');
		// = equivalent
		this.response.speak('Hier ist ein Zitat von').listen('Soll ich das Zitat wiederholen?')
		this.emit(':responseReady')			
    },
    
    'AMAZON.HelpIntent': function () {
        //This is triggered when users say "Help"  
        
        speechOutput = 'Sag einfach Gib mir ein Politiker Zitat.';
        reprompt = 'Oder sage Wiederhole das Zitat.';
        this.emit(':ask', speechOutput, reprompt);      
    },
    
    'AMAZON.CancelIntent': function () {
        //This is triggered when users say "Cancel"  
        
        speechOutput = 'Der Skill wird abgebrochen';
        this.emit(':tell', speechOutput);    
    },
    
    'AMAZON.StopIntent': function () {
        //This is triggered when users say "Stop"
        
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
