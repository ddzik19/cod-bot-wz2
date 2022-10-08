/** 
    Author: Damian Dzik
**/

require("dotenv").config();
const Discord = require("discord.js");
const {
	Client,
	GatewayIntentBits,
	MessageEmbed,
	MessageAttachment,
} = require("discord.js");
const client = new Client({
	restTimeOffset: 0,
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildMembers,
	],
});

client.on("ready", () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.login(process.env.TOKEN);
