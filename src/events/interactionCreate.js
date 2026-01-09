const { ChannelType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionsBitField } = require("discord.js");
const { moderator, asistan, parentID } = require("../../berlin.json");
const { QuickDB } = require("quick.db");
const path = require("path");
const db = new QuickDB({
  filePath: path.join(__dirname, "../../database/tickets.sqlite")
});

module.exports = {
  name: "interactionCreate",
  execute: async (interaction) => {

    // sadece buton
    if (!interaction.isButton()) return;

    const { customId, guild, user, channel } = interaction;

    try {
      switch (customId) {

        // KANAL OLUŞTURMA
        case "destek": {
          const yeniKanal = await guild.channels.create({
            name: `ticket-${user.id}`,
            type: ChannelType.GuildText,
            parent: parentID,
            permissionOverwrites: [
              {
                id: guild.id,
                deny: ["ViewChannel"]
              },
              {
                id: asistan,
                allow: ["ViewChannel", "SendMessages"]
              },
              {
                id: moderator,
                allow: ["ViewChannel", "SendMessages"]
              },
              {
                id: user.id,
                allow: ["ViewChannel", "SendMessages"]
              }
            ]
          });

          await db.set(`ticket_${yeniKanal.id}`, {
            owner: user.id,
            channel: yeniKanal.id
          });
          
          const embed = new EmbedBuilder()
            .setTitle(`Destek Talebi`)
            .setDescription(`Merhaba ${user}, yetkililer en kısa sürede sizinle ilgilenecektir. Sabırlı olmanızı rica ederiz.`)
            .setColor("#8B8000")
            .setTimestamp();

          const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
              .setCustomId("kanal_kapat")
              .setLabel("❌ Kanalı Kapat")
              .setStyle(ButtonStyle.Danger)
          );

          yeniKanal.send({ embeds: [embed], components: [row], content: `<@${moderator}> <@${asistan}>` });
          

          return interaction.reply({
            content: `✅ Kanal oluşturuldu: ${yeniKanal}`,
            ephemeral: true
          });
        }

        case "kanal_kapat": {
          return interaction.reply({
            content: `❗ Kanalı kapatmak istediğinize emin misiniz?`,
            components: [
              new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                  .setCustomId("kanal_kapat_onay")
                  .setLabel("Evet, Kapat")
                  .setStyle(ButtonStyle.Danger))], ephemeral: false });
        }

        // KANAL KAPATMA
        case "kanal_kapat_onay": {
          await interaction.reply({
            content: "🗑️ Ticket Kapanıyor...",
            ephemeral: true
          });


        const yKanal = interaction.channel;
        tickett = await db.get(`ticket_${yKanal.id}`);

        yKanal.permissionOverwrites.edit(tickett.owner, { ViewChannel: false, SendMessages: false });
        await yKanal.setName(`closed-${tickett.owner}`);
      }

      }
    } catch (err) {
      console.error("Buton error:", err);

      if (!interaction.replied) {
        interaction.reply({
          content: "❌ Bir hata oluştu.",
          ephemeral: true
        });
      }
    }
  }
};
