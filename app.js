const express = require('express');
const app = express();
require('dotenv').config();
//________________WINSTON___________________
// const winston = require('winston');
// const toYAML = require('winston-console-formatter'); // makes the output more friendly
// const logger = createLogger();
//_______________!WINSTON!___________________
//___________________BOT_____________
const ViberBot = require('viber-bot').Bot;
const BotEvents = require('viber-bot').Events;
const TextMessage = require('viber-bot').Message.Text;


const bot = new ViberBot({
	authToken: process.env.VIBER_PUBLIC_ACCOUNT_ACCESS_TOKEN_KEY,
    name: "EchoBot",
    //logger: logger, //WINSTON PART
	avatar: "http://api.adorable.io/avatar/200/isitup" // It is recommended to be 720x720, and no more than 100kb.
});

app.use("/viber/webhook", bot.middleware());


bot.onTextMessage(/^hi|hello$/i, (message, response) =>
    response.send(new TextMessage(`Hi there ${response.userProfile.name}. I am ${bot.name}`)));
    
// Perfect! Now here's the key part:
bot.on(BotEvents.MESSAGE_RECEIVED, (message, response) => {
	// Echo's back the message to the client. Your bot logic should sit here.
	response.send(message);
});

console.log(process.env.DJIXON);
// Wasn't that easy? Let's create HTTPS server and set the webhook:
const https = require('https');
const port = process.env.PORT || 8080;

// Viber will push messages sent to this URL. Web server should be internet-facing.
const webhookUrl = process.env.WEBHOOK_URL;

const httpsOptions = {
	key: process.env.P_KEY,
	cert: process.env.CERTIFICATE,
	ca: process.env.CACERTIFICATE
}; // Trusted SSL certification (not self-signed).
https.createServer(httpsOptions, bot.middleware()).listen(port, () => bot.setWebhook(webhookUrl));

//_________________!BOT!__________________________
//_________________WINSTON________________________



// function createLogger() {
// 	const logger = winston.createLogger({
// 		level: "debug"
// 	}); // We recommend DEBUG for development
// 	logger.add(winston.transports.Console, toYAML.config());
// 	return logger;
// }

//________________!WINSTON!_______________________