const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('gpa')
		.setDescription('Provides information about the user.')
		.addStringOption(option => 
            option.setName('name')
                .setDescription('Whos GPA')
                .setRequired(false)
        ),
	async execute(interaction) {
		const input = interaction.options.getString('name');
		if (input){
			console.log(`${interaction.user.username}'s input: Using options { ${input} }`);
			await interaction.reply(`${input} 你今個sem既GPA係 ${Math.round((Math.random() * 4.3) * 100) / 100}`);
		} else
		await interaction.reply(`${interaction.member.nickname} 你今個sem既GPA係 ${Math.round((Math.random() * 4.3) * 100) / 100}`);
	},
};