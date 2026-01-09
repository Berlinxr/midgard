const discord = require("discord.js");
const { ip } = require("../../berlin.json");

module.exports = {
    name: "ip",
    description: "Sunucu IP'sini Gösterir",
    usage: "!ip",
    onlyowner: false,
    onlyadmin: false,

    run: async (client, message, args) => {
    message.reply(`${ip}`);
    }
};