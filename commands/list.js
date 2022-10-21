/*
    Author: Damian Dzik
*/
const author = {
	name: "DevDamo",
};

const { EmbedBuilder } = require("discord.js");
const fs = require("fs");

const createEmbeds = (array, gun_type) => {
	const pages = array.length / 25;
	let embeds = [];
	if (pages > 1) {
		for (let i = 0; i <= pages; i++) {
			for (let j = 0; j < array.length; j + 25) {
				let chunk = array.splice(j, j + 25);
				let embed = new EmbedBuilder()
					.setColor("Blurple")
					.setTitle(`Warzone: ${gun_type.toUpperCase()} guns`)
					.setAuthor(author)
					.addFields(chunk);
				embeds.push(embed);
			}
		}
		return embeds;
	} else {
		let embed = new EmbedBuilder()
			.setColor("Blurple")
			.setTitle(`Warzone: ${gun_type.toUpperCase()} guns`)
			.setAuthor(author)
			.addFields(array);
		return embed;
	}
};

module.exports = {
	name: "list",
	description:
		"Display gun builds for specific gun type. \n EXAMPLE: !list.wz.sr \n GUN TYPES: ar, smg, lmg, sr, mr ,ps, shg, tac",
	cmd: "!list.<wz/wz2>.<gun_type>",
	execute(msg, wz_option, gun_type) {
		const dir_result = fs.readdirSync(`database/${wz_option}`);
		const games = dir_result.splice(1, dir_result.length);
		let guns_to_display = [];
		for (let game of games) {
			let guns = fs
				.readdirSync(`database/${wz_option}/${game}/`)
				.filter((file) => file.endsWith(".png"));

			for (let gun of guns) {
				let g_name = gun.split(".")[0];
				let g_type = g_name.split("_")[1];
				if (gun_type === g_type) {
					guns_to_display.push({
						name: `${gun.split("_")[0]}`,
						value: `${game}`,
						inline: true,
					});
				}
			}
		}

		const embeds = createEmbeds(guns_to_display, gun_type);
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
