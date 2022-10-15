const { EmbedBuilder, AttachmentBuilder } = require("discord.js");
const fs = require("fs");

const getGunImageUrl = (wz_option, game_name, gun_name) => {
	let images = fs
		.readdirSync(`database/${wz_option}/${game_name}/`)
		.filter((file) => file.endsWith(".png"));

	for (let i = 0; i <= images.length; i++) {
		const element = images[i];
		let image = element.split("_");
		if (image[0] === gun_name) {
			let imageInfo = [
				`./database/${wz_option}/${game_name}/${element}`,
				element,
			];
			return imageInfo;
		}
	}
};

const getColorForEmbed = (game_name) => {
	let color = "";
	if (game_name == "mw") {
		color = "00D4FF";
	} else if (game_name == "cw") {
		color = "FF0000";
	} else if (game_name == "vg") {
		color = "FFFB00";
	} else if (game_name == "aw") {
		color = "2b2b2b";
	} else if (game_name == "mw2") {
		color = "FFFB00";
	}
	return color;
};

module.exports = {
	name: "build",
	description:
		"Display a specific gun build for a game. \n EXAMPLE: !build.wz.cw.mp5",
	cmd:"!build.<wz/wz2>.<game_name>.<gun_name>",
	execute(msg, wz_option, game_name, gun_name) {
		const image = getGunImageUrl(wz_option, game_name, gun_name);
		const attachment = new AttachmentBuilder(image[0]);
		const color = getColorForEmbed(game_name);
		const embed = new EmbedBuilder()
			.setColor(color)
			.setTitle(`Warzone: ${game_name.toUpperCase()}`)
			.setDescription(gun_name)
			.setImage((url = `attachment://${image[1]}`));
		return msg.channel.send({
			files: [attachment],
			embeds: [embed],
		});
	},
};
