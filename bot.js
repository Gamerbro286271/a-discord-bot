const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log('I am ready!');
});
					   
client.on('guildMemberAdd', member => {
	const channel = member.guild.channels.find(ch => ch.name === 'welcome');
	if (!channel) return;
	channel.send(`Welcome to the server, ${member}`);
    let memberRole = member.guild.roles.find("name", "Member");
    member.addRole(memberRole);               
});

client.on("message", message => {
    if(message.author.bot) return;

    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);

    if(message.channel.type === "dm") return;

    if(!message.content.startsWith('+')) return;

    if(command === '+ann') {
        let channel = message.mentions.channels();
        let announcement = args.slice(1).join(" ");

        channel.send(announcement);
    }
}

client.on('message', message => {
    if (message.content === 'ping') {
    	message.reply('pong');
  	}
});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
