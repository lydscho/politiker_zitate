

'use strict';
const Alexa = require('alexa-sdk'); // Alexa Skills Kit SDK for NodeJS

const APP_ID = 'amzn1.ask.skill.4802d143-7974-4aa1-853c-51ae9d3b1515';


const handlers = {
    'LaunchRequest': function () {
        //This is triggered when users say "Alexa, öffne politiker zitate."
        
        this.emit(':ask', 'Willkommen. Wie kann ich helfen?')
    },
    
    'GetNewQuoteIntent': function () {
        //This is triggered when users say "Alexa, gib mir ein zitat"
        
        this.emit(':tellWithCard', 'Hello') //This will output "Hello" and close the session.
        // = equivalent 
        this.response.speak(speechOutput).cardRenderer('Title', 'Body text') 
        this.emit(':responseReady')	
            
                
             
        this.emit(':ask', 'Wie kann ich helfen?', 'Sag einfach...') //This will output "Wie kann ich helfen?" and wait for user input. If the user doesn't reply within a couple of seconds, it will re-promt.
        // = equivalent
        this.response.speak('Wie kann ich helfen?').listen('Sag einfach gib mir ein zitat.')
		this.emit(':responseReady')	      
    },
    
    'AMAZON.HelpIntent': function () {
        //This is triggered when users say "Help"        
    },
    
    'AMAZON.CancelIntent': function () {
        //This is triggered when users say "Cancel"      
    },
    
    'AMAZON.StopIntent': function () {
        //This is triggered when users say "Stop"
    },
    
};

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
