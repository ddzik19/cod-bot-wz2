/*
    Author: Damian Dzik
    Desc: Embed with all wz weapons
*/
const { EmbedBuilder } = require("discord.js");
const fs = require("fs");

// getting all command files
const path = "database/wz";
const dirs = fs.readdirSync(path).filter(function (file) {
	return fs.statSync(`${path}/${file}`).isDirectory();
});
const getGunsArray = (game_name) => {
	let gun_array = [];
	let guns_items = fs
		.readdirSync(`${path}/${game_name}`)
		.filter((file) => file.endsWith(".png"));
	guns_items.map((item) => {
		var gun_object = item.split(".")[0];
		var gun_items = gun_object.split("_");
		gun_array.push({
			name: gun_items[0],
			type: gun_items[1],
		});
	});
	return gun_array;
};

let gunArray = [];
dirs.map((dir) => {
	if (dir == "mw") {
		gunArray = getGunsArray("mw");
	}
	if (dir == "cw") {
		gunArray = getGunsArray("cw");
	}
	if (dir == "mw") {
		gunArray = getGunsArray("vg");
	}
});

const get_weapons = () => {
	const fields = [];
	gunArray.forEach((element) => {
		fields.push({
			inline: true,
			value: element.type,
			name: element.name,
		});
	});
	return fields;
};
module.exports = {
	name: "wz",
	execute(msg, game_name) {
		const fields = get_weapons();
		const newEmbed = new EmbedBuilder()
			.setColor("00D4FF")
			.setTitle(`Warzone: ${game_name.toUpperCase()}`)
			.setFields(fields);
		return msg.channel.send({
			embeds: [newEmbed],
		});
	},
};
