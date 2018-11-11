// 1. Text strings

var speechOutput;
var reprompt;
var welcomeOutput = 'Willkommen. Willst du ein Politiker Zitat hören?';
var welcomeReprompt = 'Sag einfach Gib mir ein Politiker Zitat.';

var SKILL_NAME = 'politiker zitate';
var GET_QUOTE_MESSAGE = 'Hier ist ein Zitat von   ';
//var GET_ANOTHER_MESSAGE = "Hier ist noch ein Zitat. Dieses ist von   ";
//var REPEAT_MESSAGE = "Ich wiederhole das Zitat";
//var HELP_MESSAGE = 'Sag einfach Gib mir ein Politiker Zitat, oder sage abbrechen, um den Skill zu beenden... Was möchstest du tun?';
//var HELP_REPROMPT = 'Wie kann ich dir helfen?';
var STOP_MESSAGE = 'Bis bald!';


const data = [
    'Horst Seehofer. bla bla. ',
    'Wolfgang Schäuble. bla bla. ',
    'Angela Merkel. bla bla. ',
    'Alexander Gauland. bla bla. ',
    'Andreas Scheuer. bla bla. ',
    'Christian Lindner. bla bla. ',
    'Helmut Schmidt. bla bla. ',
    'Wolfgang Schäuble. bla bla. ',
];


// 2. Skill Code

'use strict';
var Alexa = require('alexa-sdk'); // Alexa Skills Kit SDK for NodeJS

var APP_ID = 'amzn1.ask.skill.4802d143-7974-4aa1-853c-51ae9d3b1515';
//var speechOutput = '';

var handlers = {
    'LaunchRequest': function () {
        //This is triggered when users say "Alexa, öffne Politiker Zitate."
        
        //this.emit(':ask', 'Willkommen. Wie kann ich helfen?')
        
        this.emit(':ask', welcomeOutput, welcomeReprompt);
    },
    
    'GetNewQuoteIntent': function () {
        //This is triggered when users say "Alexa, gib mir ein Zitat"
        
        //this.emit(':tellWithCard', 'Hello'); //This will output "Hello" and close the session.
        // = equivalent 
        //this.response.speak(speechOutput).cardRenderer('Title', 'Body text') 
        //this.emit(':responseReady')	            
           
             
        //this.emit(':ask', 'Wie kann ich helfen?', 'Sag einfach...'); //This will output "Wie kann ich helfen?" and wait for user input. If the user doesn't reply within a couple of seconds, it will re-prompt.
        // = equivalent
        //this.response.speak('Wie kann ich helfen?').listen('Sag einfach gib mir ein Politiker Zitat.')
		//this.emit(':responseReady')
		
		
		//speechOutput = 'Hier ist ein Zitat von';
		//this.emit(':ask', speechOutput, 'Soll ich das Zitat wiederholen?');
		// = equivalent
		//this.response.speak('Hier ist ein Zitat von').listen('Soll ich das Zitat wiederholen?');
		//this.emit(':responseReady')
		
		
		const factArr = data;
        const factIndex = Math.floor(Math.random() * factArr.length);
        const randomFact = factArr[factIndex];
        const speechOutput = GET_QUOTE_MESSAGE + randomFact;
        
        this.attributes.lastSpeech = randomFact; //adding the last fact to the session attributes, so we can use it to repeat it if requested by the user. 
        this.response.cardRenderer(SKILL_NAME, randomFact); 
        this.response.speak(speechOutput + "Willst du noch ein Zitat hören?").listen("Willst du noch ein Zitat hören?"); 
        this.emit(':responseReady'); 
    

        //this.response.cardRenderer(SKILL_NAME, randomFact);
        //this.emit(':ask', speechOutput, 'Soll ich das Zitat wiederholen?');
        // = equivaltent
        //this.response.speak(speechOutput).listen('Soll ich das Zitat wiederholen?');
        //this.emit(':responseReady');
    },
    
     'AMAZON.RepeatIntent': function () { 
        //This is triggered when users say "Repeat"
         
        //speechOutput = 'OK, ich wiederhole das Zitat.';
        //this.emit(':ask', speechOutput);
    
         
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
