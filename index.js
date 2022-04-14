
const {Client, Intents, Interaction, Message} = require('discord.js');
const wait = require('util').promisify(setTimeout);

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

// BOT ONLINE 
client.once('ready', () => {
    console.log('Bot online!');
});

client.on('interactionCreate', async (interaction) => {

    //CONTROLLO CHE L'INTERAZIONE E' UN COMANDO
    if (!interaction.isCommand()) return;

    if (interaction.commandName === 'ping') {

        // await interaction.deferReply();
        // await wait(3000);
        await interaction.reply('Pong!');
        // await wait(3000);
        // await interaction.followUp('ancora Pong!');
        await wait(2000);
        await interaction.deleteReply();

    }

});

// FUNZIONE PER AGGIUNGERE COMANDI
client.on('messageCreate', async (message) => {

    if (!client.application?.owner) {

        await client.application?.fetch();

    }

    //CONTROLLO SE IL COMANDO E' STATO REGISTRATO DALL'AUTORE DEL BOT
    if (message.content.toLowerCase() === '!registra' && message.author.id === client.application?.owner.id) {
        
        const data = [

            {   name: 'ping',
                description: 'Risponde con Pong!',
            },

            {   name: 'pong',
            description: 'Risponde con Ping!',
            },
        ];

        //REGISTRO UN COMANDO GLOBALE
        // const comando = await client.application?.commands.create(data);
        // console.log(comando);

        //REGISTRO UN COMANDO GUILD
        const comando = await client.guilds.cache.get('964037548987019275')?.commands.set(data);
        console.log(comando);

    }

});

client.login('OTY0MDM2MjE1NjkzMjUwNjAx.YleysA.CmFFhXaBJRJm6jjM8kCwbqLNNQs');