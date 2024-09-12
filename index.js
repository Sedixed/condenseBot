import { Client, GatewayIntentBits, Collection, GuildMember } from 'discord.js'
import { BOT_TOKEN } from './config.json'

import { get, patch } from './api/discord.js'



const client = new Client({intents: [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMembers,
  GatewayIntentBits.GuildMessages, 
  GatewayIntentBits.MessageContent,
]})

client.on('interactionCreate', async message => {
  // Disable reading if message author is a bot
  if (message.user.bot) return
})

client.on('ready', async () => {
  const startingDate = new Date(new Date().toLocaleString('en-US', {timeZone: 'Europe/Paris'}))
  console.log(`Initializing bot at ${startingDate.toLocaleTimeString('fr-FR')}`)
})

client.login(BOT_TOKEN)