const { EmbedBuilder } = require("discord.js");
const { durum } = require("../../berlin.json");

module.exports = {
    name: "anket",
    description: "Anket Oluşturur",
    usage: "!anket",
    onlyowner: false,
    onlyadmin: true,

    run: async (client, message, args) => {
    const anketSoru = args.join(" ");
    if (!anketSoru) {
        return message.reply("Lütfen bir anket sorusu girin.");
    }
    const anketEmbed = new EmbedBuilder()
        .setTitle("📊 Anket")
        .setDescription(anketSoru)
        .setColor(durum === "acik" ? "#00FF00" : "#FF0000")
        .setFooter({ text: `Anketi oluşturan: ${message.author.tag}`, iconURL: message.author.displayAvatarURL() })
        .setTimestamp();
    const anketMesaji = await message.channel.send({ embeds: [anketEmbed] });
    await anketMesaji.react("✅");
    await anketMesaji.react("❌");
    }
};