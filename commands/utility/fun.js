const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('fun')
		.setDescription('You wanna have some fun!?')
        .addStringOption(option => 
            option.setName('name')
                .setDescription('Who wants to play games')
                .setRequired(true)
        ),
	async execute(interaction) {
        const name = interaction.options.getString('name');
        console.log(`${interaction.user.username}'s input: Using options { ${name} }`);
        const replies = [
            `${name} wants to have fun with girls`,
            `${name} wants to have sex with girls`,
            `${name} wants to have children with girls`,
            `${name} wants to taste girls`
        ];
        const index = Math.floor(Math.random()*4);
		await interaction.reply(replies[index]);
	},
};