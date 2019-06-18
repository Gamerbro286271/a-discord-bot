const Discord = require('discord.js');
const client = new Discord.Client();

const PREFIX = '!';

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

client.on = async (bot, message, args) => {

      if(!message.member.hasPermission("ADMINISTRATOR")) return;
      const sayMessage = args.join(" ");
      message.delete().catch();
      message.channel.send(sayMessage);

}

client.on('message', message=>{

	let args = message.content.substring(PREFIX.length).split(" ");

	switch(args[0]){
		case 'ping':
			message.channel.sendMessage('pong!')
			break;
		case 'clear':
			if(!message.member.roles.find(r => r.name === "Staff")) return message.channel.send('YOU DO NOT HAVE PERMISSIONS')
			if(!args[1]) return message.reply('Error please define a certain amount')
			message.channel.bulkDelete(args[1]);
			break;
		case 'help':
			const embed = new Discord.RichEmbed()
			.setTitle('Informaion')
			.addField('Player Name', message.author.username)
			.addField('Help', 'List of Commands')
			.addField('!help', 'Brings up this text')
			.addField('!ping', 'Pong!')
			.setColor(0x00FF00)
			.setFooter('Made by Samuel W.')
			message.channel.sendEmbed(embed);
			break;
	}
})

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
