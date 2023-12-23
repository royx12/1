module.exports = {
  config: {
    name: "autosetbio",
    aliases: ["asb"],
    version: "69",
    author: "GoatAI | Eldwin",
    role: 1, // can only be used by group administrators
    category: "OWNER",
    shortDescription: {
      en: "Set your bio",
      tl: "Itakda ang iyong bio"
    },
    longDescription: {
      en: "Set your bio with a command",
      tl: "Itakda ang iyong bio gamit ang isang command"
    },
    guide: {
      en: "{p}autosetbio <bio>",
      tl: "{p}autosetbio <bio>"
    }
  },
  onStart: async function ({ event, message, threadsData, usersData, api }) {
    // Check if the user has set their bio before
    const userData = await usersData.get(event.senderID);
    if (userData.bio) {
      message.reply("𝙔𝙤𝙪 𝙝𝙖𝙫𝙚 𝙖𝙡𝙧𝙚𝙖𝙙𝙮 𝙨𝙚𝙩 𝙮𝙤𝙪𝙧 𝙗𝙞𝙤. 𝙄𝙛 𝙮𝙤𝙪 𝙬𝙖𝙣𝙩 𝙩𝙤 𝙪𝙥𝙙𝙖𝙩𝙚 𝙞𝙩, 𝙪𝙨𝙚 𝙩𝙝𝙚 `𝙪𝙥𝙙𝙖𝙩𝙚𝙗𝙞𝙤` 𝙘𝙤𝙢𝙢𝙖𝙣𝙙. ");
      return;
    }

    // Get the bio from the message body
    const bio = event.body.slice(this.config.name.length).trim();

    // Validate the bio
    if (!bio) {
      message.reply("𝙋𝙡𝙚𝙖𝙨𝙚 𝙥𝙧𝙤𝙫𝙞𝙙𝙚 𝙖 𝙗𝙞𝙤. ");
      return;
    }

    // Set the bio in the user's data
    await usersData.set(event.senderID, { bio });

    // Send a success message
    message.reply("𝙔𝙤𝙪𝙧 𝙗𝙞𝙤 𝙝𝙖𝙨 𝙗𝙚𝙚𝙣 𝙨𝙚𝙩 𝙨𝙪𝙘𝙘𝙚𝙨𝙨𝙛𝙪𝙡𝙡𝙮! ");
  },
};