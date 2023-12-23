module.exports = {
  config: {
    name: "ping",
    author: "GoatAI | Eldwin",
    aliases: [],
    category: "INFO",
    role: 0,
    shortDescription: {
      en: "Ping command",
      tl: "Ping command"
    },
    longDescription: {
      en: "This command displays the bot's ping.",
      tl: "Ibinibigay ng command na ito ang ping ng bot."
    },
    guide: {
      en: "{p}ping",
      tl: "{p}ping"
    }
  },
  onStart: async function ({ event, message, threadsData, usersData, api }) {
    const startTime = Date.now();
    const msg = await message.reply("Pinging...");
    const endTime = Date.now();

    const ping = endTime - startTime;

    message.reply(`Bot's ping is ${ping}ms.`);
  },
  onChat: async function ({ event, message, threadsData, usersData, api }) {
    // You can leave this function empty for this command.
  },
  onReply: async function ({ event, message, threadsData, usersData, api, Reply }) {
    // You can leave this function empty for this command.
  }
};