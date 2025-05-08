const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('carrot')
		.setDescription('Replies with carrot!'),
	async execute(interaction) {
		await interaction.reply('Kelvin gor eats carrot! 🥕🥕');
	},
};