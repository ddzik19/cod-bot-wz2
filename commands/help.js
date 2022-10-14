/*
    Author: Damian Dzik
    Desc: Embed with all commands
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
			},{
				name: "!build.<wz/wz2>.<game_name>.<gun_name>",
				value: "Display a specific gun build for a game. \n EXAMPLE: !build.wz.cw.mp5"
			},
			{
				name: "!list.<wz/wz2>.<gun_type>",
				value: "Display a specific gun build for a game. \n EXAMPLE: !build.wz.sr \n GUN TYPES: ar, smg, lmg, sr, mk ,ps, shg, tac" 
			}
			);
		return msg.channel.send({
			embeds: [newEmbed],
		});
	},
};
