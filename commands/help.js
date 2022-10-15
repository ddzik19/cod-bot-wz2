/*
    Author: Damian Dzik
    Desc: Embed with all commands
*/
const {
	Client,
	GatewayIntentBits,
	EmbedBuilder,
} = require(`discord.js`);
const createEmbed = (fields) => {
	const color = "a7fc00";
	const embed = new EmbedBuilder()
		.setColor(color)
		.setTitle("Commands:")
		.setFields(fields);
	return embed;
};

module.exports = {
	name: "help",
	description: "Display all available commands for the bot.",
	cmd: "!cod.help",
	execute(msg, fields) {
		const embed = createEmbed(fields);
		return msg.channel.send({
			embeds: [embed],
		});
	},
};
