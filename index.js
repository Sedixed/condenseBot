const { Client, GatewayIntentBits, Collection, GuildMember } = require("discord.js");
const config = require("./config.json");

const { get, patch } = require('./api/discord.js')



const client = new Client({intents: [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMembers,
  GatewayIntentBits.GuildMessages, 
  GatewayIntentBits.MessageContent,
]});

client.on("interactionCreate", async message => {
  // Disable reading if message author is a bot
  if (message.user.bot) return;

});

client.on("ready", async () => {
  const startingDate = new Date(new Date().toLocaleString("en-US", {timeZone: "Europe/Paris"}))
  console.log(`Initializing bot at ${startingDate.toLocaleTimeString('fr-FR')}`)
})

client.login(config.BOT_TOKEN);