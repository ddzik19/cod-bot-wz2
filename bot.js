/** 
    Author: Damian Dzik
**/
//
// TODO: remove all comments when bot is ready for production
//
require("dotenv").config();
const Discord = require("discord.js");
const {
	Client,
	GatewayIntentBits,
	EmbedBuilder,
	PermissionsBitField,
} = require(`discord.js`);
const client = new Client({
	restTimeOffset: 0,
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
	],
});
// -------------------------------------------
// creating a file sync reader to read files
const fs = require("fs");

// creating a new collection of commands
client.commands = new Discord.Collection();

// getting all command files
const commandFiles = fs
	.readdirSync("commands")
	.filter((file) => file.endsWith(".js"));

// looping through files in commands and adding the commands into a collection
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
	// TODO: remove when out for production
	console.log(client.commands);
}
// -------------------------------------------
client.on("ready", () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

// commands
// the prefix of each command
const prefix = "!";
client.on("messageCreate", (msg) => {
	const args = msg.content.trim().split(".");
	const command = args[0].toLowerCase();

	// check if the message author is the bot or does the message start with a prefix
	if (msg.author.bot || !msg.content.startsWith(prefix)) return;

	if (command === "!cod") {
		if(args.length > 1){
			client.commands.get(args[1].toLowerCase()).execute(msg, args[2].toLowerCase());
			return
		}else{
			client.commands.get(args[1].toLowerCase()).execute(msg);
		}
	}

	// try {
	// 	if (command === "!cod") {
	// 		client.commands.get(args[1].toLowerCase()).execute(msg);
	// 	}
	// } catch (error) {
	// 	msg.channel.send("Type !cod.help in chat to see all the commands.");
	// }
});

(async () => {
	client.login(process.env.TOKEN);
})();
