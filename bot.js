/** 
    Author: Damian Dzik
**/
require("dotenv").config();
const Discord = require("discord.js");
const {
	Client,
	GatewayIntentBits,
} = require(`discord.js`);
const client = new Client({
	restTimeOffset: 0,
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
	],
});
const fs = require("fs");

client.commands = new Discord.Collection();

const commandFiles = fs
	.readdirSync("commands")
	.filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

const helpCommands = []
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	helpCommands.push({
		name: command.cmd,
		value: command.description,
		inline: false
	})
}

client.on("ready", () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

const prefix = "!";
client.on("messageCreate", (msg) => {
	const args = msg.content.trim().split(".");
	const command = args[0].toLowerCase();

	if (msg.author.bot || !msg.content.startsWith(prefix)) return;
	if (command === "!cod") {
		if (args.length == 2) {
			if(args[1] == "help"){
				client.commands.get(args[1].toLowerCase()).execute(msg, helpCommands)
			}else {
				client.commands.get(args[1].toLowerCase()).execute(msg);
			}
		} else if (args.length > 2) {
			client.commands
				.get(args[1].toLowerCase())
				.execute(msg, args[2].toLowerCase());
		}
	}
	if (command === "!build") {
		let noPrefixCmd = command.split("!")
		client.commands
			.get(noPrefixCmd[1].toLowerCase())
			.execute(
				msg,
				args[1].toLowerCase(),
				args[2].toLowerCase(),
				args[3].toLowerCase()
			);
	}
	if(command === "!list"){
		let noPrefixCmd = command.split("!")
		client.commands
			.get(noPrefixCmd[1].toLowerCase())
			.execute(
				msg,
				args[1].toLowerCase(),
				args[2].toLowerCase(),
			);
	}
	// try {

	// } catch (error) {
	// 	msg.channel.send("Type !cod.help in chat to see all the commands.");
	// }
});

(async () => {
	client.login(process.env.TOKEN);
})();
