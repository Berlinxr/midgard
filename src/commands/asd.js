const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { emoji } = require("../../berlin.json");


module.exports = {
    name: ".msj",
    description: "Ticket Sistemi için yeniden düzenlenmiş bilgilendirme mesajı.",
    usage: ".msj",
    onlyowner: false,

    run: async (client, message, args) => {

    const embed = new EmbedBuilder()
        .setTitle(`Midgard NW`)
        .setDescription(`${emoji} Destek talebi oluşturmak için aşağıdaki butona tıklayın!`)
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .setFooter({ text: `Berlin ❤️ 180Hz` })
        .setImage("https://cdn.discordapp.com/attachments/857714045251878972/1422461258288070737/KimLipLOONAMandy_Bunny_pic....gif?ex=69181548&is=6916c3c8&hm=8e188e4dc848527ee89de55b37808008473fb37ea33a4b5b709c2f52833105bf")
        .setColor("#8B8000")
        .setTimestamp();
        const confirm = new ButtonBuilder().setCustomId('destek').setLabel('Destek Sistemi Oluştur').setStyle(ButtonStyle.Primary);
        const row = new ActionRowBuilder().addComponents(confirm);
    message.channel.send({ embeds: [embed], components: [row] });

    }
};