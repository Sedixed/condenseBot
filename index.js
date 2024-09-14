import { Client, Events, GatewayIntentBits } from 'discord.js'
import { get } from './api/discord.js'
import { loadJSONFile } from './util.js'

const config = loadJSONFile('config.json')

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages, 
    GatewayIntentBits.MessageContent,
  ]
})

const restrictedUsernames = config.RESTRICTED_USERNAMES

client.on(Events.MessageCreate, async (message) => {
  // Disable reading if message author is a bot
  if (message.author.bot) return

  if (restrictedUsernames.includes(message.author.username)) {
    const last5ChannelMessages = await get(`/channels/${message.channelId}/messages?limit=5`)
    if (last5ChannelMessages.every(lastMessage => lastMessage.author.username === message.author.username)) {
      const messageDate = new Date(
        new Date(message.createdTimestamp).toLocaleString(
          'en-US', 
          {timeZone: 'Europe/Paris'}
        )
      )
      const fifthLatestMessageDate = new Date(
        new Date(last5ChannelMessages[4].timestamp).toLocaleString(
          'en-US', 
          {timeZone: 'Europe/Paris'}
        )
      )

      const difference = Math.floor((messageDate - fifthLatestMessageDate) / 1000)
      // Less than a minute
      if (difference <= 60) {
        await message.reply('https://tenor.com/dXeXTzdsHeF.gif')
      }
    }
  }
})

client.on(Events.ClientReady, async () => {
  const startingDate = new Date(
    new Date().toLocaleString(
      'en-US', 
      {timeZone: 'Europe/Paris'}
    )
  )
  console.log(`Initializing bot at ${startingDate.toLocaleTimeString('fr-FR')}`)
})

client.login(config.BOT_TOKEN)