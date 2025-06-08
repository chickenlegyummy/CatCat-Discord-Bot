const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Provides information about CatCat.'),
	async execute(interaction) {
		await interaction.reply(
`
# ***CatCat's command list:***\n
- **/carrot** - Kelvin eats carrot!\n
- **/cityu** - 吾城潮文\n
- **/deepsuck** - Ask questions to deepseek V3\n
- **/fun** - You know I know\n
- **/gpa** - GPA god will give you GPA\n
- **/meow** - Use panku stickers\n
`
		);
	},
};