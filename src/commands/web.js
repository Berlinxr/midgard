const discord = require("discord.js");
const { ip } = require("../../berlin.json");

module.exports = {
    name: "web",
    description: "Sunucu Web Adresini Gösterir",
    usage: "!web",
    onlyowner: false,
    onlyadmin: false,

    run: async (client, message, args) => {
    message.reply(`${web}`);
    }
};