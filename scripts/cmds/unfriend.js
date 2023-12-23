module.exports = {
  config: {
    name: "unfriend",
    author: "GoatAI",
    role: 2,
    category: "OWNER",
    shortDescription: {
      en: "Unfriend a user",
      tl: "Tanggalin ang tanga mong kaibigan"
    },
    longDescription: {
      en: "This command allows you to unfriend a user.",
      tl: "Ang command na ito ay nagbibigay-daan sa iyo na tanggalin ang iyong tangang kaibigan."
    },
    guide: {
      en: "{p}unfriend <user_id>",
      tl: "{p}unfriend <user_id>"
    }
  },
  onStart: async function ({ event, api, args, message }) {
    try {
      await api.unfriend(args[0]);
      message.reply("User unfriended successfully.");
    } catch (err) {
      message.reply("There was an error unfriending the user.");
    }
  }
};