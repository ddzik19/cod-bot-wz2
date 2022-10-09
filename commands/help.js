/*
    Author: Damian Dzik
    Desc: Embed with all  commands
*/
const { EmbedBuilder } = require("discord.js");

module.exports = {
	name: "help",
	execute(msg) {
		const newEmbed = new EmbedBuilder()
			.setColor("a7fc00")
			.setTitle("Commands")
			.addFields({
				name: "!cod.help",
				value: "Displays all commands",
			});
		return msg.channel.send({
			embeds: [newEmbed],
		});
	},
};
