const { SlashCommandBuilder } = require('discord.js');
const { DS_V3_key } = require('../../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('deepsuck')
		.setDescription('Server is busy, Please try again later.')
        .addStringOption(option => 
            option.setName('input')
                .setDescription('Here for prompt.')
                .setRequired(true)
        ),
	async execute(interaction) {
        await interaction.deferReply();
        const input = interaction.options.getString('input');
        console.log(`${interaction.user.username}'s input: Using options { ${input} }`);
        try {
            const response = await fetch("https://openrouter.ai/api/v1/chat/completions", 
                {
                    method: "POST",
                    headers: {
                      "Authorization": `Bearer ${DS_V3_key}`,
                      "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                      "model": "deepseek/deepseek-chat:free",
                      "messages": [
                        {
                          "role": "user",
                          "content": `1. English as default output language. 2. For cases when, Input contains Chinese OR Input asked to answer in Chinese, use Traditional Chinese to answer instead of Simplified and English. Input: ${input}`
                        }
                      ]
                    })
                });
            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }
            const data = await response.json();
            const content = data.choices?.[0]?.message?.content || 'No response received or ran out of credits for today.';
            const DISCORD_MAX_CHARS = 2000;
            // Split that shit if on9 DeepSuck still gives long text
            const splitContent = (text, maxLength) => {
                const chunks = [];
                let currentChunk = '';

                for (const char of text) {
                    if (currentChunk.length < maxLength) {
                        currentChunk += char;
                    } else {
                        chunks.push(currentChunk);
                        currentChunk = char;
                    }
                }
                if (currentChunk) {
                    chunks.push(currentChunk);
                }
                return chunks;
            };
            // Split content if it exceeds the limit
            if (content.length > DISCORD_MAX_CHARS) {
                const chunks = splitContent(content, DISCORD_MAX_CHARS);

                // Send the first chunk with editReply
                await interaction.editReply(chunks[0]);

                // Send subsequent chunks with followUp
                for (let i = 1; i < chunks.length; i++) {
                    await interaction.followUp(chunks[i]);
                }
            } else {
                // Send the full content if it's within the limit
                await interaction.editReply(content);
            }
        } catch (error) {
            console.log(error);
            await interaction.editReply('An error occurred while processing your request. Please try again later.');
        }
	},
};