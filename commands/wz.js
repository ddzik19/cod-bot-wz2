/*
    Author: Damian Dzik
    Desc: Embed with all wz weapons
*/
const { EmbedBuilder } = require("discord.js");
const fs = require("fs");

// getting all command files
const guns = fs
	.readdirSync("database/wz")
	.filter((file) => file.endsWith(".png"));

const gunArray = [];
guns.map((gun) => {
	var gun_object = gun.split(".")[0];
	var gun_items = gun_object.split("_");
	gunArray.push({
		game: gun_items[0],
		name: gun_items[1],
		type: gun_items[2],
	});
});

const get_weapons = (game_name) => {
	const fields = [];
	gunArray.forEach((element) => {
		if (game_name == "mw") {
			fields.push({
				inline: true,
				value: element.type.toUpperCase(),
				name: element.name.toUpperCase(),
			});
		}
		if (game_name == "bo") {
			fields.push({
				inline: true,
				value: element.type.toUpperCase(),
				name: element.name.toUpperCase(),
			});
		}
		if (game_name == "vg") {
			fields.push({
				inline: true,
				value: element.type.toUpperCase(),
				name: element.name.toUpperCase(),
			});
		}
	});
	return fields;
};
module.exports = {
	name: "wz",
	execute(msg, game_name) {
		const fields = get_weapons(game_name);
		const newEmbed = new EmbedBuilder()
			.setColor("00D4FF")
			.setTitle(`Warzone: ${game_name.toUpperCase()}`)
			.setFields(fields);
		return msg.channel.send({
			embeds: [newEmbed],
		});
	},
};
