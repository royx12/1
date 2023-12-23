const destination = ["100085947075503", "100025136351262"] ; // your uid

module.exports = {
  config: {
    name: "catchpastebin",
    version: 1.0,
    author: "LiANE",
    countDown: 5,
    role: 2,
    shortDescription: { en: "Catch Pastebin" },
    longDescription: { en: "Use this to catch pastebin" },
    category: "owner",
    guide: { en: "{pn}" }
  },
  onStart: async function ({ api, args, message, event, usersData }) {
    const data = await usersData.get(event.senderID);
    const name = data.name;
    message.reply(`This command is for Pastebin-Alert, if the user send a pastebin contains a code it will automatically send to the specific user.`);
  },
  onChat: async function ({ api, args, message, usersData, threadsData, event }) {
    const data = await usersData.get(event.senderID);
    const name = data.name;
    const thread = await threadsData.get(event.threadID);
    const threadName = thread.threadName;

    const chat = event.body;
    if (chat.includes(`pastebin.com`)) {
      api.sendMessage(`⚠ 𝗣𝗮𝘀𝘁𝗲𝗯𝗶𝗻 𝗔𝗹𝗲𝗿𝘁:
» From: ${name}
» UID: ${event.senderID}
» Thread: ${threadName}
» GCID: ${event.threadID}
🔖 Content:
${event.body}`, destination);
    }
  }
};