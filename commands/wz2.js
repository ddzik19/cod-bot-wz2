/*
    Author: Damian Dzik
    Desc: Embed with all wz2 weapons
*/
const author = {
	name: "DevDamo",
};

const { EmbedBuilder } = require("discord.js");
const fs = require("fs");

const path = "database/wz2";
const getGunsArray = (game_name) => {
	let gun_array = [];
	try {
		let guns_items = fs
			.readdirSync(`${path}/${game_name}/`)
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
	} catch (error) {
		throw error;
	}
};

const createEmbeds = (array, game_name) => {
	let color = "";
	if (game_name == "mw2") {
		color = "FFFB00";
	} else if (game_name == "aw") {
		color = "00D4FF";
	}

	let pages = array.length / 25;
	let embeds = [];
	if (pages > 1) {
		for (let i = 0; i <= pages; i++) {
			for (let j = 0; j < array.length; j + 25) {
				let chunk = array.splice(j, j + 25);
				let embed = new EmbedBuilder()
					.setColor(color)
					.setTitle(`Warzone: ${game_name.toUpperCase()}`)
					.setAuthor(author)
					.addFields(chunk);
				embeds.push(embed);
			}
		}
		return embeds;
	} else {
		let embed = new EmbedBuilder()
			.setColor(color)
			.setTitle(`Warzone: ${game_name.toUpperCase()}`)
			.setAuthor(author)
			.addFields(array);
		return embed;
	}
};

const get_fields = (array) => {
	const fields = [];
	array.forEach((element) => {
		fields.push({
			inline: true,
			value: element.type.toUpperCase(),
			name: element.name.toUpperCase(),
		});
	});
	return fields;
};

module.exports = {
	name: "wz2",
	description:
		"Displays all available gun builds for the specified game, \n [ mw2 ]",
	cmd: "!cod.wz2.<game_name>",
	execute(msg, game_name) {
		const guns = getGunsArray(game_name);
		const fields = get_fields(guns);
		const embeds = createEmbeds(fields, game_name);
		if (embeds.length > 1) {
			for (let i = 0; i < embeds.length; i++) {
				msg.channel.send({
					embeds: [embeds[i]],
				});
			}
		} else {
			return msg.channel.send({
				embeds: [embeds],
			});
		}
		return;
	},
};
