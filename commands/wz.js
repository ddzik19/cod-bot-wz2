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
	gunArray.push(gun_items[1]);
});

const fields = [];
gunArray.map((element) => {
	return fields.push({
		inline: true,
		name: "hello",
		value: element,
	});
});

module.exports = {
	name: "wz",
	execute(msg) {
		const newEmbed = new EmbedBuilder()
			.setColor("00D4FF")
			.setTitle("Warzone")
			.setFields(fields);
		// .addFields(fields);
		return msg.channel.send({
			embeds: [newEmbed],
		});
	},
};
