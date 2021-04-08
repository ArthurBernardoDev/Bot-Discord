const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");


client.on("ready", () => {
    console.log(`bot foi iniciado, com ${client.users.size} usuários, em ${client.channels.size} canais, em ${client.guilds.size} servidores.`);
    client.user.setGame(`Eu estou em ${client.guilds.size} servidores`);
});

client.on("guildCreate", guild => {
    console.log(`O bot entrou no servidor: ${guild.name} (id: ${guild.id}). População: ${guild.nemberCount} membros!`);
    client.user.setActivity(`Estou em ${client.guilds.size} servidores`);
});

client.on("guildDelete", guild => {
    console.log(`O bot foi removido do servidor: ${guild.name} (id: ${guild.id})`);
    client.user.setActivity(`Servubg ${client.guilds.size} servers`);
});

client.on("message", async message => {
    if(message.author.bot) return;
    if(message.author.type === "dm") return;
    if(!message.content.startsWith(config.prefix)) return;

    
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const comando = args.shift().toLowerCase();


    if(comando === "ping") {
        const m = await message.channel.send("Ping?");
        m.edit(`Pong! A Latência é ${m.createdTimestamp - message.createdTimestamp}ms. A Latencia da API é ${Math.round(client.ping)}ms`);

    }
});

client.login(config.token);

