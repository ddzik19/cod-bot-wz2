/*
    Author: Damian Dzik
    Desc: Embed with all  commands
*/
const {
    MessageEmbed,
    GatewayIntentBits
} = require('discord.js')

module.exports = {
    name: "help",
    execute(msg) {
        const newEmbed = new MessageEmbed()
            .setColor('a7fc00')
            .setDescription("All existing commands")
            .setTitle("Commands")
            .addFields({
                name: "!cod.help",
                value: "Displays all commands"
            });

        // creating the embed and sending it to the chat
        console.log("im working")
        return msg.channel.send({
            embeds: [newEmbed]
        });
    }
}