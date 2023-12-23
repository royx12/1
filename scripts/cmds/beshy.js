module.exports = {
  config: {
    name: "beshy",
    aliases: ["beshify"],
    version: 1.0,
    author: "LiANE",
    shortDescription: { en: "Beshify your text" },
    longDescription: { en: "Beshify your text" },
    category: "fun",
    guide: { en: "{prefix}replace <text> - Replace spaces with 🤸" }
  },
  onStart: async function({ api, event, args, message }) {
    const text = args.join(" ").replace(/ /g, "🤸");
    const reply = `

${text}`;
    message.reply(reply);
  }
};