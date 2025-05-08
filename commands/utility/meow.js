const { SlashCommandBuilder, AttachmentBuilder } = require('discord.js');
const path = './public/images/'

module.exports = {
	data: new SlashCommandBuilder()
		.setName('meow')
		.setDescription('catcat emoji meow meow~')
        .addStringOption(option => 
            option.setName('image')
                .setDescription('cry | gun | jump | love | mouthwater | nazi | sin | sleep | thumb')
                .setRequired(true)
        ),
	async execute(interaction) {
        const image = interaction.options.getString('image');
        console.log(`${interaction.user.username}'s input: Using options { ${image} }`);
        try{
            const reply = new AttachmentBuilder(`${path}${image}.jpg`);
            await interaction.reply({ files: [reply] });
        } catch(error){
            console.log(error);
            await interaction.reply("***Error*** in finding the image: *Image Not found.*");
        }
	},
};