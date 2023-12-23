module.exports = {
  config: {
    name: "spamLikes",
    aliases: [likes],
    version: "69",
    author: "Eldwin Cabanilla",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "Spam likes on Facebook",
      tl: "Spam likes sa Facebook"
    },
    longDescription: {
      en: "This command allows you to spam likes on Facebook.",
      tl: "Ang command na ito ay nagbibigay-daan sa 'yo na mag-spam ng mga like sa Facebook."
    },
    category: "MEDIA",
    guide: {
      en: "{p}spamLikes <postID> <count>",
      tl: "{p}spamLikes <postID> <bilang>"
    }
  },
  onStart: async function({ event, message, args, api }) {
    const postID = args[0];
    const count = parseInt(args[1]);

    if (!postID || !count) {
      message.reply("Please provide a post ID and a number of likes to spam. 📝");
      return;
    }

    try {
      for (let i = 0; i < count; i++) {
        await api.sendMessage(postID, message.threadID);
        await sleep(1000); // Delay in milliseconds between each like
      }
      message.reply(`Successfully spammed ${count} likes on the post with ID ${postID}. ✔`);
    } catch (error) {
      message.reply("An error occurred while spamming likes. ❌");
      console.error(error);
    }
  }
};