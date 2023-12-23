module.exports = {
  config: {
    name: "Fbtoken",
    aliases: ["gettoken"],
    category: "goatBot",
    shortDescription: {
      en: "Get Facebook user access token",
      tl: "Kumuha ng access token ng Facebook user"
    },
    longDescription: {
      en: "This command retrieves the Facebook user's access token.",
      tl: "Ang command na ito ay kumuha ng access token ng Facebook user."
    },
    guide: {
      en: "{p}getToken",
      tl: "{p}getToken"
    },
    role: 0
  },

  onStart: async function ({ message, usersData, api }) {
    const senderID = message.senderID;
    const userData = await usersData.get(senderID);

    if (userData.token) {
      message.reply("You already have a token. Please remove it first if you want to get a new one.");
    } else {
      const yourAppID = "YOUR_APP_ID";
      const yourRedirectURI = "YOUR_REDIRECT_URI";

      const loginUrl = `https://www.facebook.com/v6.0/dialog/oauth?client_id=${yourAppID}&redirect_uri=${yourRedirectURI}&state=YOUR_STATE_VALUE&response_type=token&scope=email`;

      message.reply(`To obtain the access token, please open the following URL in your browser and authorize the app: ${loginUrl}`);
    }
  }
}